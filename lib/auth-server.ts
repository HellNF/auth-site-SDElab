import type { NextAuthOptions } from "next-auth"
import GitHubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"

// =======================================
// In-memory OAuth trace (solo per lab)
// =======================================
export type StageType =
  | "user-action"
  | "oauth-auth-code"
  | "oauth-token"
  | "oauth-profile"
  | "nextauth-signin"
  | "session-lifecycle"

type TraceEntry = {
  direction: string
  method: string
  endpoint: string
  stageType: StageType
  payload?: any
  response?: any
  headers?: Record<string, any>
  status?: number
  timestamp: number
  provider?: string
  hint?: string
  step?: string
  message?: Record<string, unknown>
}

const oauthTrace: TraceEntry[] = []

// Flag di laboratorio per esporre i segreti nel trace (DISABILITATO di default)
// Abilita impostando OAUTH_TRACE_EXPOSE_SECRETS=true nell'ambiente di sviluppo.
// ATTENZIONE: NON usare in produzione.
const EXPOSE_SECRETS = process.env.OAUTH_TRACE_EXPOSE_SECRETS === "true"

// =============================
// Secret masking utilities
// =============================
const SECRET_KEYS = new Set([
  "client_secret",
  "clientSecret",
  "authorization",
  "Authorization",
  "access_token",
  "refresh_token",
  "id_token",
  "token",
  "code",
  "password",
  "secret",
  "x-client-secret",
  "cookie",
  "Cookie",
  "set-cookie",
  "Set-Cookie",
])

// Collect known secrets from env to also mask if they appear anywhere
const KNOWN_SECRET_VALUES = [
  process.env.GITHUB_SECRET,
  process.env.GOOGLE_CLIENT_SECRET ?? process.env.GOOGLE_SECRET,
  process.env.NEXTAUTH_SECRET,
  process.env.GITHUB_ID,
  process.env.GOOGLE_CLIENT_ID ?? process.env.GOOGLE_ID,
].filter(Boolean) as string[]

function partialMask(value: string): string {
  const len = value.length
  if (len <= 6) return "*".repeat(Math.max(4, len))
  if (len <= 12) return `${value.slice(0, 2)}****${value.slice(-2)}`
  if (len <= 24) return `${value.slice(0, 4)}********${value.slice(-4)}`
  return `${value.slice(0, 12)}********${value.slice(-6)}`
}

// Mask comuni dentro stringhe raw (JSON o x-www-form-urlencoded)
function maskSecretsInString(input: string): string {
  let out = input
  // JSON style: "access_token":"..."
  out = out.replace(/("(?:access_token|refresh_token|id_token)"\s*:\s*")([^"\n]+)(")/gi, (_m, p1, val, p3) => {
    return `${p1}${partialMask(val)}${p3}`
  })
  // urlencoded style: access_token=...
  out = out.replace(/\b(access_token|refresh_token|id_token)=([^&\s]+)/gi, (_m, k, v) => {
    return `${k}=${partialMask(v)}`
  })
  // Authorization: Bearer token
  out = out.replace(/\bBearer\s+([A-Za-z0-9._-]+)/g, (_m, v) => `Bearer ${partialMask(v)}`)
  return out
}

function maskIfSecret(key: string | undefined, val: unknown): unknown {
  // In modalità educativa (flag attivo) non mascheriamo nulla
  if (EXPOSE_SECRETS) return val
  if (val == null) return val
  if (typeof val === "string") {
    // Mask by key name
    if (key && SECRET_KEYS.has(key)) {
      if (key.toLowerCase() === "authorization") {
        // Bearer/Basic tokens
        if (val.startsWith("Bearer ")) return `Bearer ${partialMask(val.slice(7))}`
        if (val.startsWith("Basic ")) return `Basic ${partialMask(val.slice(6))}`
      }
      return partialMask(val)
    }
    // Mask by known secret content appearing in arbitrary strings
    let masked = val
    for (const secret of KNOWN_SECRET_VALUES) {
      if (!secret) continue
      if (masked.includes(secret)) {
        masked = masked.split(secret).join(partialMask(secret))
      }
    }
    // Maschera pattern comuni di token anche dentro stringhe raw
    return maskSecretsInString(masked)
  }
  if (Array.isArray(val)) return val.map((v) => maskIfSecret(key, v))
  if (typeof val === "object") return sanitizeObject(val as Record<string, unknown>)
  return val
}

function sanitizeObject(obj: Record<string, unknown>): Record<string, unknown> {
  // In modalità educativa (flag attivo) ritorniamo l'oggetto così com'è
  if (EXPOSE_SECRETS) return obj
  const out: Record<string, unknown> = Array.isArray(obj) ? [] as any : {}
  for (const [k, v] of Object.entries(obj)) {
    out[k] = maskIfSecret(k, v)
  }
  return out
}

// Provider helpers and dynamic hint generator
function labelProvider(id?: string): string {
  if (!id) return "the provider"
  const v = id.toLowerCase()
  if (v === "github") return "GitHub"
  if (v === "google") return "Google"
  // Capitalize fallback
  return v.charAt(0).toUpperCase() + v.slice(1)
}

function guessProviderFromEndpoint(endpoint: string): string | undefined {
  const u = endpoint.toLowerCase()
  if (u.includes("github")) return "github"
  if (u.includes("googleapis") || u.includes("oauth2.googleapis.com") || u.includes("accounts.google.com") || u.includes("google")) return "google"
  return undefined
}

function inferStageType(endpoint: string, fallback: StageType = "oauth-token"): StageType {
  const url = endpoint.toLowerCase()
  if (url.includes("/session") || url.includes("session")) return "session-lifecycle"
  if (url.includes("signout") || url.includes("sign-in")) return "session-lifecycle"
  if (url.includes("authorize") || url.includes("/callback")) return "oauth-auth-code"
  if (url.includes("userinfo") || /\buser(?:info)?\b/.test(url) || url.includes("profile")) return "oauth-profile"
  if (url.includes("token")) return "oauth-token"
  return fallback
}

function computeHint(entry: TraceEntry, providerLabel: string): string {
  const raw = entry.endpoint
  const url = raw.toLowerCase()
  const { method, direction, payload, headers } = entry

  // Try to parse URL details
  let host = "", path = "", params: URLSearchParams | undefined
  try {
    const u = new URL(raw)
    host = u.host.toLowerCase()
    path = u.pathname.toLowerCase()
    params = u.searchParams
  } catch {
    // not a fully qualified URL (might be a label or relative path)
  }

  // Helper to describe scopes from query
  const describeScopes = (p?: URLSearchParams) => {
    if (!p) return ""
    const scope = p.get("scope")
    if (!scope) return ""
    const list = scope.split(/[\s,]+/).filter(Boolean)
    if (!list.length) return ""
    const shown = list.slice(0, 3).join(", ") + (list.length > 3 ? ", …" : "")
    return ` Scopes: ${shown}.`
  }

  // Helper to infer token grant details from payload (urlencoded string)
  const describeTokenGrant = () => {
    if (typeof payload !== "string") return ""
    try {
      const sp = new URLSearchParams(payload)
      const grant = sp.get("grant_type") || "authorization_code"
      const hasVerifier = sp.has("code_verifier")
      const offline = sp.get("access_type") === "offline"
      const parts: string[] = []
      parts.push(`grant_type=${grant}`)
      if (hasVerifier) parts.push("PKCE")
      if (offline) parts.push("offline access")
      return parts.length ? ` (${parts.join(", ")})` : ""
    } catch {
      return ""
    }
  }

  // Initiated sign-in
  if (direction === "client→provider" && (url === "google" || url === "github" || !url.startsWith("http"))) {
    return `User initiated sign-in with ${providerLabel}. Redirect to authorization page.`
  }

  // Provider-specific: Google
  if (host.includes("google")) {
    if (host.includes("accounts.google.com") && path.includes("/o/oauth2/v2/auth")) {
      return `Google authorization endpoint hit.${describeScopes(params)}`
    }
    if (host.includes("oauth2.googleapis.com") && path === "/token") {
      return `Google token exchange${describeTokenGrant()}.`
    }
    if ((host.includes("googleapis.com") || host.includes("openidconnect.googleapis.com")) && (path.includes("/userinfo") || path.includes("/v3/userinfo") || path.includes("/v1/userinfo"))) {
      return "Google userinfo: returns OIDC claims (sub, email, name, picture)."
    }
    if (path.includes("/certs") || path.includes("/jwks")) {
      return "Google JWKS: download signing keys used to verify ID tokens."
    }
  }

  // Provider-specific: GitHub
  if (host.includes("github.com") || host.includes("api.github.com")) {
    if (host.includes("github.com") && path.includes("/login/oauth/authorize")) {
      return `GitHub authorization endpoint hit.${describeScopes(params)}`
    }
    if (host.includes("github.com") && path.includes("/login/oauth/access_token")) {
      return "GitHub token exchange: returns an opaque access_token with granted scopes."
    }
    if (host.includes("api.github.com") && path === "/user") {
      return "GitHub user profile: id, login, name, avatar_url."
    }
    if (host.includes("api.github.com") && path === "/user/emails") {
      return "GitHub user emails: primary and verified addresses."
    }
  }

  // Generic OAuth endpoints
  // Sign-out detection (prefer confirmed when response carries cookie clears)
  if (url.endsWith("/api/auth/signout") || url.includes("/api/auth/signout")) {
    // Check response headers for cookie clearing
    const getHeader = (name: string) => {
      if (!headers) return undefined
      const direct = (headers as any)[name]
      if (direct) return String(direct)
      // try case-insensitive lookup
      const found = Object.entries(headers as Record<string, unknown>).find(
        ([k]) => k.toLowerCase() === name.toLowerCase()
      )
      return found ? String(found[1]) : undefined
    }
    const sc = getHeader("set-cookie") || getHeader("Set-Cookie")
    if (typeof sc === "string") {
      const s = sc.toLowerCase()
      const clearsSession =
        (s.includes("next-auth.session-token=") || s.includes("__secure-next-auth.session-token=")) &&
        (s.includes("max-age=0") || s.includes("expires="))
      if (clearsSession) {
        return "Sign-out confirmed: session cookie cleared."
      }
    }
    // Otherwise it's just the initiation event
    return "Sign-out initiated."
  }

  if (url.includes("authorize")) {
    return `Requesting authorization at ${providerLabel} (consent and scopes).`
  }
  if (url.includes("/token") || url.includes("access_token") || url.includes("oauth/token")) {
    return `Exchanging authorization code for tokens with ${providerLabel}${describeTokenGrant()}.`
  }
  if (url.includes("/userinfo") || /\buser(\/|$)/.test(url)) {
    return `Fetching user profile from ${providerLabel}.`
  }
  if (url.includes("/jwks") || url.includes("/.well-known/jwks") || url.includes("/certs")) {
    return `Retrieving public keys (JWKS) from ${providerLabel}.`
  }
  if (method === "SET-COOKIE" || url.includes("/callback")) {
    return "Establishing session (cookie) and redirecting the user."
  }
  if (url.endsWith("/api/auth/session") || url.includes("/api/auth/session")) {
    return "Creating/updating the NextAuth session cookie."
  }
  if (url.endsWith("/api/auth/signout") || url.includes("/api/auth/signout")) {
    return "Signing out and clearing the session."
  }
  return providerLabel ? `Technical request/response within the ${providerLabel} OAuth flow.` : "Technical request/response within the OAuth flow."
}

export function logOAuthMessage(e: Omit<TraceEntry, "timestamp">) {
  const entry: TraceEntry = { ...e, timestamp: Date.now() }
  // enrich with provider + hint
  const providerId = entry.provider || guessProviderFromEndpoint(entry.endpoint)
  const providerLabel = labelProvider(providerId)
  const hint = entry.hint ?? computeHint({ ...entry, provider: providerId }, providerLabel)
  // sanitize sensitive data before storing
  const safeEntry: TraceEntry = {
    ...entry,
    provider: providerId,
    hint,
    payload: entry.payload && typeof entry.payload === "object" ? sanitizeObject(entry.payload) : entry.payload,
    response: entry.response && typeof entry.response === "object" ? sanitizeObject(entry.response) : entry.response,
    headers: entry.headers && typeof entry.headers === "object" ? (sanitizeObject(entry.headers) as Record<string, any>) : entry.headers,
  }
  oauthTrace.push(safeEntry)
  // Log utile lato dev
  console.log(`[TRACE] ${entry.direction} ${entry.method} ${entry.endpoint}`)
}

export const getOAuthTrace = () => {
  const out = oauthTrace.slice().sort((a, b) => a.timestamp - b.timestamp)
  oauthTrace.length = 0
  return out
}
export const clearTrace = () => void (oauthTrace.length = 0)

// ---------------------------------------
// Clona una Response in modo sicuro
// ---------------------------------------
async function cloneResponse(response: Response) {
  const text = await response.clone().text()
  let body: any
  try {
    body = JSON.parse(text)
  } catch {
    body = { raw: text }
  }
  return {
    status: response.status,
    headers: Object.fromEntries(response.headers.entries()),
    body,
  }
}

// =======================================
// NextAuth options (eventi + callbacks)
// =======================================
export const authOptions: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    GoogleProvider({
      clientId: (process.env.GOOGLE_CLIENT_ID ?? process.env.GOOGLE_ID)!,
      clientSecret: (process.env.GOOGLE_CLIENT_SECRET ?? process.env.GOOGLE_SECRET)!,
    }),
  ],

  // Eventi per “raccontare” il flow reale
  events: {
    async signIn(message: any) {
      logOAuthMessage({
        direction: "server→client",
        method: "SIGNIN COMPLETED",
        endpoint: message.account?.provider ?? "unknown provider",
        stageType: "nextauth-signin",
        provider: message.account?.provider,
        payload: {
          user: message.user,
          account: message.account,
          profile: (message as any)?.profile ?? null,
        },
        hint: "NextAuth signIn event: OAuth login completed and user/account/profile are ready.",
      })

      traceAuth({
        direction: "server→client",
        step: "SignIn Completed",
        endpoint: "events.signIn",
        kind: "event",
        provider: message.account?.provider,
        message: {
          user: message.user,
          account: message.account,
          profile: (message as any)?.profile ?? null,
          isNewUser: (message as any)?.isNewUser ?? undefined,
        },
        hint: "NextAuth emitted signIn: downstream state is ready for dashboard rendering.",
      })
    },
    async session({ session, token }: any) {
      logOAuthMessage({
        direction: "server→client",
        method: "SET-COOKIE",
        endpoint: "/api/auth/session",
        stageType: "session-lifecycle",
        response: { session, token },
        hint: "Establishing authenticated session and sending cookie to the browser.",
      })

      traceAuth({
        direction: "server→client",
        step: "Session Event",
        endpoint: "events.session",
        kind: "event",
        provider: undefined,
        message: { session, token },
        hint: "Session is active/updated (NextAuth event).",
      })
    },
    async signOut(message: any) {
      logOAuthMessage({
        direction: "client→server",
        method: "POST",
        endpoint: "/api/auth/signout",
        stageType: "session-lifecycle",
        provider: (message as any)?.account?.provider,
        payload: message,
        hint: "User initiated sign-out.",
      })
      clearTrace()

      traceAuth({
        direction: "client→server",
        step: "SignOut Event",
        endpoint: "events.signOut",
        kind: "event",
        provider: (message as any)?.account?.provider,
        message,
        hint: "User initiated sign-out; in-memory OAuth trace cleared.",
      })
    },
  },

  callbacks: {
    async jwt({ token, account, profile }) {
      if (account) {
        logOAuthMessage({
          direction: "provider→server",
          method: "TOKEN RESPONSE",
          endpoint: "provider_token",
          stageType: "oauth-token",
          provider: account.provider,
          response: account, // reale, non mascherato
        })

        if (profile) {
          const profileEndpoint =
            account.provider === "github"
              ? "https://api.github.com/user"
              : account.provider === "google"
                ? "https://openidconnect.googleapis.com/v1/userinfo"
                : `${account.provider} userinfo`

          logOAuthMessage({
            direction: "server→provider",
            method: "GET",
            endpoint: profileEndpoint,
            stageType: "oauth-profile",
            provider: account.provider,
            hint: "Server fetched the provider userinfo endpoint to build the profile claims.",
          })

          logOAuthMessage({
            direction: "provider→server",
            method: "PROFILE RESPONSE",
            endpoint: profileEndpoint,
            stageType: "oauth-profile",
            provider: account.provider,
            response: profile,
            hint: "Provider userinfo payload returned to NextAuth.",
          })
        }
      }
      return token
    },
    async session({ session, token }) {
      // includo il token nella session (utile per debug)
      ;(session as any).token = token

      traceAuth({
        direction: "server→client",
        step: "Session Callback",
        endpoint: "callbacks.session",
        kind: "callback",
        provider: undefined,
        message: { session, token },
        hint: "Builds the session object exposed to the client (Dashboard).",
      })

      return session
    },
  },

  debug: true,
}

// =======================================
// Wrapper di fetch lato server (no node-fetch)
// Logga OGNI request/response di NextAuth
// =======================================
if (typeof window === "undefined") {
  // salva l’originale una sola volta
  const g = globalThis as any
  if (!g.__originalFetch) g.__originalFetch = fetch

  globalThis.fetch = (async (...args: any[]) => {
    const [url, options] = args as [any, RequestInit]
    const method = (options?.method || "GET").toUpperCase()
    const endpointString = typeof url === "string" ? url : url?.toString?.() ?? "unknown"
    const providerFromEndpoint = guessProviderFromEndpoint(endpointString)
    const inferredStageType = inferStageType(endpointString, method === "GET" ? "oauth-profile" : "oauth-token")
    const headersSnapshot = options?.headers ? Object.fromEntries(Object.entries(options.headers)) : {}

    logOAuthMessage({
      direction: "server→provider",
      method,
      endpoint: endpointString,
      stageType: inferredStageType,
      provider: providerFromEndpoint,
      payload: options?.body ?? null,
      headers: headersSnapshot,
    })

    const response: Response = await g.__originalFetch(...args)
    const cloned = await cloneResponse(response)

    logOAuthMessage({
      direction: "provider→server",
      method,
      endpoint: endpointString,
      stageType: inferredStageType,
      provider: providerFromEndpoint,
      response: cloned.body,
      headers: cloned.headers,
      status: cloned.status,
    })

    return response
  }) as typeof fetch
}

// ---------------------------------------
// Tipi e funzioni per il logging degli eventi
// ---------------------------------------
type LogTraceKind = "event" | "callback"

type LogEntry = {
  direction: string
  step: string
  endpoint: string
  kind: LogTraceKind
  provider?: string
  message: Record<string, unknown>
  timestamp: string
  hint: string
}

/**
 * Usa sanitizeObject/maskIfSecret già presenti per mascherare campi sensibili
 * dentro un oggetto di log generico.
 */
function maskSensitiveDataForLog<T>(value: T): T {
  if (value == null) return value
  if (typeof value === "string") {
    // riusa già la logica per stringhe raw
    return maskIfSecret(undefined, value) as T
  }
  if (Array.isArray(value)) {
    return value.map((v) => maskSensitiveDataForLog(v)) as unknown as T
  }
  if (typeof value === "object") {
    return sanitizeObject(value as Record<string, unknown>) as unknown as T
  }
  return value
}

function traceAuth(entry: Omit<LogEntry, "timestamp">) {
  const timestamp = new Date().toISOString()
  const safeMessage = maskSensitiveDataForLog(entry.message)
  const log: LogEntry = {
    ...entry,
    timestamp,
    message: safeMessage,
  }

  // single-line JSON, ben leggibile
  console.log(JSON.stringify(log))
}
