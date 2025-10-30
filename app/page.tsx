import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, Lock, Key, Users, ArrowRight, CheckCircle2 } from "lucide-react"
import { FadeInOnScroll, AnimatedCard, HoverEffect } from "@/components/react-bits-shim"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <FadeInOnScroll>
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="mb-4" variant="secondary">
            Service Design & Engineering Lab
          </Badge>
          <h1 className="text-5xl font-bold mb-6 text-foreground text-balance">Authentication, OAuth and SSO</h1>
          <p className="text-xl text-muted-foreground mb-8 text-pretty leading-relaxed">
            An interactive lab to understand modern authentication mechanisms, the OAuth 2.0 protocol, and Single Sign-On.
          </p>
          <div className="flex gap-4 justify-center">
            <HoverEffect>
              <Link href="/login">
                <Button size="lg" className="gap-2">
                  Try the Demo
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </HoverEffect>
            <HoverEffect>
              <Link href="/concepts">
                <Button size="lg" variant="outline">
                  Explore the Concepts
                </Button>
              </Link>
            </HoverEffect>
          </div>
        </div>
        </FadeInOnScroll>
      </section>

      {/* Key Concepts Grid */}
      <section className="container mx-auto px-4 py-16">
        <FadeInOnScroll>
  <h2 className="text-3xl font-bold text-center mb-12 text-foreground">Key Concepts</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <AnimatedCard>
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <Lock className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-foreground">Authentication</h3>
            <p className="text-muted-foreground leading-relaxed">
              The process of verifying a user's identity through credentials, biometrics, or other security factors.
            </p>
          </Card>
          </AnimatedCard>

          <AnimatedCard>
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
              <Key className="w-6 h-6 text-accent" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-foreground">OAuth 2.0</h3>
            <p className="text-muted-foreground leading-relaxed">
              An authorization protocol that allows applications to obtain limited access to user accounts on third-party services.
            </p>
          </Card>
          </AnimatedCard>

          <AnimatedCard>
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-foreground">Single Sign-On</h3>
            <p className="text-muted-foreground leading-relaxed">
              Lets users authenticate once to access multiple applications without re-entering credentials.
            </p>
          </Card>
          </AnimatedCard>

          <AnimatedCard>
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-accent" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-foreground">Authorization Code Flow</h3>
            <p className="text-muted-foreground leading-relaxed">
              The most secure OAuth flow, used for web apps with backends that can safely keep client secrets.
            </p>
          </Card>
          </AnimatedCard>

          <AnimatedCard>
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <CheckCircle2 className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-foreground">Access Token</h3>
            <p className="text-muted-foreground leading-relaxed">
              A token representing the authorization granted to the application to access specific resources on behalf of the user.
            </p>
          </Card>
          </AnimatedCard>

          <AnimatedCard>
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
              <Key className="w-6 h-6 text-accent" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-foreground">Refresh Token</h3>
            <p className="text-muted-foreground leading-relaxed">
              A long-lived token used to obtain new access tokens without requiring the user to re-authenticate.
            </p>
          </Card>
          </AnimatedCard>
        </div>
        </FadeInOnScroll>
      </section>

      {/* OAuth Flow Diagram */}
      <section className="container mx-auto px-4 py-16">
        <FadeInOnScroll>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-foreground">The OAuth 2.0 Flow</h2>
          <AnimatedCard>
          <Card className="p-8 bg-card">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold flex-shrink-0">
                  1
                </div>
                <div>
                  <h4 className="font-semibold mb-2 text-foreground">Authorization Request</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    The app redirects the user to the authorization server (e.g., Google, GitHub) with the request parameters.
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
                    The user authenticates with the provider and authorizes the application to access their information.
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
                    The provider redirects the user back to the app with a temporary authorization code.
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
                    The app exchanges the code for an access token by calling the authorization server directly.
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
                    The app can now use the access token to access protected resources on behalf of the user.
                  </p>
                </div>
              </div>
            </div>
          </Card>
          </AnimatedCard>
        </div>
        </FadeInOnScroll>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <AnimatedCard>
        <Card className="max-w-3xl mx-auto p-12 text-center bg-primary text-primary-foreground">
          <h2 className="text-3xl font-bold mb-4">Ready to See It in Action?</h2>
          <p className="text-lg mb-8 opacity-90 text-pretty">
            Try our interactive demo to see how OAuth authentication works with different SSO providers.
          </p>
          <HoverEffect>
            <Link href="/login">
              <Button size="lg" variant="secondary" className="gap-2">
                Start the Demo
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </HoverEffect>
        </Card>
        </AnimatedCard>
      </section>
    </main>
  )
}
