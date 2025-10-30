import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import { NextRequest, NextResponse } from "next/server"
import { recordOAuthMessage, getOAuthTrace } from "@/lib/oauth-trace"

// Build providers from env on server only
const providers: any[] = []

if (process.env.GITHUB_ID && process.env.GITHUB_SECRET) {
  providers.push(
    GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  )
}

if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  providers.push(
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  )
}

export const serverConfiguredProviderIds = providers.map((p) => p.id)
export const serverProvidersConfigured = serverConfiguredProviderIds.length > 0

export let authReady = false
export let lastAuthInitError: string | null = null

type RouteContext = { params: { nextauth: string[] } }
type Handler = (req: NextRequest, ctx: RouteContext) => Promise<Response>
let GETImpl: Handler | null = null
let POSTImpl: Handler | null = null

if (serverProvidersConfigured) {
  try {
    const created = NextAuth({
      providers,
      session: { strategy: "jwt" },
      callbacks: {
        async jwt({ token, account, profile }) {
          if (account) {
            token.provider = account.provider

            // Build a best-effort real-message timeline for didactic purposes
            const provider = account.provider
            const now = () => Date.now()

            // 1) Initial redirect to provider authorize endpoint (client → provider)
            const authorizeEndpoint =
              provider === "github"
                ? "https://github.com/login/oauth/authorize"
                : provider === "google"
                  ? "https://accounts.google.com/o/oauth2/v2/auth"
                  : "oauth/authorize"
            recordOAuthMessage({
              direction: "client→provider",
              endpoint: authorizeEndpoint,
              method: "GET",
              timestamp: now(),
            })

            // 2) Provider redirects back to our callback with ?code=... (provider → server)
            const callbackEndpoint = `/api/auth/callback/${provider}`
            recordOAuthMessage({
              direction: "provider→server",
              endpoint: callbackEndpoint,
              method: "GET",
              // We don't have direct access to code/state; mask with placeholders
              payload: { code: "***", state: "***" },
              timestamp: now(),
            })

            // 3) Server exchanges code for access token (server → provider)
            const tokenEndpoint =
              provider === "github"
                ? "https://github.com/login/oauth/access_token"
                : provider === "google"
                  ? "https://oauth2.googleapis.com/token"
                  : "oauth/token"
            recordOAuthMessage({
              direction: "server→provider",
              endpoint: tokenEndpoint,
              method: "POST",
              payload: { code: "***", client_id: "***" },
              response: {
                token_type: account.token_type,
                scope: account.scope,
                access_token: account.access_token,
                expires_at: account.expires_at,
              },
              timestamp: now(),
            })

            // 4) Server fetches user profile from provider (server → provider)
            const userEndpoint =
              provider === "github"
                ? "https://api.github.com/user"
                : provider === "google"
                  ? "https://www.googleapis.com/oauth2/v3/userinfo"
                  : "userinfo"
            const minimalUser: Record<string, any> = {}
            if (profile) {
              if (provider === "github") {
                minimalUser.login = (profile as any).login
                minimalUser.id = (profile as any).id
              } else if (provider === "google") {
                minimalUser.sub = (profile as any).sub
                minimalUser.email = (profile as any).email
              }
            }
            recordOAuthMessage({
              direction: "server→provider",
              endpoint: userEndpoint,
              method: "GET",
              response: minimalUser,
              timestamp: now(),
            })

            // 5) Server sets session cookie and redirects user back to the app (server → client)
            recordOAuthMessage({
              direction: "server→client",
              endpoint: `/api/auth/callback/${provider}`,
              method: "SET-COOKIE+REDIRECT",
              response: { location: "/dashboard", "set-cookie": "***" },
              timestamp: now(),
            })

            // Persist into JWT for the session consumer
            token.oauthTrace = getOAuthTrace()
          }
          return token
        },
        async session({ session, token }) {
          if (session.user) {
            session.user.id = token.sub ?? session.user.id ?? ""
            if (typeof token.provider === "string") session.user.provider = token.provider
          }
          // Add client ↔ server session roundtrip to the trace for completeness
          const now = () => Date.now()
          recordOAuthMessage({
            direction: "client→server",
            endpoint: "/api/auth/session",
            method: "GET",
            timestamp: now(),
          })
          recordOAuthMessage({
            direction: "server→client",
            endpoint: "/api/auth/session",
            method: "200",
            response: {
              session: "active",
              provider: (token as any).provider,
              user_id: session.user?.id ? `${session.user.id.slice(0, 6)}...` : undefined,
            },
            timestamp: now(),
          })

          const base = Array.isArray((token as any).oauthTrace) ? ((token as any).oauthTrace as any[]) : []
          const extra = getOAuthTrace()
          ;(session as any).oauthTrace = [...base, ...extra]
          return session
        },
      },
      pages: { signIn: "/login" },
    })
    // In NextAuth v4 (App Router), the returned value is the request handler function
    GETImpl = created as unknown as Handler
    POSTImpl = created as unknown as Handler
    authReady = true
  } catch (e) {
    lastAuthInitError = e instanceof Error ? e.message : String(e)
    console.error("Failed to initialize NextAuth handlers. Falling back.", e)
  }
}

if (!authReady) {
  const message = serverProvidersConfigured
    ? `NextAuth initialization failed. Check configuration and logs.${lastAuthInitError ? " " + lastAuthInitError : ""}`
    : "No OAuth providers configured. Set GitHub and/or Google credentials in your environment."

  const fallbackGET: Handler = async (req) => {
    const pathname = (() => {
      try {
        return new URL(req.url).pathname
      } catch {
        return ""
      }
    })()
    if (pathname.endsWith("/api/auth/session")) {
      return NextResponse.json(null, { status: 200 })
    }
    return NextResponse.json(
      { error: message, providersConfigured: serverProvidersConfigured, configuredProviderIds: serverConfiguredProviderIds, authReady, lastAuthInitError },
      { status: 503 },
    )
  }

  const fallbackPOST: Handler = async (req) => {
    const pathname = (() => {
      try {
        return new URL(req.url).pathname
      } catch {
        return ""
      }
    })()
    if (pathname.endsWith("/api/auth/_log")) {
      return new NextResponse(null, { status: 204 })
    }
    return NextResponse.json(
      { error: message, providersConfigured: serverProvidersConfigured, configuredProviderIds: serverConfiguredProviderIds, authReady, lastAuthInitError },
      { status: 503 },
    )
  }

  GETImpl = fallbackGET
  POSTImpl = fallbackPOST
}

export function GET(req: NextRequest, ctx: RouteContext) {
  if (!GETImpl) {
    return NextResponse.json({ error: "Auth handler not initialized" }, { status: 500 }) as any
  }
  return GETImpl(req, ctx)
}

export function POST(req: NextRequest, ctx: RouteContext) {
  if (!POSTImpl) {
    return NextResponse.json({ error: "Auth handler not initialized" }, { status: 500 }) as any
  }
  return POSTImpl(req, ctx)
}
