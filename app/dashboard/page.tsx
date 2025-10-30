"use client"
import { useMemo } from "react"
import { useAuth } from "@/lib/auth-context"
import { ProtectedRoute } from "@/components/protected-route"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { CheckCircle2, Shield, Key, Clock, User } from "lucide-react"
import { OAuthSummary } from "@/components/oauth-summary"
import { OAuthTraceViewer } from "@/components/OAuthTraceViewer"

export default function DashboardPage() {
  const { user } = useAuth()

  const userInitials = useMemo(() => {
    if (!user?.name) {
      return "U"
    }

    return (
      user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase() || "U"
    )
  }, [user?.name])

  const providerLabel = user?.provider ? user.provider.charAt(0).toUpperCase() + user.provider.slice(1) : "SSO"
  const userIdPreview = user?.id ? `${user.id.substring(0, 12)}...` : "N/A"

  return (
    <ProtectedRoute>
      {user ? (
        <main className="min-h-screen bg-background py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <Card className="p-6 mb-8 bg-accent/10 border-accent/20">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 text-accent flex-shrink-0" />
                  <div>
                    <h2 className="font-semibold text-foreground">Autenticazione Riuscita!</h2>
                    <p className="text-sm text-muted-foreground">
                      Hai effettuato l&apos;accesso con successo. Questa è un&apos;area protetta accessibile solo agli utenti autenticati.
                    </p>
                  </div>
                </div>
              </Card>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <Card className="p-6 md:col-span-2">
                  <h3 className="text-xl font-semibold mb-4 text-foreground">Informazioni Utente</h3>
                  <div className="flex items-start gap-4">
                    <Avatar className="w-16 h-16">
                      <AvatarImage src={user.image ?? "/placeholder.svg"} alt={user.name ?? "Utente"} />
                      <AvatarFallback className="bg-primary text-primary-foreground text-lg">
                        {userInitials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h4 className="font-semibold text-lg text-foreground">{user.name ?? "Utente"}</h4>
                      <p className="text-muted-foreground text-sm mb-3">{user.email ?? "Email non disponibile"}</p>
                      <Badge variant="secondary" className="gap-1 capitalize">
                        <Shield className="w-3 h-3" />
                        {providerLabel}
                      </Badge>
                    </div>
                  </div>

                  <Separator className="my-6" />

                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-sm">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Sessione attiva dal:</span>
                      <span className="font-medium text-foreground">{new Date().toLocaleDateString("it-IT")}</span>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 bg-primary/5 border-primary/20">
                  <div className="flex items-center gap-2 mb-4">
                    <Key className="w-5 h-5 text-primary" />
                    <h3 className="font-semibold text-foreground">Session Token</h3>
                  </div>
                  <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
                    La tua sessione è gestita da NextAuth e protetta tramite cookie sicuri.
                  </p>
                  <div className="p-3 bg-background rounded border border-border">
                    <code className="text-xs font-mono text-muted-foreground break-all">
                      user_id: {userIdPreview}
                    </code>
                  </div>
                </Card>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-4 text-foreground">Come Funziona la Protezione</h3>
                  <div className="space-y-4 text-sm">
                    <div>
                      <h4 className="font-medium mb-2 text-foreground">1. NextAuth Session</h4>
                      <p className="text-muted-foreground leading-relaxed">
                        L&apos;autenticazione è delegata a provider OAuth reali (GitHub/Google) tramite NextAuth.
                      </p>
                    </div>
                    <Separator />
                    <div>
                      <h4 className="font-medium mb-2 text-foreground">2. Route Protette</h4>
                      <p className="text-muted-foreground leading-relaxed">
                        Il componente ProtectedRoute verifica la sessione prima di mostrare i contenuti sensibili.
                      </p>
                    </div>
                    <Separator />
                    <div>
                      <h4 className="font-medium mb-2 text-foreground">3. Logout Sicuro</h4>
                      <p className="text-muted-foreground leading-relaxed">
                        Il logout invalida la sessione sul browser e ti riporta alla pagina di login.
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-4 text-foreground">Stato della Demo</h3>
                  <div className="space-y-4 text-sm">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-medium mb-1 text-foreground">Provider OAuth</h4>
                        <p className="text-muted-foreground leading-relaxed">
                          Configura le credenziali GitHub/Google per utilizzare provider reali.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-medium mb-1 text-foreground">Flow Monitor</h4>
                        <p className="text-muted-foreground leading-relaxed">
                          Il visualizzatore mostra in tempo reale i passaggi del flusso OAuth durante la redirezione.
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Riepilogo del flusso OAuth */}
              <div className="mt-8">
                <OAuthSummary />
              </div>

              {/* Real OAuth Message Flow */}
              <div className="mt-8">
                <OAuthTraceViewer />
              </div>
            </div>
          </div>
        </main>
      ) : null}
    </ProtectedRoute>
  )
}
