"use client"

import { Fragment, useEffect, useMemo } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useSession } from "next-auth/react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { SSOLoginButton } from "@/components/sso-login-button"
import {
  ArrowRight,
  BookOpen,
  Layers,
  Eye,
  Github,
  Chrome,
  Server,
  Key,
  Shield,
  ChevronRight,
  Info,
  Lock,
  User,
} from "lucide-react"
import { GradientText, FadeInOnScroll, AnimatedCard } from "@/components/react-bits-shim"

// Wrapper senza animazione per sezioni non critiche
const NoFade: React.FC<React.PropsWithChildren> = ({ children }) => <>{children}</>

interface LoginPageContentProps {
  providersConfigured: boolean
  configuredProviders: string[]
}

export function LoginPageContent({ providersConfigured, configuredProviders }: LoginPageContentProps) {
  const { status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/dashboard")
    }
  }, [status, router])

  const handleAuthFlowStart = undefined

  const configuredBadgeVariants = useMemo(() => {
    const configuredSet = new Set(configuredProviders)
    return (provider: "github" | "google") => (configuredSet.has(provider) ? "default" : "secondary")
  }, [configuredProviders])

  const disabledExplanation = providersConfigured
    ? null
    : {
        title: "Configuration required",
        description:
          "To enable SSO login, set the environment variables GITHUB_ID, GITHUB_SECRET, GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET, then restart the server.",
      }

  if (status === "authenticated") {
    return null
  }

  return (
    <main className="relative overflow-hidden bg-gradient-to-b from-blue-50 via-white to-blue-100/30">
      {/* Decorative background shapes */}
      <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-gradient-to-br from-blue-400/20 via-indigo-400/20 to-purple-400/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-gradient-to-tr from-purple-400/10 via-pink-400/10 to-blue-400/10 blur-3xl" />

      <div className="max-w-6xl mx-auto px-6 py-16 space-y-10">
        {/* Header: manteniamo animazione */}
        <FadeInOnScroll>
          <div className="text-center">
            <GradientText from="blue-600" via="indigo-500" to="purple-500" className="text-4xl font-bold">
              Authentication & SSO Demo
            </GradientText>
            <p className="mt-3 max-w-3xl mx-auto text-muted-foreground leading-relaxed text-center text-[1.05rem]">
              This page is part of the <b>Service Design & Engineering Lab</b> on Authentication and SSO. Sign in using real
              OAuth providers and observe the live message exchange between the <code>Client</code>,
              <code> Authorization Server</code>, and <code>Resource Server</code>.
            </p>

            {/* Step indicator */}
            <div className="flex items-center justify-center gap-2 mt-6">
              <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium">Step 1</span>
              <ChevronRight className="text-blue-400 w-4 h-4" />
              <Link href="/dashboard" className="px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-sm hover:bg-gray-200">
                Step 2
              </Link>
            </div>
          </div>
        </FadeInOnScroll>

        {/* Glass login card: manteniamo animazione */}
        <FadeInOnScroll>
          <div className="relative mx-auto max-w-md">
            <AnimatedCard className="p-8 rounded-2xl bg-white/70 backdrop-blur-lg shadow-xl border border-white/40 hover:shadow-2xl transition-all duration-300 hover:-translate-y-0.5">
              <div className="bg-gradient-to-r from-blue-500 to-indigo-500 h-1 rounded-t-2xl -mt-2 mb-6" />

              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Lock className="w-5 h-5 text-blue-600" />
                  <h2 className="text-2xl font-semibold text-foreground">Sign in with an SSO Provider</h2>
                </div>
                <p className="text-sm text-muted-foreground">
                  Authentication is managed by NextAuth using OAuth credentials defined in your <code>.env</code> file.
                </p>
              </div>

              {disabledExplanation ? (
                <Alert variant="destructive" className="mt-6">
                  <AlertTitle>{disabledExplanation.title}</AlertTitle>
                  <AlertDescription>{disabledExplanation.description}</AlertDescription>
                </Alert>
              ) : null}

              <div className="flex flex-col gap-3 mt-6">
                <SSOLoginButton provider="github" onFlowStart={handleAuthFlowStart} disabled={!providersConfigured} />
                <SSOLoginButton provider="google" onFlowStart={handleAuthFlowStart} disabled={!providersConfigured} />
              </div>

              {/* Visual separator */}
              <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent my-6" />

              {/* Icon flow summary */}
              <div className="flex justify-center items-center gap-3 text-gray-500 mt-2 text-sm">
                <User className="w-5 h-5" />
                <ArrowRight className="w-4 h-4" />
                <Key className="w-5 h-5" />
                <ArrowRight className="w-4 h-4" />
                <Server className="w-5 h-5" />
                <ArrowRight className="w-4 h-4" />
                <Shield className="w-5 h-5" />
              </div>
              <p className="text-xs text-muted-foreground mt-2 text-center">
                Client → Access Token → Authorization/Resource Servers
              </p>
            </AnimatedCard>

            {/* Tip box */}
            <div className="mt-6 p-4 bg-blue-50/80 border-l-4 border-blue-400 rounded-md text-blue-900 flex items-start gap-3">
              <Info className="w-5 h-5 mt-0.5 text-blue-500" />
              <p>
                Once signed in, open the
                <Link href="/dashboard" className="font-semibold underline text-blue-700 hover:text-blue-800 ml-1">
                  Dashboard
                </Link>
                to explore the real OAuth 2.0 message trace.
              </p>
            </div>
          </div>
        </FadeInOnScroll>

        {/* Titolo sezione: niente fade */}
        <NoFade>
          <h3 className="text-2xl font-semibold mb-6 text-gray-900 text-center">How this works</h3>
        </NoFade>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-start">
          {/* Roles: niente fade */}
          <NoFade>
            <Card className="h-full p-6 rounded-xl bg-white/80 backdrop-blur border border-white/60 shadow-sm hover:shadow-lg hover:scale-[1.01] transition-all duration-200 relative overflow-hidden">
              <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-blue-500 to-indigo-500" />
              <div className="flex items-center gap-2 mb-3">
                <BookOpen className="w-5 h-5 text-blue-600" />
                <h4 className="text-lg font-semibold text-foreground">Roles in the OAuth 2.0 Flow</h4>
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>👤 <b>Resource Owner:</b> The user who grants authorization.</li>
                <li>💻 <b>Client:</b> This demo application requesting access.</li>
                <li>🔐 <b>Authorization Server:</b> Manages user authentication (e.g., Google, GitHub).</li>
                <li>📦 <b>Resource Server:</b> Hosts the protected data (e.g., user profile).</li>
              </ul>
            </Card>
          </NoFade>

          {/* Phases: niente fade */}
          <NoFade>
            <Card className="h-full p-6 rounded-xl bg-white/80 backdrop-blur border border-white/60 shadow-sm hover:shadow-lg hover:scale-[1.01] transition-all duration-200 relative overflow-hidden">
              <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-indigo-500 to-purple-500" />
              <div className="flex items-center gap-2 mb-3">
                <Layers className="w-5 h-5 text-indigo-600" />
                <h4 className="text-lg font-semibold text-foreground">Phases of the Authentication Flow</h4>
              </div>
              <ol className="list-decimal list-inside text-sm text-muted-foreground space-y-1">
                <li>The client redirects the user to the chosen provider.</li>
                <li>The user logs in and grants authorization.</li>
                <li>The provider returns an <code>authorization code</code>.</li>
                <li>The app exchanges the code for an <code>access token</code> and creates the local session.</li>
              </ol>
            </Card>
          </NoFade>

          {/* What to observe: niente fade */}
          <NoFade>
            <Card className="md:col-span-2 h-full p-6 rounded-xl bg-white/80 backdrop-blur border border-white/60 shadow-sm hover:shadow-lg hover:scale-[1.005] transition-all duration-200 relative overflow-hidden">
              <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-teal-500 to-emerald-500" />
              <div className="flex items-center gap-2 mb-3">
                <Eye className="w-5 h-5 text-teal-600" />
                <h4 className="text-lg font-semibold text-foreground">What to Observe During the Flow</h4>
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>🔄 Watch for redirects and URL changes.</li>
                <li>🔑 Identify where the <code>authorization code</code> is returned.</li>
                <li>🛡️ Notice when the local session is created.</li>
                <li>➡️ After login, the Dashboard shows the real message timeline of the OAuth flow.</li>
              </ul>
            </Card>
          </NoFade>

          {/* Advantages: niente fade */}
          <NoFade>
            <Card className="h-full p-6 rounded-xl bg-white/80 backdrop-blur border border-white/60 shadow-sm hover:shadow-lg hover:scale-[1.01] transition-all duration-200 relative overflow-hidden">
              <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-emerald-500 to-green-600" />
              <h4 className="font-semibold mb-3 text-foreground">Advantages of Single Sign-On (SSO)</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 mt-0.5">✓</span>
                  <span>Faster login through trusted providers.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 mt-0.5">✓</span>
                  <span>No need to manage local user passwords.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 mt-0.5">✓</span>
                  <span>Consistent user experience across services.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 mt-0.5">✓</span>
                  <span>Reduced risk of phishing and credential leaks.</span>
                </li>
              </ul>
            </Card>
          </NoFade>

          {/* Configured providers: niente fade */}
          <NoFade>
            <Card className="h-full w-lg self-start p-6 rounded-xl bg-white/80 backdrop-blur border border-white/60 shadow-sm hover:shadow-lg hover:scale-[1.01] transition-all duration-200 relative overflow-hidden">
              <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-blue-500 to-purple-500" />
              <h4 className="font-semibold mb-3 text-foreground">Configured Providers</h4>
              <div className="flex flex-wrap gap-2">
                <Badge variant={configuredBadgeVariants("github")} className="flex items-center gap-1">
                  <Github className="w-4 h-4" /> GitHub
                </Badge>
                <Badge variant={configuredBadgeVariants("google")} className="flex items-center gap-1">
                  <Chrome className="w-4 h-4 text-yellow-600" /> Google
                </Badge>
              </div>
              <Separator className="my-4" />
              <p className="text-xs text-muted-foreground leading-relaxed">
                Set the environment variables <code>GITHUB_ID</code>, <code>GITHUB_SECRET</code>, <code>GOOGLE_CLIENT_ID</code> and
                <code> GOOGLE_CLIENT_SECRET</code> to enable the respective providers.
              </p>
            </Card>
          </NoFade>
        </section>

        {/* Footer (già senza fade) */}
        <footer className="text-center mt-12 text-sm text-gray-500">
          Educational demo — built with <span className="text-blue-600 font-medium">NextAuth & OAuth 2.0</span> ·
          <Link href="https://github.com/HellNF/auth-site-SDElab" className="hover:underline ml-1" target="_blank" rel="noreferrer noopener">
            View source
          </Link>
        </footer>
      </div>
    </main>
  )
}
