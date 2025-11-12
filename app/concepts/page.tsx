import Link from "next/link"
import React from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FadeInOnScroll, AnimatedCard, HoverEffect } from "@/components/react-bits-shim"
import {
  Lock,
  Key,
  User,
  Code2,
  Globe,
  Shield,
} from "lucide-react"
import ImageLightbox from "@/components/visuals/image-lightbox"
import ConceptsTOC from "@/components/concepts-toc"
import BackToTop from "@/components/back-to-top"

export default function ConceptsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-blue-50/20 py-16 scroll-smooth">
      <div className="max-w-6xl mx-auto px-6">
        {/* Hero Section */}
        <div className="text-center mb-8 md:mb-10">
          <FadeInOnScroll>
            <div>
              <Badge className="mb-4" variant="secondary">
                Educational Explainer
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">Core Concepts</h1>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Clear, concise explanations of Authentication, Authorization, OAuth 2.x, OpenID Connect, JWTs, SSO, and
                Privacy — designed for learning and quick reference.
              </p>
            </div>
          </FadeInOnScroll>
        </div>

        {/* Content with TOC */}
        <div className="lg:flex lg:gap-8">
          {/* Main column */}
          <div className="flex-1 max-w-4xl mx-auto relative">
            {/* Decorative chain on large screens */}
            <div className="hidden lg:block absolute left-[-24px] top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-blue-100 to-transparent" />

            <div className="space-y-12 md:space-y-16">
              {/* === Authentication === */}
              <section id="auth">
                <AnimatedCard>
                  <div className="group relative overflow-hidden rounded-2xl bg-white shadow-md hover:shadow-lg transition-all">
                    <div className="absolute left-0 top-0 h-full w-1.5 bg-gradient-to-b from-blue-500 to-blue-400 rounded-l-2xl" />
                    <Card className="border-0 shadow-none p-0">
                      <CardHeader className="flex items-center gap-4 pb-0 pt-8 px-8">
                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Lock className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-2xl text-gray-900">
                            Authentication vs Authorization
                          </CardTitle>
                          <p className="text-gray-600 leading-relaxed">
                            Authentication answers “Who are you?”
                          </p>
                        </div>
                      </CardHeader>
                      <CardContent className="px-8 pb-8 pt-6">
                        <p className="text-base text-gray-600 leading-relaxed mb-4">
                          Authentication verifies identity — examples include passwords, biometrics, or device certificates.
                          Authorization decides what that identity is allowed to do. Think of an ID card (authentication)
                          vs a boarding pass (authorization).
                        </p>
                        <div className="grid md:grid-cols-2 gap-4 mt-2">
                          <div className="p-4 border border-border rounded-lg bg-white/60">
                            <h4 className="font-semibold text-foreground mb-1">Authentication</h4>
                            <p className="text-sm text-gray-600">
                              Verifies identity. Example factors: password, OTP, biometrics.
                            </p>
                          </div>
                          <div className="p-4 border border-border rounded-lg bg-white/60">
                            <h4 className="font-semibold text-foreground mb-1">Authorization</h4>
                            <p className="text-sm text-gray-600">
                              Grants permissions. Example: role-based access to resources.
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </AnimatedCard>
              </section>

              <div className="h-px bg-gradient-to-r from-blue-400 to-transparent" />

              {/* === Authorization === */}
              <section id="authz">
                <AnimatedCard>
                  <div className="group relative overflow-hidden rounded-2xl bg-white shadow-md hover:shadow-lg transition-all">
                    <div className="absolute left-0 top-0 h-full w-1.5 bg-gradient-to-b from-indigo-500 to-indigo-400 rounded-l-2xl" />
                    <Card className="border-0 shadow-none p-0">
                      <CardHeader className="flex items-center gap-4 pb-0 pt-8 px-8">
                        <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                          <Key className="w-6 h-6 text-accent" />
                        </div>
                        <div>
                          <CardTitle className="text-2xl text-gray-900">Authorization</CardTitle>
                          <p className="text-gray-600 leading-relaxed">
                            What are you allowed to do?
                          </p>
                        </div>
                      </CardHeader>
                      <CardContent className="px-8 pb-8 pt-6">
                        <p className="text-base text-gray-600 leading-relaxed">
                          Authorization determines access rights once identity is known. It can be implemented via roles,
                          scopes, or policies. In OAuth, access tokens represent delegated authorization for a client.
                        </p>
                        <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg mt-4">
                          <p className="text-sm text-gray-600">
                            Example (HTTP header):{" "}
                            <code className="font-mono bg-gray-100 text-gray-800 px-2 py-0.5 rounded">
                              Authorization: Bearer &lt;token&gt;
                            </code>
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </AnimatedCard>
              </section>

              <div className="h-px bg-gradient-to-r from-blue-400 to-transparent" />

              {/* === OAuth 2.x === */}
              <section id="oauth">
                <AnimatedCard>
                  <div className="group relative overflow-hidden rounded-2xl bg-white shadow-md hover:shadow-lg transition-all">
                    <div className="absolute left-0 top-0 h-full w-1.5 bg-gradient-to-b from-blue-500 to-blue-400 rounded-l-2xl" />
                    <Card className="border-0 shadow-none p-0">
                      <div className="flex items-center gap-4 mb-0 pt-8 px-8">
                        <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                          <Key className="w-6 h-6 text-accent" />
                        </div>
                        <div>
                          <h2 className="text-2xl font-semibold text-gray-900">
                            OAuth 2.x — Delegated Authorization
                          </h2>
                          <p className="text-gray-600 leading-relaxed">
                            Allow apps to access data without sharing passwords
                          </p>
                        </div>
                      </div>
                      <div className="space-y-4 px-8 pb-8 pt-6">
                        <p className="text-base text-gray-600 leading-relaxed">
                          OAuth delegates authorization by issuing tokens instead of sharing user credentials.
                          Key roles are the Resource Owner (user), Client (app), Authorization Server (issues tokens),
                          and Resource Server (API that accepts tokens).
                        </p>
                        <div className="grid md:grid-cols-2 gap-4 mt-2">
                          <Card className="p-4 bg-muted/50 border border-border">
                            <h4 className="font-semibold mb-1">Why use OAuth?</h4>
                            <p className="text-sm text-muted-foreground">
                              Secure, limited access; revocable tokens; no password sharing.
                            </p>
                          </Card>
                          <Card className="p-4 bg-muted/50 border border-border">
                            <h4 className="font-semibold mb-1">Common flow</h4>
                            <p className="text-sm text-muted-foreground">
                              Authorization Code → Token exchange → Use access token at Resource Server.
                            </p>
                          </Card>
                        </div>
                        <div className="mt-4">
                          <React.Suspense fallback={<div className="text-sm text-muted-foreground">Loading preview…</div>}>
                            <div className="border border-blue-100 rounded-lg bg-white/60 p-3 shadow-sm">
                              <ImageLightbox
                                images={[
                                  {
                                    src: "/images/oauth-flow.png",
                                    alt: "OAuth 2.0 flow diagram",
                                    caption: "OAuth 2.0 – Authorization Code",
                                  },
                                ]}
                                thumbClassName="h-36 md:h-44"
                              />
                              <p className="text-xs text-gray-500 mt-2 text-center">
                                OAuth 2.0 Flow example
                              </p>
                            </div>
                          </React.Suspense>
                        </div>
                      </div>
                    </Card>
                  </div>
                </AnimatedCard>
              </section>

              {/* === OIDC === */}
              <section id="oidc">
                <AnimatedCard>
                  <div className="group relative overflow-hidden rounded-2xl bg-white shadow-md hover:shadow-lg transition-all">
                    <div className="absolute left-0 top-0 h-full w-1.5 bg-gradient-to-b from-violet-500 to-violet-400 rounded-l-2xl" />
                    <Card className="border-0 shadow-none p-0">
                      <div className="flex items-center gap-4 mb-0 pt-8 px-8">
                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                          <User className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h2 className="text-2xl font-semibold text-gray-900">OpenID Connect — Identity Layer</h2>
                          <p className="text-gray-600 leading-relaxed">Adds authentication to OAuth using an ID Token (a JWT)</p>
                        </div>
                      </div>
                      <div className="space-y-4 px-8 pb-8 pt-6">
                        <p className="text-base text-gray-600 leading-relaxed">
                          OpenID Connect (OIDC) extends OAuth by returning an ID Token (typically a JWT) containing information
                          about the user (claims like email, name, picture). It's what powers “Sign in with …” buttons.
                        </p>
                        <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                          <p className="text-sm text-gray-600">
                            ID Token example (claims): <code className="font-mono bg-gray-100 text-gray-800 px-2 py-0.5 rounded">{`{ "sub": "1234", "email": "name@example.com" }`}</code>
                          </p>
                        </div>
                      </div>
                    </Card>
                  </div>
                </AnimatedCard>
              </section>

              <div className="h-px bg-gradient-to-r from-blue-400 to-transparent" />

              {/* === JWT === */}
              <section id="jwt">
                <AnimatedCard>
                  <div className="group relative overflow-hidden rounded-2xl bg-white shadow-md hover:shadow-lg transition-all">
                    <div className="absolute left-0 top-0 h-full w-1.5 bg-gradient-to-b from-indigo-500 to-indigo-400 rounded-l-2xl" />
                    <Card className="border-0 shadow-none p-0">
                      <div className="flex items-center gap-4 mb-0 pt-8 px-8">
                        <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                          <Code2 className="w-6 h-6 text-accent" />
                        </div>
                        <div>
                          <h2 className="text-2xl font-semibold text-gray-900">JSON Web Tokens (JWT)</h2>
                          <p className="text-gray-600 leading-relaxed">Compact, signed tokens carrying claims</p>
                        </div>
                      </div>
                      <div className="space-y-4 px-8 pb-8 pt-6">
                        <p className="text-base text-gray-600 leading-relaxed">
                          JWTs are encoded as three parts: <span className="font-mono">header.payload.signature</span>. They contain
                          claims about the user or session and are signed to ensure integrity and authenticity.
                        </p>
                        <div className="p-4 bg-muted/50 rounded-lg border border-border">
                          <p className="text-sm text-gray-600">Usage: store short-lived access tokens in memory; validate signature and expiry on the server.</p>
                        </div>
                        <div className="mt-4">
                          <React.Suspense fallback={<div className="text-sm text-muted-foreground">Loading preview…</div>}>
                            <div className="border border-blue-100 rounded-lg bg-white/60 p-3 shadow-sm">
                              <ImageLightbox
                                images={[{ src: "/images/jwt.png", alt: "JWT structure diagram", caption: "JWT – JSON Web Token" }]}
                                thumbClassName="h-36 md:h-44"
                              />
                              <p className="text-xs text-gray-500 mt-2 text-center">JWT structure example</p>
                            </div>
                          </React.Suspense>
                        </div>
                      </div>
                    </Card>
                  </div>
                </AnimatedCard>
              </section>

              <div className="h-px bg-gradient-to-r from-blue-400 to-transparent" />

              {/* === SSO === */}
              <section id="sso">
                <AnimatedCard>
                  <div className="group relative overflow-hidden rounded-2xl bg-white shadow-md hover:shadow-lg transition-all">
                    <div className="absolute left-0 top-0 h-full w-1.5 bg-gradient-to-b from-sky-500 to-sky-400 rounded-l-2xl" />
                    <Card className="border-0 shadow-none p-0">
                      <div className="flex items-center gap-4 mb-0 pt-8 px-8">
                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Globe className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h2 className="text-2xl font-semibold text-gray-900">Single Sign-On (SSO)</h2>
                          <p className="text-gray-600 leading-relaxed">One login, many applications</p>
                        </div>
                      </div>
                      <div className="space-y-4 px-8 pb-8 pt-6">
                        <p className="text-base text-gray-600 leading-relaxed">
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
                            <div className="border border-blue-100 rounded-lg bg-white/60 p-3 shadow-sm">
                              <ImageLightbox
                                images={[{ src: "/images/SSO-flow.png", alt: "SAML / SSO flow diagram", caption: "SSO – SAML sequence" }]}
                                thumbClassName="h-36 md:h-44"
                              />
                              <p className="text-xs text-gray-500 mt-2 text-center">SSO sequence example</p>
                            </div>
                          </React.Suspense>
                        </div>
                      </div>
                    </Card>
                  </div>
                </AnimatedCard>
              </section>

              <div className="h-px bg-gradient-to-r from-blue-400 to-transparent" />

              {/* === Privacy === */}
              <section id="privacy">
                <AnimatedCard>
                  <div className="group relative overflow-hidden rounded-2xl bg-white shadow-md hover:shadow-lg transition-all">
                    <div className="absolute left-0 top-0 h-full w-1.5 bg-gradient-to-b from-emerald-500 to-emerald-400 rounded-l-2xl" />
                    <Card className="border-0 shadow-none p-0">
                      <div className="flex items-center gap-4 mb-0 pt-8 px-8">
                        <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                          <Shield className="w-6 h-6 text-accent" />
                        </div>
                        <div>
                          <h2 className="text-2xl font-semibold text-gray-900">Privacy and Consent</h2>
                          <p className="text-gray-600 leading-relaxed">Data minimization, transparency, and consent</p>
                        </div>
                      </div>
                      <div className="space-y-4 px-8 pb-8 pt-6">
                        <p className="text-base text-gray-600 leading-relaxed">
                          Good service design collects the minimum data needed, requests explicit consent, and explains how
                          data is used. This builds trust and helps meet legal requirements like GDPR.
                        </p>
                        <div className="p-4 bg-accent/10 border border-accent/20 rounded-lg">
                          <p className="text-sm text-gray-600">Best practices: explain purposes, offer granular consent, and allow data deletion.</p>
                        </div>
                      </div>
                    </Card>
                  </div>
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
              <BackToTop />
            </div>
          </div>

          {/* Sticky TOC */}
          <aside className="hidden lg:block sticky top-24 w-56 self-start">
            <ConceptsTOC
              sections={[
                { id: "auth", label: "Authentication" },
                { id: "authz", label: "Authorization" },
                { id: "oauth", label: "OAuth 2.x" },
                { id: "oidc", label: "OpenID Connect" },
                { id: "jwt", label: "JWTs" },
                { id: "sso", label: "SSO" },
                { id: "privacy", label: "Privacy" },
              ]}
            />
          </aside>
        </div>
      </div>
    </main>
  )
}
