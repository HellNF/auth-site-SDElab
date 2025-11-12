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
  payload?: Record<string, any>
  response?: Record<string, any>
  headers?: Record<string, any>
  status?: number
  timestamp: number
  provider?: string
  hint?: string
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
  const { endpoint, method } = msg
  if (endpoint.includes("authorize")) return "Request user authorization"
  if (endpoint.includes("callback") && method === "GET")
    return "Provider callback with authorization code"
  if (endpoint.includes("access_token")) return "Exchange authorization code for access token"
  if (endpoint.includes("callback") && (method.includes("SET-COOKIE") || method === "302"))
    return "Set session cookie and redirect user"
  if (endpoint.includes("session") && method === "GET") return "Check current user session"
  if (endpoint.includes("user") && method === "GET") return "Fetch user profile data"
  return `${method} ${endpoint}`
}

// Short English explanation for each main phase
function phaseHint(msg: OAuthMessage): string {
  const { endpoint, method } = msg
  const url = endpoint.toLowerCase()
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
    // filter out unconfirmed sign-outs to avoid misleading UI
    const filtered = data.filter((m) => {
      const ep = m.endpoint?.toLowerCase?.() || ""
      if (ep.includes("/api/auth/signout")) {
        const hint = (m.hint || "").toLowerCase()
        // only show if server marked as confirmed
        return hint.includes("confirmed")
      }
      return true
    })
    // sort by time ascending
    setTrace(filtered.slice().sort((a, b) => a.timestamp - b.timestamp))
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
            This section shows the actual HTTP requests exchanged between this app, the OAuth provider, and your browser during authentication.
          </p>
        </div>
        <div className="flex items-center gap-2">
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
              {trace.map((msg, idx) => (
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
                        <Badge className={`px-2.5 py-0.5 ${directionColor(msg.direction)}`}>
                          {msg.direction}
                        </Badge>
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
              ))}
            </Accordion>
          )}
        </ScrollArea>
      )}
    </Card>
  )
}
