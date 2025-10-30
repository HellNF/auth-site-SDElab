"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Github, Loader2, Chrome } from "lucide-react"

interface SSOLoginButtonProps {
  provider: "github" | "google"
  onFlowStart?: (provider: "github" | "google") => void
  disabled?: boolean
}

export function SSOLoginButton({ provider, onFlowStart, disabled = false }: SSOLoginButtonProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async () => {
    if (disabled) {
      return
    }

    setIsLoading(true)
  if (onFlowStart) onFlowStart(provider)

    try {
      await signIn(provider, {
        callbackUrl: "/dashboard",
      })
    } catch (error) {
      console.error("Login error:", error)
      setIsLoading(false)
    }
  }

  const providerConfig = {
    github: {
      icon: Github,
      label: "Continua con GitHub",
      className: "bg-[#24292e] hover:bg-[#24292e]/90 text-white",
    },
    google: {
      icon: Chrome,
      label: "Continua con Google",
      className: "bg-white hover:bg-gray-50 text-gray-900 border border-gray-300",
    },
  }

  const config = providerConfig[provider]
  const Icon = config.icon

  const aria = provider === "github" ? "Sign in with GitHub" : "Sign in with Google"

  return (
    <Button
      onClick={handleLogin}
      disabled={isLoading || disabled}
      className={`w-full ${config.className}`}
      size="lg"
      aria-label={aria}
      title={aria}
    >
      {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Icon className="mr-2 h-5 w-5" />}
      {config.label}
    </Button>
  )
}
