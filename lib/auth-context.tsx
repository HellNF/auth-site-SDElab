"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export interface User {
  id: string
  email: string
  name: string
  provider: "credentials" | "github" | "google"
  avatar?: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  loginWithProvider: (provider: "github" | "google") => Promise<void>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Utenti demo per scopi educativi
const DEMO_USERS = [
  {
    id: "1",
    email: "demo@university.edu",
    password: "demo123",
    name: "Demo Student",
    provider: "credentials" as const,
  },
  {
    id: "2",
    email: "student@university.edu",
    password: "student123",
    name: "University Student",
    provider: "credentials" as const,
  },
]

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Carica la sessione dal localStorage al mount
  useEffect(() => {
    const storedUser = localStorage.getItem("auth_user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    // Simula una chiamata API
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const demoUser = DEMO_USERS.find((u) => u.email === email && u.password === password)

    if (!demoUser) {
      throw new Error("Credenziali non valide")
    }

    const { password: _, ...userWithoutPassword } = demoUser
    setUser(userWithoutPassword)
    localStorage.setItem("auth_user", JSON.stringify(userWithoutPassword))
  }

  const loginWithProvider = async (provider: "github" | "google") => {
    // Simula il flusso OAuth
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const mockUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      email: `user@${provider}.com`,
      name: `${provider.charAt(0).toUpperCase() + provider.slice(1)} User`,
      provider,
      avatar: `/placeholder.svg?height=40&width=40&query=${provider}-avatar`,
    }

    setUser(mockUser)
    localStorage.setItem("auth_user", JSON.stringify(mockUser))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("auth_user")
  }

  return (
    <AuthContext.Provider value={{ user, login, loginWithProvider, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
