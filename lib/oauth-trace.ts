// Lightweight in-memory OAuth trace buffer for educational purposes only.
// Scope: per server process. We drain the buffer on read to reduce cross-request bleed.

export type OAuthMessage = {
  direction:
    | "client→provider"
    | "provider→client"
    | "server→provider"
    | "provider→server"
    | "client→server"
    | "server→client"
  endpoint: string
  method: string
  payload?: Record<string, any>
  response?: Record<string, any>
  timestamp: number
}

// Internal buffer. Note: This is not user-bound and is best-effort for didactic use.
let buffer: OAuthMessage[] = []

const SENSITIVE_KEYS = new Set([
  "access_token",
  "refresh_token",
  "id_token",
  "client_secret",
  "code",
  "password",
  "assertion",
])

function maskValue(val: unknown): unknown {
  if (typeof val === "string") {
    if (val.length <= 3) return "***"
    return `${val.slice(0, 6)}...`
  }
  if (typeof val === "number") return "***"
  return "***"
}

function sanitize(obj: any): any {
  if (!obj || typeof obj !== "object") return obj
  if (Array.isArray(obj)) return obj.map((v) => sanitize(v))
  const out: Record<string, any> = {}
  for (const [k, v] of Object.entries(obj)) {
    if (SENSITIVE_KEYS.has(k)) {
      out[k] = maskValue(v)
    } else if (v && typeof v === "object") {
      out[k] = sanitize(v)
    } else {
      out[k] = v
    }
  }
  return out
}

export function recordOAuthMessage(msg: OAuthMessage): void {
  // Ensure sensitive data is masked before storing
  const safe: OAuthMessage = {
    ...msg,
    payload: msg.payload ? sanitize(msg.payload) : undefined,
    response: msg.response ? sanitize(msg.response) : undefined,
  }
  buffer.push(safe)
}

export function getOAuthTrace(): OAuthMessage[] {
  const out = buffer.slice()
  buffer = [] // drain
  return out
}
