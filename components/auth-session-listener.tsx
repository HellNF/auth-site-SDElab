"use client"

import { useEffect, useRef } from "react"
import { useSession } from "next-auth/react"
import { useOAuthEvents } from "@/lib/oauth-events"

const SESSION_PUSH_KEY = "oauth_session_event_pushed_v1"

export function AuthSessionListener() {
  const { status } = useSession()
  const { addEvent } = useOAuthEvents()
  const lastStatus = useRef<string | null>(null)

  useEffect(() => {
    if (status === lastStatus.current) return
    lastStatus.current = status

    if (status === "authenticated") {
      const pushed = typeof window !== "undefined" && sessionStorage.getItem(SESSION_PUSH_KEY)
      if (!pushed) {
        addEvent({
          title: "Sessione creata",
          description: "L'utente è autenticato e la sessione è attiva",
          technical: "NextAuth session established (JWT strategy)",
          role: "server",
        })
        try {
          sessionStorage.setItem(SESSION_PUSH_KEY, "1")
        } catch {
          // ignore
        }
      }
    }

    if (status === "unauthenticated") {
      // Facoltativo: evento di logout / sessione non presente
      // addEvent({ title: "Sessione assente", description: "Utente non autenticato", role: "server" })
    }
  }, [status, addEvent])

  return null
}
