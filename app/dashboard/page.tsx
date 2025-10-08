"use client"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { CheckCircle2, Shield, Key, Clock, User } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { ProtectedRoute } from "@/components/protected-route"

export default function DashboardPage() {
  const { user } = useAuth()

  if (!user) {
    return null
  }

  const userInitials =
    user.name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase() || "U"

  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-background py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            {/* Success Banner */}
            <Card className="p-6 mb-8 bg-accent/10 border-accent/20">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 text-accent flex-shrink-0" />
                <div>
                  <h2 className="font-semibold text-foreground">Autenticazione Riuscita!</h2>
                  <p className="text-sm text-muted-foreground">
                    Hai effettuato l'accesso con successo. Questa è un'area protetta accessibile solo agli utenti
                    autenticati.
                  </p>
                </div>
              </div>
            </Card>

            {/* User Profile Card */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <Card className="p-6 md:col-span-2">
                <h3 className="text-xl font-semibold mb-4 text-foreground">Informazioni Utente</h3>
                <div className="flex items-start gap-4">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                    <AvatarFallback className="bg-primary text-primary-foreground text-lg">
                      {userInitials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h4 className="font-semibold text-lg text-foreground">{user.name}</h4>
                    <p className="text-muted-foreground text-sm mb-3">{user.email}</p>
                    <Badge variant="secondary" className="gap-1">
                      <Shield className="w-3 h-3" />
                      Autenticato
                    </Badge>
                  </div>
                </div>

                <Separator className="my-6" />

                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <User className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Provider:</span>
                    <span className="font-medium text-foreground capitalize">{user.provider}</span>
                  </div>
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
                  La tua sessione è protetta e memorizzata in modo sicuro nel browser.
                </p>
                <div className="p-3 bg-background rounded border border-border">
                  <code className="text-xs font-mono text-muted-foreground break-all">
                    user_id: {user.id.substring(0, 12)}...
                  </code>
                </div>
              </Card>
            </div>

            {/* Educational Content */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4 text-foreground">Come Funziona la Protezione</h3>
                <div className="space-y-4 text-sm">
                  <div>
                    <h4 className="font-medium mb-2 text-foreground">1. Context di Autenticazione</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      React Context fornisce lo stato di autenticazione a tutti i componenti dell'applicazione.
                    </p>
                  </div>
                  <Separator />
                  <div>
                    <h4 className="font-medium mb-2 text-foreground">2. Verifica della Sessione</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      Il componente ProtectedRoute verifica la presenza di un utente autenticato prima di mostrare il
                      contenuto.
                    </p>
                  </div>
                  <Separator />
                  <div>
                    <h4 className="font-medium mb-2 text-foreground">3. Redirect Automatico</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      Se l'utente non è autenticato, viene automaticamente reindirizzato alla pagina di login.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4 text-foreground">Sicurezza della Sessione</h3>
                <div className="space-y-4 text-sm">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium mb-1 text-foreground">LocalStorage Sicuro</h4>
                      <p className="text-muted-foreground leading-relaxed">
                        Le informazioni di sessione sono memorizzate localmente nel browser
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium mb-1 text-foreground">Simulazione OAuth</h4>
                      <p className="text-muted-foreground leading-relaxed">
                        Il flusso OAuth è simulato per scopi educativi, mostrando tutti i passaggi
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium mb-1 text-foreground">Logout Sicuro</h4>
                      <p className="text-muted-foreground leading-relaxed">
                        Il logout rimuove completamente i dati di sessione dal browser
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium mb-1 text-foreground">Demo Educativa</h4>
                      <p className="text-muted-foreground leading-relaxed">
                        Questo è un ambiente di apprendimento sicuro per comprendere i concetti
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Code Example */}
            <Card className="p-6 mt-6 bg-muted/30">
              <h3 className="text-lg font-semibold mb-4 text-foreground">Esempio di Implementazione</h3>
              <div className="bg-background rounded-lg p-4 border border-border overflow-x-auto">
                <pre className="text-xs font-mono text-foreground">
                  <code>{`// lib/auth-context.tsx
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  
  const login = async (email, password) => {
    // Verifica credenziali
    const user = await verifyCredentials(email, password)
    setUser(user)
    localStorage.setItem('auth_user', JSON.stringify(user))
  }
  
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

// components/protected-route.tsx
export function ProtectedRoute({ children }) {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  
  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login')
    }
  }, [user, isLoading, router])
  
  if (!user) return null
  return <>{children}</>
}`}</code>
                </pre>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </ProtectedRoute>
  )
}
