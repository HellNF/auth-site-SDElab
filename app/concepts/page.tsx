import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Shield, Key, Users, Lock, RefreshCw, CheckCircle2, AlertTriangle } from "lucide-react"

export default function ConceptsPage() {
  return (
    <main className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <Badge className="mb-4" variant="secondary">
              Documentazione Educativa
            </Badge>
            <h1 className="text-4xl font-bold mb-4 text-foreground">Concetti di Autenticazione</h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Una guida completa ai concetti fondamentali di autenticazione, autorizzazione e Single Sign-On per il
              corso di Service Design and Engineering
            </p>
          </div>

          <Tabs defaultValue="auth" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="auth">Autenticazione</TabsTrigger>
              <TabsTrigger value="oauth">OAuth 2.0</TabsTrigger>
              <TabsTrigger value="sso">SSO</TabsTrigger>
              <TabsTrigger value="security">Sicurezza</TabsTrigger>
            </TabsList>

            {/* Authentication Tab */}
            <TabsContent value="auth" className="space-y-6">
              <Card className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Lock className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-foreground">Autenticazione</h2>
                    <p className="text-muted-foreground">Chi sei?</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-3 text-foreground">Definizione</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      L'autenticazione è il processo di verifica dell'identità di un utente, dispositivo o sistema. È la
                      risposta alla domanda "Chi sei?" e precede sempre l'autorizzazione.
                    </p>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-xl font-semibold mb-4 text-foreground">Fattori di Autenticazione</h3>
                    <div className="grid md:grid-cols-3 gap-4">
                      <Card className="p-4 bg-muted/50">
                        <h4 className="font-semibold mb-2 text-foreground">Qualcosa che Sai</h4>
                        <p className="text-sm text-muted-foreground">Password, PIN, domande di sicurezza</p>
                      </Card>
                      <Card className="p-4 bg-muted/50">
                        <h4 className="font-semibold mb-2 text-foreground">Qualcosa che Hai</h4>
                        <p className="text-sm text-muted-foreground">Smartphone, token hardware, smart card</p>
                      </Card>
                      <Card className="p-4 bg-muted/50">
                        <h4 className="font-semibold mb-2 text-foreground">Qualcosa che Sei</h4>
                        <p className="text-sm text-muted-foreground">Impronta digitale, riconoscimento facciale</p>
                      </Card>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-xl font-semibold mb-3 text-foreground">Multi-Factor Authentication (MFA)</h3>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      L'MFA richiede due o più fattori di autenticazione indipendenti per verificare l'identità
                      dell'utente, aumentando significativamente la sicurezza.
                    </p>
                    <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium text-foreground mb-1">Esempio pratico</p>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            Login con password (qualcosa che sai) + codice SMS (qualcosa che hai) = autenticazione a due
                            fattori
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-xl font-semibold mb-3 text-foreground">Autenticazione vs Autorizzazione</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="p-4 border border-border rounded-lg">
                        <h4 className="font-semibold mb-2 text-primary">Autenticazione</h4>
                        <p className="text-sm text-muted-foreground mb-2">Verifica l'identità</p>
                        <p className="text-xs text-muted-foreground">Domanda: "Chi sei?"</p>
                      </div>
                      <div className="p-4 border border-border rounded-lg">
                        <h4 className="font-semibold mb-2 text-accent">Autorizzazione</h4>
                        <p className="text-sm text-muted-foreground mb-2">Verifica i permessi</p>
                        <p className="text-xs text-muted-foreground">Domanda: "Cosa puoi fare?"</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>

            {/* OAuth Tab */}
            <TabsContent value="oauth" className="space-y-6">
              <Card className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                    <Key className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-foreground">OAuth 2.0</h2>
                    <p className="text-muted-foreground">Protocollo di Autorizzazione</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-3 text-foreground">Cos'è OAuth 2.0?</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      OAuth 2.0 è un framework di autorizzazione che permette alle applicazioni di ottenere accesso
                      limitato agli account utente su servizi HTTP. Delega l'autenticazione utente al servizio che
                      ospita l'account e autorizza applicazioni terze ad accedere a quell'account.
                    </p>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-xl font-semibold mb-4 text-foreground">Ruoli in OAuth 2.0</h3>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                        <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold flex-shrink-0 text-sm">
                          1
                        </div>
                        <div>
                          <h4 className="font-semibold mb-1 text-foreground">Resource Owner (Utente)</h4>
                          <p className="text-sm text-muted-foreground">
                            L'entità che possiede le risorse protette e può concedere l'accesso
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                        <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold flex-shrink-0 text-sm">
                          2
                        </div>
                        <div>
                          <h4 className="font-semibold mb-1 text-foreground">Client (Applicazione)</h4>
                          <p className="text-sm text-muted-foreground">
                            L'applicazione che richiede accesso alle risorse protette per conto dell'utente
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                        <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold flex-shrink-0 text-sm">
                          3
                        </div>
                        <div>
                          <h4 className="font-semibold mb-1 text-foreground">Authorization Server</h4>
                          <p className="text-sm text-muted-foreground">
                            Il server che autentica l'utente e rilascia i token di accesso
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                        <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold flex-shrink-0 text-sm">
                          4
                        </div>
                        <div>
                          <h4 className="font-semibold mb-1 text-foreground">Resource Server</h4>
                          <p className="text-sm text-muted-foreground">
                            Il server che ospita le risorse protette e accetta i token di accesso
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-xl font-semibold mb-4 text-foreground">Authorization Code Flow</h3>
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      Il flusso più sicuro e comunemente utilizzato per applicazioni web:
                    </p>
                    <div className="space-y-2 text-sm">
                      <div className="flex gap-3 p-3 bg-background border border-border rounded">
                        <span className="font-mono text-primary">GET</span>
                        <span className="text-muted-foreground">/authorize?client_id=...&redirect_uri=...</span>
                      </div>
                      <div className="flex gap-3 p-3 bg-background border border-border rounded">
                        <span className="font-mono text-accent">→</span>
                        <span className="text-muted-foreground">Utente si autentica e autorizza</span>
                      </div>
                      <div className="flex gap-3 p-3 bg-background border border-border rounded">
                        <span className="font-mono text-primary">GET</span>
                        <span className="text-muted-foreground">/callback?code=AUTHORIZATION_CODE</span>
                      </div>
                      <div className="flex gap-3 p-3 bg-background border border-border rounded">
                        <span className="font-mono text-primary">POST</span>
                        <span className="text-muted-foreground">/token (scambia code con access_token)</span>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-xl font-semibold mb-3 text-foreground">Token Types</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <Card className="p-4 bg-primary/5 border-primary/20">
                        <div className="flex items-center gap-2 mb-2">
                          <Key className="w-4 h-4 text-primary" />
                          <h4 className="font-semibold text-foreground">Access Token</h4>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          Token a breve durata (15-60 min) utilizzato per accedere alle risorse protette
                        </p>
                      </Card>
                      <Card className="p-4 bg-accent/5 border-accent/20">
                        <div className="flex items-center gap-2 mb-2">
                          <RefreshCw className="w-4 h-4 text-accent" />
                          <h4 className="font-semibold text-foreground">Refresh Token</h4>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          Token a lunga durata utilizzato per ottenere nuovi access token senza re-autenticazione
                        </p>
                      </Card>
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>

            {/* SSO Tab */}
            <TabsContent value="sso" className="space-y-6">
              <Card className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-foreground">Single Sign-On (SSO)</h2>
                    <p className="text-muted-foreground">Un Login, Molte Applicazioni</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-3 text-foreground">Cos'è il SSO?</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Single Sign-On è un sistema di autenticazione che permette agli utenti di accedere a multiple
                      applicazioni con un unico set di credenziali. Una volta autenticati, gli utenti possono accedere a
                      tutte le applicazioni autorizzate senza dover effettuare nuovamente il login.
                    </p>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-xl font-semibold mb-4 text-foreground">Vantaggi del SSO</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                        <div>
                          <h4 className="font-semibold mb-1 text-foreground">Esperienza Utente Migliorata</h4>
                          <p className="text-sm text-muted-foreground">
                            Gli utenti devono ricordare solo un set di credenziali
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                        <div>
                          <h4 className="font-semibold mb-1 text-foreground">Sicurezza Aumentata</h4>
                          <p className="text-sm text-muted-foreground">
                            Meno password da gestire riduce il rischio di password deboli
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                        <div>
                          <h4 className="font-semibold mb-1 text-foreground">Gestione Centralizzata</h4>
                          <p className="text-sm text-muted-foreground">
                            Gli amministratori possono gestire accessi da un unico punto
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                        <div>
                          <h4 className="font-semibold mb-1 text-foreground">Riduzione Costi IT</h4>
                          <p className="text-sm text-muted-foreground">
                            Meno richieste di reset password e supporto tecnico
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-xl font-semibold mb-4 text-foreground">Come Funziona il SSO</h3>
                    <div className="space-y-4">
                      <div className="p-4 bg-muted/50 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-semibold">
                            1
                          </div>
                          <h4 className="font-semibold text-foreground">Richiesta di Accesso</h4>
                        </div>
                        <p className="text-sm text-muted-foreground ml-8">
                          L'utente tenta di accedere a un'applicazione
                        </p>
                      </div>
                      <div className="p-4 bg-muted/50 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-semibold">
                            2
                          </div>
                          <h4 className="font-semibold text-foreground">Redirect al Provider SSO</h4>
                        </div>
                        <p className="text-sm text-muted-foreground ml-8">
                          L'applicazione reindirizza al provider di identità centralizzato
                        </p>
                      </div>
                      <div className="p-4 bg-muted/50 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-semibold">
                            3
                          </div>
                          <h4 className="font-semibold text-foreground">Verifica Sessione</h4>
                        </div>
                        <p className="text-sm text-muted-foreground ml-8">
                          Il provider verifica se esiste già una sessione attiva
                        </p>
                      </div>
                      <div className="p-4 bg-muted/50 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-semibold">
                            4
                          </div>
                          <h4 className="font-semibold text-foreground">Autenticazione o Token</h4>
                        </div>
                        <p className="text-sm text-muted-foreground ml-8">
                          Se non autenticato, richiede login. Altrimenti, genera un token
                        </p>
                      </div>
                      <div className="p-4 bg-accent/10 border border-accent/20 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-6 h-6 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-xs font-semibold">
                            5
                          </div>
                          <h4 className="font-semibold text-foreground">Accesso Consentito</h4>
                        </div>
                        <p className="text-sm text-muted-foreground ml-8">
                          L'utente viene reindirizzato all'applicazione con accesso autorizzato
                        </p>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-xl font-semibold mb-3 text-foreground">Provider SSO Popolari</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      <Card className="p-4 text-center">
                        <p className="font-semibold text-foreground">Google</p>
                        <p className="text-xs text-muted-foreground mt-1">OAuth 2.0</p>
                      </Card>
                      <Card className="p-4 text-center">
                        <p className="font-semibold text-foreground">Microsoft</p>
                        <p className="text-xs text-muted-foreground mt-1">Azure AD</p>
                      </Card>
                      <Card className="p-4 text-center">
                        <p className="font-semibold text-foreground">GitHub</p>
                        <p className="text-xs text-muted-foreground mt-1">OAuth 2.0</p>
                      </Card>
                      <Card className="p-4 text-center">
                        <p className="font-semibold text-foreground">Okta</p>
                        <p className="text-xs text-muted-foreground mt-1">SAML/OAuth</p>
                      </Card>
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>

            {/* Security Tab */}
            <TabsContent value="security" className="space-y-6">
              <Card className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                    <Shield className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-foreground">Best Practices di Sicurezza</h2>
                    <p className="text-muted-foreground">Proteggere Utenti e Dati</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-4 text-foreground">Principi Fondamentali</h3>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3 p-4 border border-border rounded-lg">
                        <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                        <div>
                          <h4 className="font-semibold mb-1 text-foreground">HTTPS Obbligatorio</h4>
                          <p className="text-sm text-muted-foreground">
                            Tutte le comunicazioni devono essere crittografate con TLS/SSL
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-4 border border-border rounded-lg">
                        <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                        <div>
                          <h4 className="font-semibold mb-1 text-foreground">Password Hashing</h4>
                          <p className="text-sm text-muted-foreground">
                            Usa algoritmi come bcrypt, Argon2 o PBKDF2 per l'hashing delle password
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-4 border border-border rounded-lg">
                        <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                        <div>
                          <h4 className="font-semibold mb-1 text-foreground">Token Expiration</h4>
                          <p className="text-sm text-muted-foreground">
                            Implementa scadenze appropriate per access token e refresh token
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-4 border border-border rounded-lg">
                        <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                        <div>
                          <h4 className="font-semibold mb-1 text-foreground">Rate Limiting</h4>
                          <p className="text-sm text-muted-foreground">
                            Limita i tentativi di login per prevenire attacchi brute force
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-xl font-semibold mb-4 text-foreground">Vulnerabilità Comuni</h3>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                        <AlertTriangle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                        <div>
                          <h4 className="font-semibold mb-1 text-foreground">CSRF (Cross-Site Request Forgery)</h4>
                          <p className="text-sm text-muted-foreground mb-2">
                            Attacco che forza un utente autenticato a eseguire azioni non volute
                          </p>
                          <p className="text-xs text-accent">
                            Protezione: Usa token CSRF e verifica l'origine delle richieste
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                        <AlertTriangle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                        <div>
                          <h4 className="font-semibold mb-1 text-foreground">XSS (Cross-Site Scripting)</h4>
                          <p className="text-sm text-muted-foreground mb-2">
                            Iniezione di script malevoli in pagine web visualizzate da altri utenti
                          </p>
                          <p className="text-xs text-accent">
                            Protezione: Sanitizza input utente e usa Content Security Policy
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                        <AlertTriangle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                        <div>
                          <h4 className="font-semibold mb-1 text-foreground">Session Hijacking</h4>
                          <p className="text-sm text-muted-foreground mb-2">
                            Furto di session ID per impersonare un utente autenticato
                          </p>
                          <p className="text-xs text-accent">
                            Protezione: HttpOnly cookies, Secure flag, rigenerazione session ID
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-xl font-semibold mb-3 text-foreground">Checklist di Sicurezza</h3>
                    <Card className="p-6 bg-muted/30">
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <input type="checkbox" checked readOnly className="rounded" />
                          <span className="text-foreground">Usa HTTPS per tutte le comunicazioni</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <input type="checkbox" checked readOnly className="rounded" />
                          <span className="text-foreground">Implementa MFA dove possibile</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <input type="checkbox" checked readOnly className="rounded" />
                          <span className="text-foreground">Valida e sanitizza tutti gli input</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <input type="checkbox" checked readOnly className="rounded" />
                          <span className="text-foreground">Usa token CSRF per form e azioni sensibili</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <input type="checkbox" checked readOnly className="rounded" />
                          <span className="text-foreground">Implementa rate limiting sui login</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <input type="checkbox" checked readOnly className="rounded" />
                          <span className="text-foreground">Usa HttpOnly e Secure flags per i cookie</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <input type="checkbox" checked readOnly className="rounded" />
                          <span className="text-foreground">Implementa logging e monitoring</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <input type="checkbox" checked readOnly className="rounded" />
                          <span className="text-foreground">Mantieni dipendenze aggiornate</span>
                        </div>
                      </div>
                    </Card>
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </main>
  )
}
