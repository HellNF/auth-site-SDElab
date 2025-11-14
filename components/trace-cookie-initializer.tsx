"use client"

import { useEffect } from "react"
import { TRACE_COOKIE_MAX_AGE_SECONDS, TRACE_COOKIE_NAME } from "@/lib/trace-cookie"

function readCookie(name: string) {
  const cookies = typeof document === "undefined" ? [] : document.cookie.split(";")
  for (const raw of cookies) {
    const [key, ...rest] = raw.trim().split("=")
    if (key === name) return rest.join("=")
  }
  return undefined
}

export function TraceCookieInitializer() {
  useEffect(() => {
    if (typeof document === "undefined") return
    if (readCookie(TRACE_COOKIE_NAME)) return
    const newId = self.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random()}`
    const secure = window.location.protocol === "https:" ? "; Secure" : ""
    document.cookie = `${TRACE_COOKIE_NAME}=${newId}; Path=/; Max-Age=${TRACE_COOKIE_MAX_AGE_SECONDS}; SameSite=Lax${secure}`
  }, [])

  return null
}
