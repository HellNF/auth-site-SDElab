import Link from "next/link"
import React from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { FadeInOnScroll, AnimatedCard, HoverEffect } from "@/components/react-bits-shim"
import {
  Lock,
  Key,
  Users,
  User,
  Code2,
  Globe,
  Shield,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react"
import ImageLightbox from "@/components/visuals/image-lightbox"
// framer-motion is used inside client components (react-bits-shim). Avoid direct `motion` usage
// in this server component to prevent SSR runtime issues.

export default function ConceptsPage() {
  return (
    <main className="min-h-screen bg-background py-16 scroll-smooth">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto relative">
          <FadeInOnScroll>
            <div className="text-center mb-8 md:mb-10">
              <Badge className="mb-4" variant="secondary">
                Educational Explainer
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">Core Concepts</h1>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Clear, concise explanations of Authentication, Authorization, OAuth 2.x, OpenID Connect, JWTs, SSO and
                Privacy — designed for learning and quick reference.
              </p>
            </div>
          </FadeInOnScroll>

          {/* Floating TOC for large screens (kept as before) */}
          <nav className="hidden lg:block fixed right-4 top-1/3 w-48">
            <div className="bg-card/80 backdrop-blur rounded-xl p-4 border shadow-sm">
              <h4 className="text-sm font-semibold mb-3">On this page</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#auth" className="text-muted-foreground hover:text-foreground">
                    Authentication
                  </a>
                </li>
                <li>
                  <a href="#authz" className="text-muted-foreground hover:text-foreground">
                    Authorization
                  </a>
                </li>
                <li>
                  <a href="#oauth" className="text-muted-foreground hover:text-foreground">
                    OAuth 2.x
                  </a>
                </li>
                <li>
                  <a href="#oidc" className="text-muted-foreground hover:text-foreground">
                    OpenID Connect
                  </a>
                </li>
                <li>
                  <a href="#jwt" className="text-muted-foreground hover:text-foreground">
                    JWTs
                  </a>
                </li>
                <li>
                  <a href="#sso" className="text-muted-foreground hover:text-foreground">
                    SSO
                  </a>
                </li>
                <li>
                  <a href="#privacy" className="text-muted-foreground hover:text-foreground">
                    Privacy
                  </a>
                </li>
              </ul>
            </div>
          </nav>

          {/* Cards column with consistent vertical rhythm */}
          <div className="space-y-8 md:space-y-10">
            {/* Authentication */}
            <section id="auth">
              <AnimatedCard>
                <Card className="p-6 rounded-2xl transform-gpu will-change-transform hover:scale-102 transition-transform duration-200 hover:shadow-lg">
                  <CardHeader className="flex items-center gap-4 pb-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Lock className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl">Authentication vs Authorization</CardTitle>
                      <p className="text-muted-foreground">Authentication answers “Who are you?”</p>
                    </div>
                  </CardHeader>

                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-base text-muted-foreground leading-relaxed">
                        Authentication verifies identity — examples include passwords, biometrics, or device certificates.
                        Authorization decides what that identity is allowed to do. Think of an ID card (authentication) vs a
                        boarding pass (authorization).
                      </p>

                      <div className="grid md:grid-cols-2 gap-4 mt-2">
                        <div className="p-4 border border-border rounded-lg">
                          <h4 className="font-semibold text-foreground mb-1">Authentication</h4>
                          <p className="text-sm text-muted-foreground">Verifies identity. Example factors: password, OTP, biometrics.</p>
                        </div>
                        <div className="p-4 border border-border rounded-lg">
                          <h4 className="font-semibold text-foreground mb-1">Authorization</h4>
                          <p className="text-sm text-muted-foreground">Grants permissions. Example: role-based access to resources.</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedCard>
            </section>

            {/* Authorization (explicit small section) */}
            <section id="authz">
              <AnimatedCard>
                <Card className="p-6 rounded-2xl transform-gpu will-change-transform hover:scale-102 transition-transform duration-200 hover:shadow-lg">
                  <CardHeader className="flex items-center gap-4 pb-4">
                    <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                      <Key className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl">Authorization</CardTitle>
                      <p className="text-muted-foreground">What are you allowed to do?</p>
                    </div>
                  </CardHeader>

                  <CardContent>
                    <p className="text-base text-muted-foreground leading-relaxed">
                      Authorization determines access rights once identity is known. It can be implemented via roles,
                      scopes, or policies. In OAuth, access tokens represent delegated authorization for a client.
                    </p>

                    <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg mt-4">
                      <p className="text-sm text-muted-foreground">
                        Example (HTTP header): <code className="font-mono bg-muted/10 px-1 rounded">Authorization: Bearer &lt;token&gt;</code>
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedCard>
            </section>

            {/* OAuth */}
            <section id="oauth">
              <AnimatedCard>
                <Card className="p-8 transform-gpu will-change-transform hover:scale-102 transition-transform duration-200 hover:shadow-lg">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                      <Key className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold">OAuth 2.x — Delegated Authorization</h2>
                      <p className="text-muted-foreground">Allow apps to access data without sharing passwords</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <p className="text-base text-muted-foreground leading-relaxed">
                      OAuth delegates authorization by issuing tokens instead of sharing user credentials. Key roles are
                      the Resource Owner (user), Client (app), Authorization Server (issues tokens), and Resource Server
                      (API that accepts tokens).
                    </p>

                    <div className="grid md:grid-cols-2 gap-4 mt-2">
                      <Card className="p-4 bg-muted/50">
                        <h4 className="font-semibold mb-1">Why use OAuth?</h4>
                        <p className="text-sm text-muted-foreground">Secure, limited access; revocable tokens; no password sharing.</p>
                      </Card>
                      <Card className="p-4 bg-muted/50">
                        <h4 className="font-semibold mb-1">Common flow</h4>
                        <p className="text-sm text-muted-foreground">Authorization Code → Token exchange → Use access token at Resource Server.</p>
                      </Card>
                    </div>

                    {/* small animated charts */}
                    <div className="mt-4">
                      {/* lazy-load client visual: small preview opens fullscreen lightbox */}
                      <React.Suspense fallback={<div className="text-sm text-muted-foreground">Loading preview…</div>}>
                        <ImageLightbox
                          images={[{ src: "/images/oauth-flow.png", alt: "OAuth 2.0 flow diagram", caption: "OAuth 2.0 – Authorization Code" }]}
                          thumbClassName="h-36 md:h-44"
                        />
                      </React.Suspense>
                    </div>
                  </div>
                </Card>
              </AnimatedCard>
            </section>

            {/* OpenID Connect */}
            <section id="oidc">
              <AnimatedCard>
                <Card className="p-8 transform-gpu will-change-transform hover:scale-102 transition-transform duration-200 hover:shadow-lg">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <User className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold">OpenID Connect — Identity Layer</h2>
                      <p className="text-muted-foreground">Adds authentication to OAuth using an ID Token (a JWT)</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <p className="text-base text-muted-foreground leading-relaxed">
                      OpenID Connect (OIDC) extends OAuth by returning an ID Token (typically a JWT) containing information
                      about the user (claims like email, name, picture). It's what powers “Sign in with Google” flows.
                    </p>

                    <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                      <p className="text-sm text-muted-foreground">
                        ID Token example (claims): <code className="font-mono bg-muted/10 px-1 rounded">{`{ "sub": "1234", "email": "name@example.com" }`}</code>
                      </p>
                    </div>
                  </div>
                </Card>
              </AnimatedCard>
            </section>

            {/* JWT */}
            <section id="jwt">
              <AnimatedCard>
                <Card className="p-8 transform-gpu will-change-transform hover:scale-102 transition-transform duration-200 hover:shadow-lg">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                      <Code2 className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold">JSON Web Tokens (JWT)</h2>
                      <p className="text-muted-foreground">Compact, signed tokens carrying claims</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <p className="text-base text-muted-foreground leading-relaxed">
                      JWTs are encoded as three parts: <span className="font-mono">header.payload.signature</span>. They contain
                      claims about the user or session and are signed to ensure integrity and authenticity.
                    </p>

                    <div className="p-4 bg-muted/50 rounded-lg border border-border">
                      <p className="text-sm text-muted-foreground">Usage: store short-lived access tokens in memory; validate signature and expiry on the server.</p>
                    </div>
                    {/* chart preview removed per request */}
                    <div className="mt-4">
                      {/* lazy-load client visual: small preview opens fullscreen lightbox */}
                      <React.Suspense fallback={<div className="text-sm text-muted-foreground">Loading preview…</div>}>
                        <ImageLightbox
                          images={[{ src: "/images/jwt.png", alt: "JWT structure diagram", caption: "JWT – JSON Web Token" }]}
                          thumbClassName="h-36 md:h-44"
                        />
                      </React.Suspense>
                    </div>
                  </div>
                </Card>
              </AnimatedCard>
            </section>

            {/* SSO */}
            <section id="sso">
              <AnimatedCard>
                <Card className="p-8 transform-gpu will-change-transform hover:scale-102 transition-transform duration-200 hover:shadow-lg">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Globe className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold">Single Sign-On (SSO)</h2>
                      <p className="text-muted-foreground">One login, many applications</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <p className="text-base text-muted-foreground leading-relaxed">
                      SSO allows users to authenticate once and access multiple applications. Examples include signing in
                      to Google and accessing Gmail, YouTube and other Google services without re-entering credentials.
                    </p>

                    <div className="grid md:grid-cols-2 gap-4 mt-2">
                      <Card className="p-4">
                        <p className="font-semibold text-foreground">Improved UX</p>
                        <p className="text-sm text-muted-foreground">Fewer logins, reduced friction.</p>
                      </Card>
                      <Card className="p-4">
                        <p className="font-semibold text-foreground">Centralized Security</p>
                        <p className="text-sm text-muted-foreground">Manage sessions and policies from one identity provider.</p>
                      </Card>
                    </div>

                    <div className="mt-4">
                      <React.Suspense fallback={<div className="text-sm text-muted-foreground">Loading preview…</div>}>
                        <ImageLightbox
                          images={[{ src: "/images/SSO-flow.png", alt: "SAML / SSO flow diagram", caption: "SSO – SAML sequence" }]}
                          thumbClassName="h-36 md:h-44"
                        />
                      </React.Suspense>
                    </div>
                  </div>
                </Card>
              </AnimatedCard>
            </section>

            {/* Privacy */}
            <section id="privacy">
              <AnimatedCard>
                <Card className="p-8 transform-gpu will-change-transform hover:scale-102 transition-transform duration-200 hover:shadow-lg">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                      <Shield className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold">Privacy and Consent</h2>
                      <p className="text-muted-foreground">Data minimization, transparency, and consent</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <p className="text-base text-muted-foreground leading-relaxed">
                      Good service design collects the minimum data needed, requests explicit consent, and explains how
                      data is used. This builds trust and helps meet legal requirements like GDPR.
                    </p>

                    <div className="p-4 bg-accent/10 border border-accent/20 rounded-lg">
                      <p className="text-sm text-muted-foreground">Best practices: explain purposes, offer granular consent, and allow data deletion.</p>
                    </div>
                  </div>
                </Card>
              </AnimatedCard>
            </section>

            {/* Back to Home */}
            <div className="pt-6 flex justify-center">
              <HoverEffect>
                <Link href="/">
                  <Button variant="ghost" className="gap-2">
                    Back to Home
                  </Button>
                </Link>
              </HoverEffect>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

