"use client"

import { SessionProvider, signOut, useSession } from "next-auth/react"
import type { ReactNode } from "react"

export function AuthProvider({ children }: { children: ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>
}

export function useAuth() {
  const { data, status } = useSession()

  return {
    user: data?.user ?? null,
    isLoading: status === "loading",
    logout: () => signOut({ callbackUrl: "/" }),
  }
}
