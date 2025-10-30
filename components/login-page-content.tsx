"use client"

import { useEffect, useMemo } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useSession } from "next-auth/react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { SSOLoginButton } from "@/components/sso-login-button"
import { ArrowRight, BookOpen, Layers, Eye, UsersRound, Github, Chrome, Laptop, Server, Key, Database, Shield } from "lucide-react"
import { GradientText, FadeInOnScroll, AnimatedCard, HoverEffect } from "@/components/react-bits-shim"

interface LoginPageContentProps {
  providersConfigured: boolean
  configuredProviders: string[]
}

const providerLabels: Record<"github" | "google", string> = {
  github: "GitHub",
  google: "Google",
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
    <main className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <GradientText from="blue-600" via="purple-600" to="pink-500" className="text-4xl font-bold">
              Authentication & SSO Demo
            </GradientText>
            <p className="text-muted-foreground text-lg">
              This page is part of the <b>Service Design & Engineering Lab</b> on Authentication and SSO. <br />
              You can sign in using real OAuth providers and observe the real-time message exchange between
              <code> Client </code>, <code> Authorization Server </code> and <code> Resource Server</code>.
            </p>
            <p className="mt-3 text-sm text-muted-foreground">
              <span className="font-semibold text-blue-600">Step 1</span>: Sign in
              <ArrowRight className="inline mx-1 w-3 h-3 text-muted-foreground" />
              <Link href="/dashboard" className="text-muted-foreground hover:text-blue-600 hover:underline">
                <span className="text-gray-500">Step 2</span>: Observe the Flow
              </Link>
            </p>
          </div>
          {/* Centerpiece sign-in card enhanced with React Bits */}
          <FadeInOnScroll>
            <AnimatedCard
              className="max-w-lg w-full mx-auto p-10 rounded-2xl border border-gray-200 bg-white/80 backdrop-blur-sm
                         shadow-[0_10px_40px_-5px_rgba(37,99,235,0.25)]
                         hover:shadow-[0_15px_50px_-5px_rgba(37,99,235,0.35)]
                         transition-all duration-300 hover:-translate-y-1"
            >
              {/* Gradient accent bar */}
              <div className="h-1 w-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-t-2xl -mt-2 mb-6" />

              {/* Title and description */}
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Shield className="w-5 h-5 text-blue-600" />
                  <h2 className="text-2xl font-semibold text-foreground">Sign in with an SSO Provider</h2>
                </div>
                <p className="text-sm text-muted-foreground">
                  Authentication is managed by NextAuth using OAuth credentials defined in your <code>.env</code> file.
                </p>
              </div>

              {/* Disabled explanation */}
              {disabledExplanation ? (
                <Alert variant="destructive" className="mt-6">
                  <AlertTitle>{disabledExplanation.title}</AlertTitle>
                  <AlertDescription>{disabledExplanation.description}</AlertDescription>
                </Alert>
              ) : null}

              {/* SSO buttons with gentle hover effect */}
              <div className="flex flex-col gap-3 mt-6">
                <HoverEffect>
                  <SSOLoginButton provider="github" onFlowStart={handleAuthFlowStart} disabled={!providersConfigured} />
                </HoverEffect>
                <HoverEffect>
                  <SSOLoginButton provider="google" onFlowStart={handleAuthFlowStart} disabled={!providersConfigured} />
                </HoverEffect>
              </div>

              {/* Diagram of OAuth flow */}
              <div className="flex items-center justify-center gap-2 mt-8 text-muted-foreground">
                <Laptop className="w-5 h-5" />
                <ArrowRight className="w-4 h-4" />
                <Server className="w-5 h-5" />
                <ArrowRight className="w-4 h-4" />
                <Key className="w-5 h-5" />
                <ArrowRight className="w-4 h-4" />
                <Database className="w-5 h-5" />
              </div>
              <p className="text-sm text-muted-foreground mt-2 text-center">
                Client → Authorization Server → Access Token → Resource Server
              </p>

              {/* Dashboard hint */}
              <p className="text-sm text-muted-foreground mt-6 text-center">
                After signing in, go to the {" "}
                <Link href="/dashboard" className="underline font-medium text-blue-600 hover:text-blue-800">
                  Dashboard
                </Link>{" "}
                to view the real OAuth message trace.
              </p>
            </AnimatedCard>
          </FadeInOnScroll>

          {/* Hint banner linking to Dashboard */}
          <FadeInOnScroll>
            <Alert className="max-w-2xl mx-auto bg-blue-50 border-blue-200 mt-8">
            <AlertDescription>
              ✅ Once you’ve signed in, go to the
              {" "}
              <Link href="/dashboard" className="font-semibold underline text-blue-600 hover:text-blue-700">
                Dashboard
              </Link>
              {" "}
              to explore the real OAuth 2.0 message trace in detail.
            </AlertDescription>
            </Alert>
          </FadeInOnScroll>

          {/* Understanding the Flow: Roles and Phases */}
          <div className="grid md:grid-cols-2 gap-8 mt-10">
            <FadeInOnScroll>
              <Card className="p-6 rounded-xl border border-l-4 border-l-blue-400 bg-blue-50">
              <div className="flex items-center gap-2 mb-3">
                <BookOpen className="w-5 h-5 text-blue-500" />
                <h3 className="text-lg font-semibold text-foreground">Roles in the OAuth 2.0 Flow</h3>
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>👤 <b>Resource Owner:</b> The user who grants authorization.</li>
                <li>💻 <b>Client:</b> This demo application requesting access.</li>
                <li>🔐 <b>Authorization Server:</b> Manages user authentication (e.g., Google, GitHub).</li>
                <li>📦 <b>Resource Server:</b> Hosts the protected data (e.g., user profile).</li>
              </ul>
              </Card>
            </FadeInOnScroll>

            <FadeInOnScroll>
              <Card className="p-6 rounded-xl border border-l-4 border-l-indigo-400 bg-indigo-50">
              <div className="flex items-center gap-2 mb-3">
                <Layers className="w-5 h-5 text-indigo-500" />
                <h3 className="text-lg font-semibold text-foreground">Phases of the Authentication Flow</h3>
              </div>
              <ol className="list-decimal list-inside text-sm text-muted-foreground space-y-1">
                <li>The client redirects the user to the chosen provider.</li>
                <li>The user logs in and grants authorization.</li>
                <li>The provider returns an <code>authorization code</code>.</li>
                <li>The app exchanges the code for an <code>access token</code> and creates the local session.</li>
              </ol>
              </Card>
            </FadeInOnScroll>
          </div>

          {/* Educational Notes / Tips */}
          <div className="mt-8">
            <FadeInOnScroll>
              <Card className="p-6 rounded-xl border border-l-4 border-l-teal-400 bg-teal-50">
              <div className="flex items-center gap-2 mb-3">
                <Eye className="w-5 h-5 text-teal-600" />
                <h3 className="text-lg font-semibold text-foreground">What to Observe During the Flow</h3>
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>🔄 Watch for redirects and URL changes.</li>
                <li>🔑 Identify where the <code>authorization code</code> is returned.</li>
                <li>🛡️ Notice when the local session is created.</li>
                <li>➡️ After login, the Dashboard shows the real message timeline of the OAuth flow.</li>
              </ul>
              </Card>
            </FadeInOnScroll>
          </div>

          {/* SSO benefits and configuration */}
          <div className="grid md:grid-cols-2 gap-8 mt-8">
            <FadeInOnScroll>
              <Card className="p-6 rounded-xl border bg-emerald-50 border-emerald-200">
              <h3 className="font-semibold mb-3 text-foreground">Advantages of Single Sign-On (SSO)</h3>
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
            </FadeInOnScroll>

            <FadeInOnScroll>
              <Card className="p-6 rounded-xl border bg-gray-50 border-gray-200">
              <h3 className="font-semibold mb-3 text-foreground">Configured Providers</h3>
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
                Set the environment variables <code>GITHUB_ID</code>, <code>GITHUB_SECRET</code>,{" "}
                <code>GOOGLE_CLIENT_ID</code> and <code>GOOGLE_CLIENT_SECRET</code> to enable the respective providers.
              </p>
              </Card>
            </FadeInOnScroll>
          </div>

          {/* Footer note */}
          <footer className="text-center mt-12 text-xs text-muted-foreground border-t pt-6">
            Educational demo — built with <span className="font-semibold">NextAuth & OAuth 2.0</span>
            {" "}·{" "}
            <a
              href="https://github.com/HellNF/auth-site-SDElab"
              target="_blank"
              rel="noreferrer noopener"
              className="underline text-blue-600 hover:text-blue-700"
            >
              View source
            </a>
          </footer>
        </div>
      </div>
    </main>
  )
}
