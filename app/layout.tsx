import type React from "next/types"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Header } from "@/components/header"
import { AuthProvider } from "@/lib/auth-context"
import { OAuthEventsProvider } from "@/lib/oauth-events"
import { Toaster } from "@/components/ui/toaster"
import { AuthSessionListener } from "@/components/auth-session-listener"
import { Suspense } from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: "Auth Lab - Service Design & Engineering",
  description: "Laboratorio universitario su autenticazione, OAuth e SSO",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const isProd = process.env.NODE_ENV === "production"
  const isVercel = process.env.VERCEL === "1"
  return (
    <html lang="it">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Suspense>
          <AuthProvider>
            <OAuthEventsProvider>
              <Header />
              <AuthSessionListener />
              {children}
              <Toaster />
            </OAuthEventsProvider>
          </AuthProvider>
        </Suspense>
        {isProd && isVercel ? <Analytics /> : null}
      </body>
    </html>
  )
}
