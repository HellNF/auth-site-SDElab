import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, Lock, Key, Users, ArrowRight, CheckCircle2 } from "lucide-react"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="mb-4" variant="secondary">
            Service Design & Engineering Lab
          </Badge>
          <h1 className="text-5xl font-bold mb-6 text-foreground text-balance">Autenticazione, OAuth e SSO</h1>
          <p className="text-xl text-muted-foreground mb-8 text-pretty leading-relaxed">
            Un laboratorio interattivo per comprendere i meccanismi di autenticazione moderna, il protocollo OAuth 2.0 e
            il Single Sign-On
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/login">
              <Button size="lg" className="gap-2">
                Prova la Demo
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/concepts">
              <Button size="lg" variant="outline">
                Esplora i Concetti
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Key Concepts Grid */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12 text-foreground">Concetti Fondamentali</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <Lock className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-foreground">Autenticazione</h3>
            <p className="text-muted-foreground leading-relaxed">
              Il processo di verifica dell'identità di un utente attraverso credenziali, biometria o altri fattori di
              sicurezza.
            </p>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
              <Key className="w-6 h-6 text-accent" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-foreground">OAuth 2.0</h3>
            <p className="text-muted-foreground leading-relaxed">
              Un protocollo di autorizzazione che permette alle applicazioni di ottenere accesso limitato agli account
              utente su servizi terzi.
            </p>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-foreground">Single Sign-On</h3>
            <p className="text-muted-foreground leading-relaxed">
              Permette agli utenti di autenticarsi una sola volta per accedere a multiple applicazioni senza dover
              reinserire le credenziali.
            </p>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-accent" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-foreground">Authorization Code Flow</h3>
            <p className="text-muted-foreground leading-relaxed">
              Il flusso OAuth più sicuro, utilizzato per applicazioni web con backend che possono mantenere segreti
              client in modo sicuro.
            </p>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <CheckCircle2 className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-foreground">Access Token</h3>
            <p className="text-muted-foreground leading-relaxed">
              Un token che rappresenta l'autorizzazione concessa all'applicazione per accedere a risorse specifiche per
              conto dell'utente.
            </p>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
              <Key className="w-6 h-6 text-accent" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-foreground">Refresh Token</h3>
            <p className="text-muted-foreground leading-relaxed">
              Un token a lunga durata utilizzato per ottenere nuovi access token senza richiedere all'utente di
              autenticarsi nuovamente.
            </p>
          </Card>
        </div>
      </section>

      {/* OAuth Flow Diagram */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-foreground">Il Flusso OAuth 2.0</h2>
          <Card className="p-8 bg-card">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold flex-shrink-0">
                  1
                </div>
                <div>
                  <h4 className="font-semibold mb-2 text-foreground">Authorization Request</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    L'applicazione reindirizza l'utente al server di autorizzazione (es. Google, GitHub) con i parametri
                    della richiesta.
                  </p>
                </div>
              </div>

              <div className="ml-4 border-l-2 border-border h-8"></div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold flex-shrink-0">
                  2
                </div>
                <div>
                  <h4 className="font-semibold mb-2 text-foreground">User Authentication</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    L'utente si autentica sul provider e autorizza l'applicazione ad accedere alle sue informazioni.
                  </p>
                </div>
              </div>

              <div className="ml-4 border-l-2 border-border h-8"></div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold flex-shrink-0">
                  3
                </div>
                <div>
                  <h4 className="font-semibold mb-2 text-foreground">Authorization Code</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Il provider reindirizza l'utente all'applicazione con un codice di autorizzazione temporaneo.
                  </p>
                </div>
              </div>

              <div className="ml-4 border-l-2 border-border h-8"></div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold flex-shrink-0">
                  4
                </div>
                <div>
                  <h4 className="font-semibold mb-2 text-foreground">Token Exchange</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    L'applicazione scambia il codice con un access token contattando direttamente il server di
                    autorizzazione.
                  </p>
                </div>
              </div>

              <div className="ml-4 border-l-2 border-border h-8"></div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-semibold flex-shrink-0">
                  5
                </div>
                <div>
                  <h4 className="font-semibold mb-2 text-foreground">Access Resources</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    L'applicazione può ora utilizzare l'access token per accedere alle risorse protette per conto
                    dell'utente.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <Card className="max-w-3xl mx-auto p-12 text-center bg-primary text-primary-foreground">
          <h2 className="text-3xl font-bold mb-4">Pronto a Vedere in Azione?</h2>
          <p className="text-lg mb-8 opacity-90 text-pretty">
            Prova la nostra demo interattiva per vedere come funziona l'autenticazione OAuth con diversi provider SSO
          </p>
          <Link href="/login">
            <Button size="lg" variant="secondary" className="gap-2">
              Inizia la Demo
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </Card>
      </section>
    </main>
  )
}
