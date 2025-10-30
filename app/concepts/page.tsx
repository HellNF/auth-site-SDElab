import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Shield, Key, Users, Lock, RefreshCw, CheckCircle2, AlertTriangle } from "lucide-react"
import { FadeInOnScroll, AnimatedCard } from "@/components/react-bits-shim"

export default function ConceptsPage() {
  return (
    <main className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <FadeInOnScroll>
          <div className="mb-8">
            <Badge className="mb-4" variant="secondary">
              Educational Documentation
            </Badge>
            <h1 className="text-4xl font-bold mb-4 text-foreground">Authentication Concepts</h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              A comprehensive guide to the fundamentals of authentication, authorization, and Single Sign-On for the
              Service Design and Engineering course
            </p>
          </div>
          </FadeInOnScroll>

          <Tabs defaultValue="auth" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="auth">Authentication</TabsTrigger>
              <TabsTrigger value="oauth">OAuth 2.0</TabsTrigger>
              <TabsTrigger value="sso">SSO</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
            </TabsList>

            {/* Authentication Tab */}
            <TabsContent value="auth" className="space-y-6">
              <AnimatedCard>
              <Card className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Lock className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-foreground">Authentication</h2>
                    <p className="text-muted-foreground">Who are you?</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-3 text-foreground">Definition</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Authentication is the process of verifying the identity of a user, device, or system. It answers
                      the question "Who are you?" and always precedes authorization.
                    </p>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-xl font-semibold mb-4 text-foreground">Authentication Factors</h3>
                    <div className="grid md:grid-cols-3 gap-4">
                      <Card className="p-4 bg-muted/50">
                        <h4 className="font-semibold mb-2 text-foreground">Something You Know</h4>
                        <p className="text-sm text-muted-foreground">Password, PIN, security questions</p>
                      </Card>
                      <Card className="p-4 bg-muted/50">
                        <h4 className="font-semibold mb-2 text-foreground">Something You Have</h4>
                        <p className="text-sm text-muted-foreground">Smartphone, hardware token, smart card</p>
                      </Card>
                      <Card className="p-4 bg-muted/50">
                        <h4 className="font-semibold mb-2 text-foreground">Something You Are</h4>
                        <p className="text-sm text-muted-foreground">Fingerprint, facial recognition</p>
                      </Card>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-xl font-semibold mb-3 text-foreground">Multi-Factor Authentication (MFA)</h3>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      MFA requires two or more independent authentication factors to verify user identity, significantly
                      increasing security.
                    </p>
                    <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium text-foreground mb-1">Practical example</p>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            Password (something you know) + SMS code (something you have) = two-factor authentication
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-xl font-semibold mb-3 text-foreground">Authentication vs Authorization</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="p-4 border border-border rounded-lg">
                        <h4 className="font-semibold mb-2 text-primary">Authentication</h4>
                        <p className="text-sm text-muted-foreground mb-2">Verifies identity</p>
                        <p className="text-xs text-muted-foreground">Question: "Who are you?"</p>
                      </div>
                      <div className="p-4 border border-border rounded-lg">
                        <h4 className="font-semibold mb-2 text-accent">Authorization</h4>
                        <p className="text-sm text-muted-foreground mb-2">Verifies permissions</p>
                        <p className="text-xs text-muted-foreground">Question: "What can you do?"</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
              </AnimatedCard>
            </TabsContent>

            {/* OAuth Tab */}
            <TabsContent value="oauth" className="space-y-6">
              <AnimatedCard>
              <Card className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                    <Key className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-foreground">OAuth 2.0</h2>
                    <p className="text-muted-foreground">Authorization Protocol</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-3 text-foreground">What is OAuth 2.0?</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      OAuth 2.0 is an authorization framework that allows applications to obtain limited access to user
                      accounts on HTTP services. It delegates user authentication to the service hosting the account and
                      authorizes third-party applications to access that account.
                    </p>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-xl font-semibold mb-4 text-foreground">Roles in OAuth 2.0</h3>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                        <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold flex-shrink-0 text-sm">
                          1
                        </div>
                        <div>
                          <h4 className="font-semibold mb-1 text-foreground">Resource Owner (User)</h4>
                          <p className="text-sm text-muted-foreground">The entity that owns protected resources and can grant access</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                        <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold flex-shrink-0 text-sm">
                          2
                        </div>
                        <div>
                          <h4 className="font-semibold mb-1 text-foreground">Client (Application)</h4>
                          <p className="text-sm text-muted-foreground">The app requesting access to protected resources on behalf of the user</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                        <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold flex-shrink-0 text-sm">
                          3
                        </div>
                        <div>
                          <h4 className="font-semibold mb-1 text-foreground">Authorization Server</h4>
                          <p className="text-sm text-muted-foreground">The server that authenticates the user and issues access tokens</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                        <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold flex-shrink-0 text-sm">
                          4
                        </div>
                        <div>
                          <h4 className="font-semibold mb-1 text-foreground">Resource Server</h4>
                          <p className="text-sm text-muted-foreground">The server hosting protected resources and accepting access tokens</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-xl font-semibold mb-4 text-foreground">Authorization Code Flow</h3>
                    <p className="text-muted-foreground mb-4 leading-relaxed">The most secure and common flow for web apps:</p>
                    <div className="space-y-2 text-sm">
                      <div className="flex gap-3 p-3 bg-background border border-border rounded">
                        <span className="font-mono text-primary">GET</span>
                        <span className="text-muted-foreground">/authorize?client_id=...&redirect_uri=...</span>
                      </div>
                      <div className="flex gap-3 p-3 bg-background border border-border rounded">
                        <span className="font-mono text-accent">→</span>
                        <span className="text-muted-foreground">User authenticates and authorizes</span>
                      </div>
                      <div className="flex gap-3 p-3 bg-background border border-border rounded">
                        <span className="font-mono text-primary">GET</span>
                        <span className="text-muted-foreground">/callback?code=AUTHORIZATION_CODE</span>
                      </div>
                      <div className="flex gap-3 p-3 bg-background border border-border rounded">
                        <span className="font-mono text-primary">POST</span>
                        <span className="text-muted-foreground">/token (exchange code for access_token)</span>
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
                        <p className="text-sm text-muted-foreground leading-relaxed">Short-lived token (15–60 min) used to access protected resources</p>
                      </Card>
                      <Card className="p-4 bg-accent/5 border-accent/20">
                        <div className="flex items-center gap-2 mb-2">
                          <RefreshCw className="w-4 h-4 text-accent" />
                          <h4 className="font-semibold text-foreground">Refresh Token</h4>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">Long-lived token used to obtain new access tokens without re-authenticating</p>
                      </Card>
                    </div>
                  </div>
                </div>
              </Card>
              </AnimatedCard>
            </TabsContent>

            {/* SSO Tab */}
            <TabsContent value="sso" className="space-y-6">
              <AnimatedCard>
              <Card className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-foreground">Single Sign-On (SSO)</h2>
                    <p className="text-muted-foreground">One Login, Many Applications</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-3 text-foreground">What is SSO?</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Single Sign-On is an authentication system that allows users to access multiple applications with a
                      single set of credentials. Once authenticated, users can access all authorized apps without
                      logging in again.
                    </p>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-xl font-semibold mb-4 text-foreground">Benefits of SSO</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                        <div>
                          <h4 className="font-semibold mb-1 text-foreground">Improved User Experience</h4>
                          <p className="text-sm text-muted-foreground">Users only need to remember one set of credentials</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                        <div>
                          <h4 className="font-semibold mb-1 text-foreground">Increased Security</h4>
                          <p className="text-sm text-muted-foreground">Fewer passwords to manage reduces weak-password risk</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                        <div>
                          <h4 className="font-semibold mb-1 text-foreground">Centralized Management</h4>
                          <p className="text-sm text-muted-foreground">Admins can manage access from a single place</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                        <div>
                          <h4 className="font-semibold mb-1 text-foreground">Reduced IT Costs</h4>
                          <p className="text-sm text-muted-foreground">Fewer password reset and support requests</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-xl font-semibold mb-4 text-foreground">How SSO Works</h3>
                    <div className="space-y-4">
                      <div className="p-4 bg-muted/50 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-semibold">
                            1
                          </div>
                          <h4 className="font-semibold text-foreground">Access Request</h4>
                        </div>
                        <p className="text-sm text-muted-foreground ml-8">The user tries to access an application</p>
                      </div>
                      <div className="p-4 bg-muted/50 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-semibold">
                            2
                          </div>
                          <h4 className="font-semibold text-foreground">Redirect to SSO Provider</h4>
                        </div>
                        <p className="text-sm text-muted-foreground ml-8">The app redirects to the centralized identity provider</p>
                      </div>
                      <div className="p-4 bg-muted/50 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-semibold">
                            3
                          </div>
                          <h4 className="font-semibold text-foreground">Session Check</h4>
                        </div>
                        <p className="text-sm text-muted-foreground ml-8">The provider checks for an existing active session</p>
                      </div>
                      <div className="p-4 bg-muted/50 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-semibold">
                            4
                          </div>
                          <h4 className="font-semibold text-foreground">Authenticate or Issue Token</h4>
                        </div>
                        <p className="text-sm text-muted-foreground ml-8">If not authenticated, prompt login; otherwise issue a token</p>
                      </div>
                      <div className="p-4 bg-accent/10 border border-accent/20 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-6 h-6 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-xs font-semibold">
                            5
                          </div>
                          <h4 className="font-semibold text-foreground">Access Granted</h4>
                        </div>
                        <p className="text-sm text-muted-foreground ml-8">User is redirected back with authorized access</p>
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
              </AnimatedCard>
            </TabsContent>

            {/* Security Tab */}
            <TabsContent value="security" className="space-y-6">
              <AnimatedCard>
              <Card className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                    <Shield className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-foreground">Security Best Practices</h2>
                    <p className="text-muted-foreground">Protecting Users and Data</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-4 text-foreground">Core Principles</h3>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3 p-4 border border-border rounded-lg">
                        <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                        <div>
                          <h4 className="font-semibold mb-1 text-foreground">HTTPS Required</h4>
                          <p className="text-sm text-muted-foreground">All communications must be encrypted with TLS/SSL</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-4 border border-border rounded-lg">
                        <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                        <div>
                          <h4 className="font-semibold mb-1 text-foreground">Password Hashing</h4>
                          <p className="text-sm text-muted-foreground">Use bcrypt, Argon2, or PBKDF2 for password hashing</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-4 border border-border rounded-lg">
                        <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                        <div>
                          <h4 className="font-semibold mb-1 text-foreground">Token Expiration</h4>
                          <p className="text-sm text-muted-foreground">Implement appropriate expirations for access and refresh tokens</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-4 border border-border rounded-lg">
                        <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                        <div>
                          <h4 className="font-semibold mb-1 text-foreground">Rate Limiting</h4>
                          <p className="text-sm text-muted-foreground">Limit login attempts to prevent brute-force attacks</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-xl font-semibold mb-4 text-foreground">Common Vulnerabilities</h3>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                        <AlertTriangle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                        <div>
                          <h4 className="font-semibold mb-1 text-foreground">CSRF (Cross-Site Request Forgery)</h4>
                          <p className="text-sm text-muted-foreground mb-2">Attack that forces an authenticated user to perform unwanted actions</p>
                          <p className="text-xs text-accent">Protection: Use CSRF tokens and verify request origin</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                        <AlertTriangle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                        <div>
                          <h4 className="font-semibold mb-1 text-foreground">XSS (Cross-Site Scripting)</h4>
                          <p className="text-sm text-muted-foreground mb-2">Injection of malicious scripts into web pages viewed by other users</p>
                          <p className="text-xs text-accent">Protection: Sanitize user input and use Content Security Policy</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                        <AlertTriangle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                        <div>
                          <h4 className="font-semibold mb-1 text-foreground">Session Hijacking</h4>
                          <p className="text-sm text-muted-foreground mb-2">Theft of session ID to impersonate an authenticated user</p>
                          <p className="text-xs text-accent">Protection: HttpOnly cookies, Secure flag, session ID regeneration</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-xl font-semibold mb-3 text-foreground">Security Checklist</h3>
                    <Card className="p-6 bg-muted/30">
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <input type="checkbox" checked readOnly className="rounded" />
                          <span className="text-foreground">Use HTTPS for all communications</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <input type="checkbox" checked readOnly className="rounded" />
                          <span className="text-foreground">Implement MFA wherever possible</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <input type="checkbox" checked readOnly className="rounded" />
                          <span className="text-foreground">Validate and sanitize all inputs</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <input type="checkbox" checked readOnly className="rounded" />
                          <span className="text-foreground">Use CSRF tokens for forms and sensitive actions</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <input type="checkbox" checked readOnly className="rounded" />
                          <span className="text-foreground">Implement rate limiting on logins</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <input type="checkbox" checked readOnly className="rounded" />
                          <span className="text-foreground">Use HttpOnly and Secure flags for cookies</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <input type="checkbox" checked readOnly className="rounded" />
                          <span className="text-foreground">Implement logging and monitoring</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <input type="checkbox" checked readOnly className="rounded" />
                          <span className="text-foreground">Keep dependencies up to date</span>
                        </div>
                      </div>
                    </Card>
                  </div>
                </div>
              </Card>
              </AnimatedCard>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </main>
  )
}
