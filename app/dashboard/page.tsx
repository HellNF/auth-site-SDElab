"use client"
import { useMemo } from "react"
import { useAuth } from "@/lib/auth-context"
import { ProtectedRoute } from "@/components/protected-route"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import {
  CheckCircle2,
  Shield,
  Key,
  Clock,
  User,
  Lock,
  Power,
  Info,
} from "lucide-react"
import { OAuthSummary } from "@/components/oauth-summary"
import OAuthTraceViewer from "@/components/OAuthTraceViewer"
import { FadeInOnScroll, AnimatedCard } from "@/components/react-bits-shim"

export default function DashboardPage() {
  const { user } = useAuth()

  const userInitials = useMemo(() => {
    if (!user?.name) return "U"
    return (
      user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase() || "U"
    )
  }, [user?.name])

  const providerLabel = user?.provider
    ? user.provider.charAt(0).toUpperCase() + user.provider.slice(1)
    : "SSO"
  const userIdPreview = user?.id ? `${user.id.substring(0, 12)}...` : "N/A"

  return (
    <ProtectedRoute>
      {user ? (
        <main className="min-h-screen bg-gradient-to-b from-white via-blue-50/30 to-indigo-50/10">
          <div className="max-w-6xl mx-auto px-6 py-20 space-y-16">
            {/* ✅ Banner */}
            <FadeInOnScroll>
              <div className="rounded-xl bg-emerald-50/80 border border-emerald-200 px-5 py-4 flex items-center justify-between shadow-sm backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <div className="size-9 rounded-full bg-emerald-100 flex items-center justify-center">
                    <CheckCircle2 className="text-emerald-600 w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-emerald-800 font-semibold text-sm">
                      Authentication Successful
                    </p>
                    <p className="text-xs text-emerald-700">
                      Signed in on {new Date().toLocaleString("en-US", { hour12: false })}
                    </p>
                  </div>
                </div>
                <Badge variant="outline" className="text-emerald-700 border-emerald-300 bg-white/70">
                  Session Overview
                </Badge>
              </div>
            </FadeInOnScroll>

            {/* ✅ User & Token */}
            <FadeInOnScroll>
              <section>
                <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-4">
                  Session Overview
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* User Info */}
                  <AnimatedCard>
                    <Card className="p-6 rounded-xl bg-white/80 backdrop-blur border border-blue-100 shadow-sm hover:shadow-md transition-all duration-300">
                      <div className="flex items-center gap-2 mb-4">
                        <User className="w-5 h-5 text-blue-600" />
                        <h3 className="text-lg font-semibold text-foreground">
                          User Information
                        </h3>
                      </div>
                      <div className="flex items-start gap-4">
                        <Avatar className="w-16 h-16">
                          <AvatarImage
                            src={user.image ?? "/placeholder.svg"}
                            alt={user.name ?? "User"}
                          />
                          <AvatarFallback className="bg-blue-100 text-blue-700 font-semibold">
                            {userInitials}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <h4 className="font-semibold text-lg text-foreground">
                            {user.name ?? "User"}
                          </h4>
                          <p className="text-sm text-muted-foreground mb-2">
                            {user.email ?? "Email not available"}
                          </p>
                          <Badge
                            variant="secondary"
                            className="gap-1 capitalize bg-blue-100 text-blue-700"
                          >
                            <Shield className="w-3 h-3" />
                            {providerLabel}
                          </Badge>
                        </div>
                      </div>
                      <Separator className="my-5" />
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        <span>
                          Session active since{" "}
                          <span className="font-medium text-foreground">
                            {new Date().toLocaleDateString("en-US")}
                          </span>
                        </span>
                      </div>
                    </Card>
                  </AnimatedCard>

                  {/* Token */}
                  <AnimatedCard>
                    <Card className="p-6 rounded-xl bg-white/80 backdrop-blur border border-indigo-100 shadow-sm hover:shadow-md transition-all duration-300">
                      <div className="flex items-center gap-2 mb-4">
                        <Key className="w-5 h-5 text-indigo-600" />
                        <h3 className="text-lg font-semibold text-foreground">
                          Session Token
                        </h3>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        Your session is managed by NextAuth and protected via
                        secure cookies.
                      </p>
                      <div className="p-3 bg-gray-50 rounded border border-gray-200">
                        <code className="text-xs font-mono text-gray-700 break-all">
                          user_id: {userIdPreview}
                        </code>
                      </div>
                    </Card>
                  </AnimatedCard>
                </div>
              </section>
            </FadeInOnScroll>

            {/* ✅ How it Works */}
            <FadeInOnScroll>
              <section>
                <h2 className="text-lg font-semibold text-gray-800 mb-6">
                  How Protection Works
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    {
                      id: 1,
                      color: "from-blue-500 to-indigo-500",
                      title: "NextAuth Session",
                      desc: "Authentication is delegated to real OAuth providers (GitHub/Google) via NextAuth.",
                      icon: <Lock className="w-5 h-5 text-blue-600" />,
                    },
                    {
                      id: 2,
                      color: "from-violet-500 to-purple-500",
                      title: "Protected Routes",
                      desc: "The ProtectedRoute component checks the session before rendering sensitive content.",
                      icon: <Shield className="w-5 h-5 text-violet-600" />,
                    },
                    {
                      id: 3,
                      color: "from-emerald-500 to-teal-500",
                      title: "Secure Logout",
                      desc: "Signing out invalidates the browser session and returns you to the login page.",
                      icon: <Power className="w-5 h-5 text-emerald-600" />,
                    },
                  ].map((item) => (
                    <AnimatedCard key={item.id}>
                      <div className="p-6 bg-white/70 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-r text-white flex items-center justify-center font-semibold text-sm"
                            style={{ backgroundImage: `linear-gradient(to right, var(--${item.color}))` }}>
                            {item.id}
                          </div>
                          {item.icon}
                          <h4 className="font-medium text-gray-800">
                            {item.title}
                          </h4>
                        </div>
                        <p className="text-sm text-gray-600 leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </AnimatedCard>
                  ))}
                </div>
              </section>
            </FadeInOnScroll>

            {/* ✅ Demo Status */}
            <FadeInOnScroll>
              <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <AnimatedCard>
                  <Card className="p-6 bg-emerald-50/80 border border-emerald-100 rounded-xl shadow-sm">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-6 h-6 text-emerald-600 mt-1" />
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-1">
                          OAuth Providers
                        </h4>
                        <p className="text-sm text-emerald-700/90">
                          Configured to work with GitHub/Google credentials.
                        </p>
                      </div>
                    </div>
                  </Card>
                </AnimatedCard>

                <AnimatedCard>
                  <Card className="p-6 bg-blue-50/80 border border-blue-100 rounded-xl shadow-sm">
                    <div className="flex items-start gap-3">
                      <Info className="w-6 h-6 text-blue-600 mt-1" />
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-1">
                          Flow Monitor
                        </h4>
                        <p className="text-sm text-blue-700/90">
                          Viewer shows OAuth steps in real time during redirects.
                        </p>
                      </div>
                    </div>
                  </Card>
                </AnimatedCard>
              </section>
            </FadeInOnScroll>

            {/* ✅ OAuth Summary + Trace */}
            <FadeInOnScroll>
              <section className="space-y-8">
                <div className="rounded-xl border shadow-sm overflow-hidden">
                  <div className="h-1 bg-gradient-to-r from-blue-500 to-indigo-500" />
                  <div className="p-1">
                    <OAuthSummary />
                  </div>
                </div>

                <div className="rounded-xl border shadow-sm overflow-hidden">
                  <OAuthTraceViewer />
                </div>
              </section>
            </FadeInOnScroll>

            {/* ✅ Footer */}
            <FadeInOnScroll>
              <footer className="pt-8 text-center text-sm text-gray-500">
                Educational demo built with{" "}
                <a
                  className="text-blue-600 font-medium hover:underline"
                  href="https://next-auth.js.org"
                  target="_blank"
                  rel="noreferrer"
                >
                  NextAuth
                </a>{" "}
                &{" "}
                <a
                  className="text-blue-600 font-medium hover:underline"
                  href="https://oauth.net/2/"
                  target="_blank"
                  rel="noreferrer"
                >
                  OAuth 2.0
                </a>
              </footer>
            </FadeInOnScroll>
          </div>
        </main>
      ) : null}
    </ProtectedRoute>
  )
}
