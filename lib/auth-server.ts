import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import { NextRequest, NextResponse } from "next/server"

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
        async jwt({ token, account }) {
          if (account) token.provider = account.provider
          return token
        },
        async session({ session, token }) {
          if (session.user) {
            session.user.id = token.sub ?? session.user.id ?? ""
            if (typeof token.provider === "string") session.user.provider = token.provider
          }
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
