"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { SSOLoginButton } from "@/components/sso-login-button"
import { useOAuthEvents } from "@/lib/oauth-events"

interface LoginPageContentProps {
  providersConfigured: boolean
  configuredProviders: string[]
}

const providerLabels: Record<"github" | "google", string> = {
  github: "GitHub",
  google: "Google",
}

export function LoginPageContent({ providersConfigured, configuredProviders }: LoginPageContentProps) {
  const { status } = useSession()
  const router = useRouter()
  const { addEvent, clearEvents } = useOAuthEvents()

  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/dashboard")
    }
  }, [status, router])

  const handleAuthFlowStart = (provider: "github" | "google") => {
    // Pulisci eventi precedenti per una nuova sessione didattica
    clearEvents()

    // Evento iniziale
    addEvent({
      title: `Avvio login SSO con ${providerLabels[provider]}`,
      description: "Richiesta di autenticazione avviata dall'applicazione",
      role: "client",
      technical: "signIn(provider) → redirect verso Authorization Server",
    })
  }

  const configuredBadgeVariants = useMemo(() => {
    const configuredSet = new Set(configuredProviders)
    return (provider: "github" | "google") => (configuredSet.has(provider) ? "default" : "secondary")
  }, [configuredProviders])

  const disabledExplanation = providersConfigured
    ? null
    : {
        title: "Configurazione necessaria",
        description:
          "Per attivare l'accesso SSO imposta le variabili d'ambiente GITHUB_ID, GITHUB_SECRET, GOOGLE_CLIENT_ID e GOOGLE_CLIENT_SECRET e riavvia il server.",
      }

  if (status === "authenticated") {
    return null
  }

  // (Simulatore rimosso) Gli eventi del flusso reale saranno emessi dal listener di sessione

  return (
    <main className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-3 text-foreground">Demo Autenticazione</h1>
            <p className="text-muted-foreground text-lg">
              Effettua l&apos;accesso con provider OAuth reali e osserva il flusso in tempo reale
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <Card className="p-8 space-y-6">
              <div>
                <h2 className="text-2xl font-semibold text-foreground">Accedi con un Provider SSO</h2>
                <p className="text-sm text-muted-foreground mt-2">
                  Le autenticazioni sono gestite da NextAuth utilizzando le credenziali OAuth configurate nel file <code>.env</code>.
                </p>
              </div>

              {disabledExplanation ? (
                <Alert variant="destructive">
                  <AlertTitle>{disabledExplanation.title}</AlertTitle>
                  <AlertDescription>{disabledExplanation.description}</AlertDescription>
                </Alert>
              ) : null}

              <div className="space-y-3">
                <SSOLoginButton provider="github" onFlowStart={handleAuthFlowStart} disabled={!providersConfigured} />
                <SSOLoginButton provider="google" onFlowStart={handleAuthFlowStart} disabled={!providersConfigured} />
              </div>

              <Card className="p-6 bg-muted/50">
                <h3 className="font-semibold mb-3 text-foreground">Cosa Succede Durante il Login</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Vieni reindirizzato al provider selezionato</li>
                  <li>• Autorizzi l&apos;applicazione tramite OAuth 2.0</li>
                  <li>• Il provider restituisce un authorization code</li>
                  <li>• L&apos;app ottiene il token di accesso e crea la sessione</li>
                </ul>
              </Card>
            </Card>

            <div className="space-y-6">
              <Card className="p-6 bg-accent/5 border-accent/20">
                <h3 className="font-semibold mb-3 text-foreground">Vantaggi del SSO</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-0.5">✓</span>
                    <span>Accesso rapido e centralizzato con provider affidabili</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-0.5">✓</span>
                    <span>Nessuna gestione locale delle password dell&apos;utente</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-0.5">✓</span>
                    <span>Esperienza utente coerente su più servizi</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-0.5">✓</span>
                    <span>Riduzione del rischio di phishing e data breach</span>
                  </li>
                </ul>
              </Card>

              <Card className="p-6 bg-muted/50">
                <h3 className="font-semibold mb-3 text-foreground">Provider Configurati</h3>
                <div className="flex flex-wrap gap-2">
                  {(["github", "google"] as const).map((provider) => (
                    <Badge key={provider} variant={configuredBadgeVariants(provider)}>
                      {providerLabels[provider]}
                    </Badge>
                  ))}
                </div>
                <Separator className="my-4" />
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Imposta le variabili d&apos;ambiente <code>GITHUB_ID</code>, <code>GITHUB_SECRET</code>, <code>GOOGLE_CLIENT_ID</code> e <code>GOOGLE_CLIENT_SECRET</code> per abilitare i provider.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
