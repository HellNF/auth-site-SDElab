"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Shield, LogOut } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { HoverEffect } from "@/components/react-bits-shim"

export function Header() {
  const { user, logout } = useAuth()

  return (
    <header className="border-b border-border bg-card">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <HoverEffect className="inline-block">
            <Link href="/" className="flex items-center gap-2">
              <Shield className="w-6 h-6 text-primary" />
              <span className="font-semibold text-lg text-foreground">Auth Lab</span>
            </Link>
          </HoverEffect>
          <nav className="flex items-center gap-6">
            <HoverEffect className="inline-block">
              <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Home
              </Link>
            </HoverEffect>
            <HoverEffect className="inline-block">
              <Link href="/concepts" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Concepts
              </Link>
            </HoverEffect>
            {user ? (
              <>
                <HoverEffect className="inline-block">
                  <Link
                    href="/dashboard"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Dashboard
                  </Link>
                </HoverEffect>
                <HoverEffect className="inline-block">
                  <Button onClick={logout} size="sm" variant="outline" className="gap-2 bg-transparent">
                    <LogOut className="w-4 h-4" />
                    Log out
                  </Button>
                </HoverEffect>
              </>
            ) : (
              <HoverEffect className="inline-block">
                <Link href="/login">
                  <Button size="sm">Sign in</Button>
                </Link>
              </HoverEffect>
            )}
          </nav>
        </div>
      </div>
    </header>
  )
}
