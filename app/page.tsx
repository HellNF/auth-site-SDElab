import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Shield, Lock, Key, Users, ArrowRight, CheckCircle2 } from "lucide-react"
import { FadeInOnScroll, AnimatedCard, HoverEffect } from "@/components/react-bits-shim"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-100 py-24">
        <FadeInOnScroll>
          <div className="max-w-6xl mx-auto px-6 text-center relative">
            
            <h1 className="text-5xl font-bold mb-4 text-foreground text-balance inline-flex items-center justify-center gap-3">
              <Shield className="w-8 h-8 text-blue-600" /> Authentication, 
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">OAuth</span>
              &nbsp;and SSO
            </h1>
            <div className="flex flex-col justify-center items-center">
              <span className="inline-flex items-center gap-2 rounded-full w-fit bg-blue-100 text-blue-800 px-4 py-1 text-sm font-medium mb-4">
              🔐 Service Design & Engineering Lab
              </span>
              <p className="text-xl text-gray-600 mb-8 text-pretty leading-relaxed">
              An interactive lab to understand modern authentication mechanisms, the OAuth 2.0 protocol, and Single Sign-On.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <HoverEffect>
                <Link href="/login">
                  <Button size="lg" className="gap-2 bg-blue-600 hover:bg-blue-700">
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

            {/* Decorative hero illustration */}
            <div className="pointer-events-none absolute -right-24 -top-10 hidden md:block opacity-50">
              <svg width="420" height="260" viewBox="0 0 420 260" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="g1" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#60A5FA" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#A78BFA" stopOpacity="0.15" />
                  </linearGradient>
                </defs>
                <path d="M10 200 C 80 120, 140 240, 210 160 S 340 180, 410 120" stroke="url(#g1)" strokeWidth="6" strokeLinecap="round" />
                <circle cx="70" cy="140" r="6" fill="#60A5FA" />
                <circle cx="210" cy="160" r="6" fill="#A78BFA" />
                <circle cx="350" cy="140" r="6" fill="#EC4899" />
              </svg>
            </div>
          </div>
        </FadeInOnScroll>
      </section>

      {/* Key Concepts Grid */}
      <section className="bg-gradient-to-b from-white to-blue-50/30 py-24">
        <FadeInOnScroll>
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12 text-foreground">Key Concepts</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12 items-stretch">
              <AnimatedCard>
                <Card className="group relative overflow-hidden h-full rounded-2xl bg-white/80 backdrop-blur-sm shadow-md border-0 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                  <div className="absolute left-0 top-0 h-full w-1.5 bg-gradient-to-b from-blue-500 to-blue-400 rounded-l-2xl transition-all duration-300 group-hover:from-blue-400 group-hover:to-indigo-500" />
                  <div className="p-8 pl-10 flex flex-col">
                    <div className="h-12 w-12 flex items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white mb-4">
                      <Lock className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2 text-gray-900">Authentication</h3>
                    <p className="text-gray-600 leading-relaxed">
                      The process of verifying a user's identity through credentials, biometrics, or other security factors.
                    </p>
                  </div>
                </Card>
              </AnimatedCard>

              <AnimatedCard>
                <Card className="group relative overflow-hidden h-full rounded-2xl bg-white/80 backdrop-blur-sm shadow-md border-0 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                  <div className="absolute left-0 top-0 h-full w-1.5 bg-gradient-to-b from-indigo-500 to-indigo-400 rounded-l-2xl transition-all duration-300 group-hover:from-indigo-400 group-hover:to-violet-500" />
                  <div className="p-8 pl-10 flex flex-col">
                    <div className="h-12 w-12 flex items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 text-white mb-4">
                      <Key className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2 text-gray-900">OAuth 2.0</h3>
                    <p className="text-gray-600 leading-relaxed">
                      An authorization protocol that allows applications to obtain limited access to user accounts on third-party services.
                    </p>
                  </div>
                </Card>
              </AnimatedCard>

              <AnimatedCard>
                <Card className="group relative overflow-hidden h-full rounded-2xl bg-white/80 backdrop-blur-sm shadow-md border-0 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                  <div className="absolute left-0 top-0 h-full w-1.5 bg-gradient-to-b from-violet-500 to-violet-400 rounded-l-2xl transition-all duration-300 group-hover:from-violet-400 group-hover:to-fuchsia-500" />
                  <div className="p-8 pl-10 flex flex-col">
                    <div className="h-12 w-12 flex items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 text-white mb-4">
                      <Users className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2 text-gray-900">Single Sign-On</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Lets users authenticate once to access multiple applications without re-entering credentials.
                    </p>
                  </div>
                </Card>
              </AnimatedCard>

              <AnimatedCard>
                <Card className="group relative overflow-hidden h-full rounded-2xl bg-white/80 backdrop-blur-sm shadow-md border-0 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                  <div className="absolute left-0 top-0 h-full w-1.5 bg-gradient-to-b from-sky-500 to-sky-400 rounded-l-2xl transition-all duration-300 group-hover:from-sky-400 group-hover:to-blue-500" />
                  <div className="p-8 pl-10 flex flex-col">
                    <div className="h-12 w-12 flex items-center justify-center rounded-full bg-gradient-to-r from-sky-500 to-blue-500 text-white mb-4">
                      <Shield className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2 text-gray-900">Authorization Code Flow</h3>
                    <p className="text-gray-600 leading-relaxed">
                      The most secure OAuth flow, used for web apps with backends that can safely keep client secrets.
                    </p>
                  </div>
                </Card>
              </AnimatedCard>

              <AnimatedCard>
                <Card className="group relative overflow-hidden h-full rounded-2xl bg-white/80 backdrop-blur-sm shadow-md border-0 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                  <div className="absolute left-0 top-0 h-full w-1.5 bg-gradient-to-b from-emerald-500 to-emerald-400 rounded-l-2xl transition-all duration-300 group-hover:from-emerald-400 group-hover:to-teal-500" />
                  <div className="p-8 pl-10 flex flex-col">
                    <div className="h-12 w-12 flex items-center justify-center rounded-full bg-gradient-to-r from-teal-500 to-emerald-500 text-white mb-4">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2 text-gray-900">Access Token</h3>
                    <p className="text-gray-600 leading-relaxed">
                      A token representing the authorization granted to the application to access specific resources on behalf of the user.
                    </p>
                  </div>
                </Card>
              </AnimatedCard>

              <AnimatedCard>
                <Card className="group relative overflow-hidden h-full rounded-2xl bg-white/80 backdrop-blur-sm shadow-md border-0 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                  <div className="absolute left-0 top-0 h-full w-1.5 bg-gradient-to-b from-purple-500 to-purple-400 rounded-l-2xl transition-all duration-300 group-hover:from-purple-400 group-hover:to-violet-500" />
                  <div className="p-8 pl-10 flex flex-col">
                    <div className="h-12 w-12 flex items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 text-white mb-4">
                      <Key className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2 text-gray-900">Refresh Token</h3>
                    <p className="text-gray-600 leading-relaxed">
                      A long-lived token used to obtain new access tokens without requiring the user to re-authenticate.
                    </p>
                  </div>
                </Card>
              </AnimatedCard>
            </div>
          </div>
        </FadeInOnScroll>
      </section>

      

      {/* CTA Section */}
      <section className="py-24">
        <AnimatedCard>
          <div className="max-w-3xl mx-auto px-6">
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-1">
              <div className="rounded-2xl bg-white/10 backdrop-blur-sm p-12 text-center">
                <h2 className="text-3xl font-semibold text-white mb-4">Ready to See It in Action?</h2>
                <p className="text-white/80 leading-relaxed mb-8 text-pretty">
                  Try our interactive demo to see how OAuth authentication works with different SSO providers.
                </p>
                <HoverEffect>
                  <Link href="/login">
                    <Button size="lg" className="rounded-full px-8 py-3 bg-white text-blue-700 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-300">
                      Start the Demo →
                    </Button>
                  </Link>
                </HoverEffect>
              </div>
            </div>
          </div>
        </AnimatedCard>
      </section>
    </main>
  )
}
