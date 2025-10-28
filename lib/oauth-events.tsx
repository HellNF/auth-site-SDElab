"use client"

import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react"
import { useToast } from "@/components/ui/use-toast"

export type OAuthEventRole = "client" | "provider" | "server" | "user"

export type OAuthEvent = {
  id: string
  title: string
  description?: string
  technical?: string
  role: OAuthEventRole
  timeISO: string
}

type OAuthEventsContextType = {
  events: OAuthEvent[]
  addEvent: (e: Omit<OAuthEvent, "id" | "timeISO">) => void
  clearEvents: () => void
}

const OAuthEventsContext = createContext<OAuthEventsContextType | null>(null)

const STORAGE_KEY = "oauth_events_v1"

function loadStoredEvents(): OAuthEvent[] {
  if (typeof window === "undefined") return []
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    if (Array.isArray(parsed)) return parsed as OAuthEvent[]
    return []
  } catch {
    return []
  }
}

function saveStoredEvents(events: OAuthEvent[]) {
  if (typeof window === "undefined") return
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(events))
  } catch {
    // ignore
  }
}

export function OAuthEventsProvider({ children }: { children: React.ReactNode }) {
  const { toast } = useToast()
  const [events, setEvents] = useState<OAuthEvent[]>([])
  const mountedRef = useRef(false)

  useEffect(() => {
    setEvents(loadStoredEvents())
    mountedRef.current = true
  }, [])

  useEffect(() => {
    if (!mountedRef.current) return
    saveStoredEvents(events)
  }, [events])

  const addEvent = useCallback(
    (e: Omit<OAuthEvent, "id" | "timeISO">) => {
      const ev: OAuthEvent = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        timeISO: new Date().toISOString(),
        ...e,
      }
      setEvents((prev) => [ev, ...prev])

      // Show a toast for immediate feedback
      toast({
        title: ev.title,
        description: ev.description ?? ev.technical ?? undefined,
      })
    },
    [toast],
  )

  const clearEvents = useCallback(() => {
    setEvents([])
    saveStoredEvents([])
  }, [])

  const value = useMemo(() => ({ events, addEvent, clearEvents }), [events, addEvent, clearEvents])

  return <OAuthEventsContext.Provider value={value}>{children}</OAuthEventsContext.Provider>
}

export function useOAuthEvents() {
  const ctx = useContext(OAuthEventsContext)
  if (!ctx) {
    throw new Error("useOAuthEvents must be used within OAuthEventsProvider")
  }
  return ctx
}
