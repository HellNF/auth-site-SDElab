"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { ArrowRightLeft } from "lucide-react"

type StageType =
  | "user-action"
  | "oauth-auth-code"
  | "oauth-token"
  | "oauth-profile"
  | "nextauth-signin"
  | "session-lifecycle"

type OAuthMessage = {
  direction:
    | "client→provider"
    | "provider→client"
    | "server→provider"
    | "provider→server"
    | "client→server"
    | "server→client"
  endpoint: string
  method: string
  stageType?: StageType
  payload?: Record<string, any>
  response?: Record<string, any>
  headers?: Record<string, any>
  status?: number
  timestamp: number
  provider?: string
  hint?: string
}

const STAGE_TYPE_META: Record<StageType, { label: string; description: string; className: string }> = {
  "user-action": {
    label: "User Action",
    description: "Client clicks (sign-in/out) before OAuth redirects start.",
    className: "bg-blue-100 text-blue-900 border border-blue-200",
  },
  "oauth-auth-code": {
    label: "Auth Code",
    description: "Redirects + exchanges tied to the authorization code grant.",
    className: "bg-amber-100 text-amber-900 border border-amber-200",
  },
  "oauth-token": {
    label: "Token",
    description: "Back-channel calls to exchange codes/refresh tokens.",
    className: "bg-emerald-100 text-emerald-900 border border-emerald-200",
  },
  "oauth-profile": {
    label: "Profile",
    description: "Requests for userinfo/profile data after token exchange.",
    className: "bg-purple-100 text-purple-900 border border-purple-200",
  },
  "nextauth-signin": {
    label: "NextAuth",
    description: "Server-side events/callbacks that finalize the sign-in.",
    className: "bg-slate-100 text-slate-900 border border-slate-200",
  },
  "session-lifecycle": {
    label: "Session",
    description: "API calls that create, update, or destroy the NextAuth session.",
    className: "bg-rose-100 text-rose-900 border border-rose-200",
  },
}

function stageTypeBadge(stageType?: StageType) {
  if (!stageType) return { label: "Misc", className: "bg-gray-100 text-gray-900 border border-gray-200" }
  return STAGE_TYPE_META[stageType]
}

function directionColor(direction: OAuthMessage["direction"]) {
  switch (direction) {
    case "client→provider":
      return "bg-blue-100 text-blue-800 border border-blue-200"
    case "provider→server":
      return "bg-green-100 text-green-800 border border-green-200"
    case "server→provider":
      return "bg-amber-100 text-amber-800 border border-amber-200"
    case "server→client":
      return "bg-violet-100 text-violet-800 border border-violet-200"
    case "client→server":
      return "bg-gray-100 text-gray-800 border border-gray-200"
    case "provider→client":
      return "bg-emerald-100 text-emerald-800 border border-emerald-200"
    default:
      return "bg-gray-50 text-gray-700 border border-gray-100"
  }
}

function simplifyMessage(msg: OAuthMessage): string {
  const { endpoint, method, stageType } = msg
  if (stageType) {
    switch (stageType) {
      case "user-action":
        return "User initiated sign-in"
      case "oauth-auth-code":
        if (method === "REDIRECT" && msg.direction === "provider→server") {
          return "Provider redirected back with authorization code"
        }
        if (method === "REDIRECT" && msg.direction === "server→client") {
          return "App redirecting browser to provider"
        }
        return "Authorization-code redirect/exchange"
      case "oauth-token":
        return "Token exchange or refresh call"
      case "oauth-profile":
        return "Fetch user profile claims"
      case "session-lifecycle":
        return "Session API call"
      case "nextauth-signin":
        return "NextAuth sign-in event"
    }
  }
  const { endpoint: rawEndpoint, method: httpMethod } = msg
  const endpointToUse = rawEndpoint ?? ""
  if (endpointToUse.includes("authorize")) return "Request user authorization"
  if (endpointToUse.includes("callback") && httpMethod === "GET")
    return "Provider callback with authorization code"
  if (endpointToUse.includes("access_token")) return "Exchange authorization code for access token"
  if (endpointToUse.includes("callback") && (httpMethod.includes("SET-COOKIE") || httpMethod === "302"))
    return "Set session cookie and redirect user"
  if (endpointToUse.includes("session") && httpMethod === "GET") return "Check current user session"
  if (endpointToUse.includes("user") && httpMethod === "GET") return "Fetch user profile data"
  return `${httpMethod} ${endpointToUse}`
}

// Short English explanation for each main phase
function phaseHint(msg: OAuthMessage): string {
  if (msg.stageType) {
    switch (msg.stageType) {
      case "user-action":
        return "User clicked a login-related control inside the app."
      case "oauth-auth-code":
        return "The browser and provider exchange the authorization code."
      case "oauth-token":
        return "Server-to-server request exchanging codes for tokens."
      case "oauth-profile":
        return "Server fetching profile details (userinfo) with the access token."
      case "nextauth-signin":
        return "NextAuth callbacks finalizing persistence and events."
      case "session-lifecycle":
        return "Client or server verifying/updating the session cookie."
    }
  }
  const endpointValue = msg.endpoint ?? ""
  const { method } = msg
  const url = endpointValue.toLowerCase()
  if (url.includes("authorize"))
    return "The app redirects you to the provider to request consent and scopes."
  if (url.includes("callback") && method === "GET")
    return "The provider redirects back with a temporary authorization code."
  if (url.includes("access_token") || url.includes("/token") || url.includes("oauth/token"))
    return "The server exchanges the code for an access token (and optionally refresh/id tokens)."
  if (url.includes("callback") && (method.includes("SET-COOKIE") || method === "302"))
    return "The app establishes a session (cookie) and redirects the user to a protected page."
  if (url.includes("/session") && method === "GET")
    return "Checks or retrieves the authenticated user's session."
  if ((url.includes("/user") || url.includes("/userinfo")) && method === "GET")
    return "Fetches the user's profile from the provider to populate the UI."
  return "Technical request/response that is part of the OAuth flow."
}

export default function OAuthTraceViewer() {
  const [trace, setTrace] = useState<OAuthMessage[]>([])
  const [loading, setLoading] = useState(false)
  const [showRaw, setShowRaw] = useState(false)

  async function loadTrace() {
    setLoading(true)
    const res = await fetch("/api/auth/trace", { cache: "no-store" })
    const data = (await res.json()) as OAuthMessage[]
    // sort by time ascending (no filtering: show everything captured server-side)
    setTrace(data.slice().sort((a, b) => a.timestamp - b.timestamp))
    setLoading(false)
  }

  async function clearTrace() {
    await fetch("/api/auth/trace", { method: "DELETE" })
    setTrace([])
  }

  useEffect(() => {
    loadTrace()
  }, [])

  return (
    <Card className="p-6 overflow-hidden border border-gray-100 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <ArrowRightLeft className="w-4 h-4 text-blue-500" />
            Real OAuth Message Flow
          </h3>
          <p className="text-sm text-muted-foreground max-w-[650px]">
            This section shows the actual HTTP requests and the main internal NextAuth callbacks/events involved in the OAuth flow.
          </p>
          <div className="text-xs text-muted-foreground mt-2 space-y-1">
            <p>
              <span className="text-foreground font-semibold">Direction badge</span>: who is talking to whom (client, server, provider).
            </p>
            <p>
              <span className="text-foreground font-semibold">Stage badge</span>: categorizes each entry (user action, auth-code redirect, token exchange, profile fetch, session, or NextAuth callback).
            </p>
          </div>
          <div className="mt-3 rounded-lg border border-gray-100 bg-muted/40 p-3">
            <p className="text-xs font-semibold text-foreground uppercase tracking-wide">Stage legend</p>
            <div className="mt-2 grid gap-2 sm:grid-cols-2">
              {Object.entries(STAGE_TYPE_META).map(([key, meta]) => (
                <div key={key} className="flex items-start gap-2 text-left">
                  <Badge className={`px-2 py-0.5 ${meta.className}`}>{meta.label}</Badge>
                  <p className="text-xs text-muted-foreground leading-snug">{meta.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Button size="sm" variant="secondary" onClick={() => setShowRaw((s) => !s)}>
            {showRaw ? "Hide raw JSON" : "Toggle raw JSON"}
          </Button>
          <Button size="sm" variant="outline" onClick={loadTrace} disabled={loading}>
            Refresh
          </Button>
          <Button size="sm" variant="destructive" onClick={clearTrace}>
            Clear trace
          </Button>
        </div>
      </div>

      {showRaw ? (
        <pre className="text-xs p-3 rounded bg-muted overflow-auto h-[380px] md:h-[420px] whitespace-pre-wrap break-words">
          {JSON.stringify(trace, null, 2)}
        </pre>
      ) : (
        <ScrollArea className="h-[380px] md:h-[420px]">
          {trace.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No OAuth messages captured for this session yet.
            </p>
          ) : (
            <Accordion type="multiple" className="w-full">
              {trace.map((msg, idx) => {
                const stageMeta = stageTypeBadge(msg.stageType)
                return (
                  <AccordionItem
                    value={`${msg.timestamp}-${idx}`}
                    key={`${msg.timestamp}-${idx}`}
                  className="rounded-lg mb-3 border border-gray-100 shadow-sm"
                  style={{
                    borderLeft: `4px solid ${
                      msg.direction.includes("provider")
                        ? "#22c55e"
                        : msg.direction.includes("server")
                        ? "#8b5cf6"
                        : "#3b82f6"
                    }`,
                  }}
                >
                  <AccordionTrigger className="px-4 py-2 hover:no-underline">
                    <div className="w-full text-left">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <Badge className={`px-2.5 py-0.5 ${directionColor(msg.direction)}`}>
                            {msg.direction}
                          </Badge>
                          <Badge
                            variant="outline"
                            className={`px-2.5 py-0.5 text-[10px] uppercase tracking-wide ${stageMeta.className}`}
                          >
                            {stageMeta.label}
                          </Badge>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {new Date(msg.timestamp).toLocaleTimeString()}
                        </span>
                      </div>

                      <div className="text-sm text-foreground font-medium">
                        {simplifyMessage(msg)}
                      </div>

                      {/* Short phase explanation (server-provided when available) */}
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {msg.hint ?? phaseHint(msg)}
                      </p>

                      <div className="text-xs text-muted-foreground mt-0.5">
                        {msg.method} {msg.endpoint}
                      </div>
                    </div>
                  </AccordionTrigger>

                  <AccordionContent className="px-4 pb-3 pt-1">
                    {msg.headers && (
                      <div className="mt-2">
                        <span className="block text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                          Headers
                        </span>
                        <pre className="text-xs p-3 rounded-lg bg-gray-50 border border-gray-100 whitespace-pre-wrap break-words max-h-56 overflow-auto">
                          {JSON.stringify(msg.headers, null, 2)}
                        </pre>
                      </div>
                    )}

                    {msg.payload && (
                      <div className="mt-2">
                        <span className="block text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                          Payload
                        </span>
                        <pre className="text-xs p-3 rounded-lg bg-gray-50 border border-gray-100 whitespace-pre-wrap break-words max-h-56 overflow-auto">
                          {JSON.stringify(msg.payload, null, 2)}
                        </pre>
                      </div>
                    )}

                    {msg.response && (
                      <>
                        <Separator className="my-3" />
                        <div>
                          <span className="block text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                            Response
                          </span>
                          <pre className="text-xs p-3 rounded-lg bg-gray-50 border border-gray-100 whitespace-pre-wrap break-words max-h-56 overflow-auto">
                            {JSON.stringify(msg.response, null, 2)}
                          </pre>
                        </div>
                      </>
                    )}
                  </AccordionContent>
                </AccordionItem>
                )
              })}
            </Accordion>
          )}
        </ScrollArea>
      )}
    </Card>
  )
}
