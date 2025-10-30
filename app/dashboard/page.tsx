"use client"
import { useMemo } from "react"
import { useAuth } from "@/lib/auth-context"
import { ProtectedRoute } from "@/components/protected-route"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { CheckCircle2, Shield, Key, Clock } from "lucide-react"
import { OAuthSummary } from "@/components/oauth-summary"
import { OAuthTraceViewer } from "@/components/OAuthTraceViewer"
import { FadeInOnScroll, AnimatedCard } from "@/components/react-bits-shim"

export default function DashboardPage() {
  const { user } = useAuth()

  const userInitials = useMemo(() => {
    if (!user?.name) {
      return "U"
    }

    return (
      user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase() || "U"
    )
  }, [user?.name])

  const providerLabel = user?.provider ? user.provider.charAt(0).toUpperCase() + user.provider.slice(1) : "SSO"
  const userIdPreview = user?.id ? `${user.id.substring(0, 12)}...` : "N/A"

  return (
    <ProtectedRoute>
      {user ? (
        <main className="min-h-screen bg-background py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <AnimatedCard>
              <Card className="p-6 mb-8 bg-accent/10 border-accent/20">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 text-accent flex-shrink-0" />
                  <div>
                    <h2 className="font-semibold text-foreground">Authentication Successful!</h2>
                    <p className="text-sm text-muted-foreground">
                      You&apos;ve signed in successfully. This is a protected area accessible only to authenticated users.
                    </p>
                  </div>
                </div>
              </Card>
              </AnimatedCard>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <AnimatedCard>
                <Card className="p-6 md:col-span-2">
                  <h3 className="text-xl font-semibold mb-4 text-foreground">User Information</h3>
                  <div className="flex items-start gap-4">
                    <Avatar className="w-16 h-16">
                      <AvatarImage src={user.image ?? "/placeholder.svg"} alt={user.name ?? "User"} />
                      <AvatarFallback className="bg-primary text-primary-foreground text-lg">
                        {userInitials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h4 className="font-semibold text-lg text-foreground">{user.name ?? "User"}</h4>
                      <p className="text-muted-foreground text-sm mb-3">{user.email ?? "Email not available"}</p>
                      <Badge variant="secondary" className="gap-1 capitalize">
                        <Shield className="w-3 h-3" />
                        {providerLabel}
                      </Badge>
                    </div>
                  </div>

                  <Separator className="my-6" />

                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-sm">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Session active since:</span>
                      <span className="font-medium text-foreground">{new Date().toLocaleDateString("en-US")}</span>
                    </div>
                  </div>
                </Card>
                </AnimatedCard>

                <AnimatedCard>
                <Card className="p-6 bg-primary/5 border-primary/20">
                  <div className="flex items-center gap-2 mb-4">
                    <Key className="w-5 h-5 text-primary" />
                    <h3 className="font-semibold text-foreground">Session Token</h3>
                  </div>
                  <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
                    Your session is managed by NextAuth and protected via secure cookies.
                  </p>
                  <div className="p-3 bg-background rounded border border-border">
                    <code className="text-xs font-mono text-muted-foreground break-all">
                      user_id: {userIdPreview}
                    </code>
                  </div>
                </Card>
                </AnimatedCard>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <AnimatedCard>
                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-4 text-foreground">How Protection Works</h3>
                  <div className="space-y-4 text-sm">
                    <div>
                      <h4 className="font-medium mb-2 text-foreground">1. NextAuth Session</h4>
                      <p className="text-muted-foreground leading-relaxed">
                        Authentication is delegated to real OAuth providers (GitHub/Google) via NextAuth.
                      </p>
                    </div>
                    <Separator />
                    <div>
                      <h4 className="font-medium mb-2 text-foreground">2. Protected Routes</h4>
                      <p className="text-muted-foreground leading-relaxed">
                        The ProtectedRoute component checks the session before rendering sensitive content.
                      </p>
                    </div>
                    <Separator />
                    <div>
                      <h4 className="font-medium mb-2 text-foreground">3. Secure Logout</h4>
                      <p className="text-muted-foreground leading-relaxed">
                        Signing out invalidates the browser session and returns you to the login page.
                      </p>
                    </div>
                  </div>
                </Card>
                </AnimatedCard>

                <AnimatedCard>
                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-4 text-foreground">Demo Status</h3>
                  <div className="space-y-4 text-sm">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-medium mb-1 text-foreground">OAuth Providers</h4>
                        <p className="text-muted-foreground leading-relaxed">
                          Configure GitHub/Google credentials to use real providers.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-medium mb-1 text-foreground">Flow Monitor</h4>
                        <p className="text-muted-foreground leading-relaxed">
                          The viewer shows OAuth flow steps in real time during redirects.
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
                </AnimatedCard>
              </div>

              {/* OAuth flow summary */}
              <FadeInOnScroll>
                <div className="mt-8">
                  <OAuthSummary />
                </div>
              </FadeInOnScroll>

              {/* Real OAuth Message Flow */}
              <FadeInOnScroll>
                <div className="mt-8">
                  <OAuthTraceViewer />
                </div>
              </FadeInOnScroll>
            </div>
          </div>
        </main>
      ) : null}
    </ProtectedRoute>
  )
}
