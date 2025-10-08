"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SSOLoginButton } from "@/components/sso-login-button"
import { CredentialsLoginForm } from "@/components/credentials-login-form"
import { OAuthFlowVisualizer } from "@/components/oauth-flow-visualizer"
import { simulateOAuthFlow, OAUTH_STEPS, type OAuthStep } from "@/lib/oauth-simulator"
import { useAuth } from "@/lib/auth-context"

export default function LoginPage() {
  const [oauthSteps, setOauthSteps] = useState<OAuthStep[]>(OAUTH_STEPS)
  const [isFlowActive, setIsFlowActive] = useState(false)
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (user) {
      router.push("/dashboard")
    }
  }, [user, router])

  const handleAuthFlowStart = () => {
    setIsFlowActive(true)
    setOauthSteps(OAUTH_STEPS.map((step) => ({ ...step, status: "pending" })))

    simulateOAuthFlow(
      (steps) => setOauthSteps(steps),
      () => {
        setTimeout(() => {
          setIsFlowActive(false)
          router.push("/dashboard")
        }, 1000)
      },
    )
  }

  if (user) {
    return null
  }

  return (
    <main className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-3 text-foreground">Demo Autenticazione</h1>
            <p className="text-muted-foreground text-lg">
              Prova diversi metodi di autenticazione e osserva il flusso OAuth in tempo reale
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Login Card */}
            <div>
              <Card className="p-8">
                <h2 className="text-2xl font-semibold mb-6 text-foreground">Scegli un Metodo</h2>

                <Tabs defaultValue="sso" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-6">
                    <TabsTrigger value="sso">SSO Providers</TabsTrigger>
                    <TabsTrigger value="credentials">Credenziali</TabsTrigger>
                  </TabsList>

                  <TabsContent value="sso" className="space-y-4">
                    <div className="space-y-3">
                      <SSOLoginButton provider="github" onFlowStart={handleAuthFlowStart} />
                      <SSOLoginButton provider="google" onFlowStart={handleAuthFlowStart} />
                    </div>

                    <div className="mt-6 p-4 bg-muted rounded-lg">
                      <h3 className="font-semibold text-sm mb-2 text-foreground">Cosa succede con SSO?</h3>
                      <ul className="text-xs text-muted-foreground space-y-1 leading-relaxed">
                        <li>• Vieni reindirizzato al provider (GitHub/Google)</li>
                        <li>• Ti autentichi con le tue credenziali esistenti</li>
                        <li>• Il provider conferma la tua identità</li>
                        <li>• Vieni riportato all'app con una sessione attiva</li>
                      </ul>
                    </div>
                  </TabsContent>

                  <TabsContent value="credentials">
                    <CredentialsLoginForm />

                    <div className="mt-6 p-4 bg-muted rounded-lg">
                      <h3 className="font-semibold text-sm mb-2 text-foreground">Autenticazione Tradizionale</h3>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        Con le credenziali, l'applicazione verifica direttamente username e password contro il proprio
                        database. Questo metodo richiede che l'app gestisca in modo sicuro le password degli utenti.
                      </p>
                    </div>
                  </TabsContent>
                </Tabs>
              </Card>

              <Card className="p-6 mt-6 bg-accent/5 border-accent/20">
                <h3 className="font-semibold mb-3 text-foreground">Vantaggi del SSO</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-0.5">✓</span>
                    <span>Nessuna password da ricordare per ogni servizio</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-0.5">✓</span>
                    <span>Maggiore sicurezza con autenticazione centralizzata</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-0.5">✓</span>
                    <span>Esperienza utente migliorata e più veloce</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-0.5">✓</span>
                    <span>Riduzione del rischio di phishing e data breach</span>
                  </li>
                </ul>
              </Card>
            </div>

            {/* Flow Visualizer */}
            <div className="space-y-6">
              <OAuthFlowVisualizer steps={oauthSteps} isActive={isFlowActive} />

              <Card className="p-6 bg-muted/50">
                <h3 className="font-semibold mb-3 text-foreground">Componenti Chiave</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="font-medium text-foreground">Client ID:</span>
                    <p className="text-muted-foreground mt-1 leading-relaxed">
                      Identificatore pubblico dell'applicazione registrata presso il provider OAuth
                    </p>
                  </div>
                  <Separator />
                  <div>
                    <span className="font-medium text-foreground">Client Secret:</span>
                    <p className="text-muted-foreground mt-1 leading-relaxed">
                      Chiave segreta utilizzata per autenticare l'applicazione durante lo scambio del token
                    </p>
                  </div>
                  <Separator />
                  <div>
                    <span className="font-medium text-foreground">Redirect URI:</span>
                    <p className="text-muted-foreground mt-1 leading-relaxed">
                      URL dove il provider reindirizza l'utente dopo l'autenticazione
                    </p>
                  </div>
                  <Separator />
                  <div>
                    <span className="font-medium text-foreground">Scope:</span>
                    <p className="text-muted-foreground mt-1 leading-relaxed">
                      Permessi richiesti dall'applicazione (es. email, profilo, repository)
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
