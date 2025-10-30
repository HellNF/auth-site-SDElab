"use client"

import { useMemo, useState } from "react"
import { useSession } from "next-auth/react"
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
  timestamp: number
}

function directionColor(direction: OAuthMessage["direction"]) {
  switch (direction) {
    case "client→provider":
      return "bg-blue-600 text-white"
    case "provider→server":
      return "bg-green-600 text-white"
    case "server→provider":
      return "bg-amber-600 text-white"
    case "client→server":
      return "bg-slate-600 text-white"
    case "server→client":
      return "bg-violet-600 text-white"
    case "provider→client":
      return "bg-emerald-600 text-white"
    default:
      return "bg-muted text-foreground"
  }
}

export function OAuthTraceViewer() {
  const { data } = useSession()
  const [showRaw, setShowRaw] = useState(false)

  const trace = useMemo<OAuthMessage[]>(() => {
    const t = (data as any)?.oauthTrace as OAuthMessage[] | undefined
    if (!Array.isArray(t)) return []
    return [...t].sort((a, b) => a.timestamp - b.timestamp)
  }, [data])

  return (
    <Card className="p-6 overflow-hidden">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Real OAuth Message Flow</h3>
          <p className="text-sm text-muted-foreground">
            Below you can see the real HTTP messages exchanged between this app and the OAuth provider during your
            login.
          </p>
        </div>
        <Button size="sm" variant="secondary" onClick={() => setShowRaw((s) => !s)}>
          {showRaw ? "Hide raw JSON" : "Toggle raw JSON"}
        </Button>
      </div>

      {showRaw ? (
        <pre className="text-xs p-3 rounded bg-muted overflow-auto h-[360px] md:h-[420px] whitespace-pre-wrap break-words">{JSON.stringify(trace, null, 2)}</pre>
      ) : (
        <ScrollArea className="h-[360px] md:h-[420px]">
          {trace.length === 0 ? (
            <p className="text-sm text-muted-foreground">No OAuth messages captured for this session yet.</p>
          ) : (
            <Accordion type="multiple" className="w-full">
              {trace.map((msg, idx) => (
                <AccordionItem value={`${msg.timestamp}-${idx}`} key={`${msg.timestamp}-${idx}`}>
                  <AccordionTrigger className="px-3 py-2 hover:no-underline">
                    <div className="w-full text-left">
                      <div className="flex items-center justify-between">
                        <Badge className={directionColor(msg.direction)}>{msg.direction}</Badge>
                        <span className="text-xs text-muted-foreground">
                          {new Date(msg.timestamp).toLocaleTimeString()}
                        </span>
                      </div>
                      <div className="mt-1 text-sm text-foreground flex items-center gap-2">
                        <span className="font-medium">{msg.method}</span>
                        <span className="truncate max-w-[28rem]" title={msg.endpoint}>
                          {msg.endpoint}
                        </span>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-3 pb-3">
                    {msg.payload ? (
                      <div className="mt-2">
                        <span className="block text-xs font-semibold text-muted-foreground">Payload</span>
                        <pre className="text-xs p-2 rounded bg-muted whitespace-pre-wrap break-words max-h-60 overflow-auto">
                          {JSON.stringify(msg.payload, null, 2)}
                        </pre>
                      </div>
                    ) : null}
                    {msg.response ? (
                      <>
                        <Separator className="my-2" />
                        <div>
                          <span className="block text-xs font-semibold text-muted-foreground">Response</span>
                          <pre className="text-xs p-2 rounded bg-muted whitespace-pre-wrap break-words max-h-60 overflow-auto">
                            {JSON.stringify(msg.response, null, 2)}
                          </pre>
                        </div>
                      </>
                    ) : null}
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

export default OAuthTraceViewer
