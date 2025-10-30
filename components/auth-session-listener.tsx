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
          title: "Session created",
          description: "User is authenticated and the session is active",
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
      // Optional: logout event / no active session
      // addEvent({ title: "No session", description: "User not authenticated", role: "server" })
    }
  }, [status, addEvent])

  return null
}
