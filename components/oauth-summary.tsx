"use client"

import { useMemo } from "react"
import { useOAuthEvents } from "@/lib/oauth-events"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

const roleLabel: Record<string, string> = {
  client: "Client → Provider",
  provider: "Provider → Client",
  server: "Server",
  user: "Utente",
}

export function OAuthSummary() {
  const { events, clearEvents } = useOAuthEvents()

  const sorted = useMemo(() => {
    // Gli eventi nel context sono in ordine dal più recente; invertiamo per cronologia
    return [...events].sort((a, b) => new Date(a.timeISO).getTime() - new Date(b.timeISO).getTime())
  }, [events])

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Riepilogo del Flusso OAuth</h3>
        <button
          onClick={clearEvents}
          className="text-xs border px-2 py-1 rounded hover:bg-muted transition-colors"
        >
          Pulisci
        </button>
      </div>
      {sorted.length === 0 ? (
        <p className="text-sm text-muted-foreground">Nessun evento registrato per questa sessione.</p>
      ) : (
        <div className="space-y-4">
          {sorted.map((ev) => (
            <div key={ev.id} className="p-4 border border-border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary" className="capitalize">
                  {roleLabel[ev.role] ?? ev.role}
                </Badge>
                <span className="text-xs text-muted-foreground">
                  {new Date(ev.timeISO).toLocaleTimeString("it-IT", { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
                </span>
              </div>
              <div className="font-medium text-foreground">{ev.title}</div>
              {ev.description ? (
                <div className="text-sm text-muted-foreground mt-1">{ev.description}</div>
              ) : null}
              {ev.technical ? (
                <code className="text-xs bg-muted px-2 py-1 rounded mt-2 block">{ev.technical}</code>
              ) : null}
            </div>
          ))}
          <Separator />
          <p className="text-xs text-muted-foreground">
            Gli eventi sono registrati solo per la sessione corrente (sessionStorage). Avvia un nuovo login per
            generare un flusso aggiornato.
          </p>
        </div>
      )}
    </Card>
  )
}
