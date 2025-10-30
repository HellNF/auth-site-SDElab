/**
 * GitHub Copilot prompt – Educational redesign of /login
 * Goal: Build a didactic login page (no simulations, no popups) that explains OAuth and uses real SSO buttons.
 * Structure: header intro, small static diagram, SSO buttons, info boxes (roles/phases/what happens next), footer hint to Dashboard.
 * Use Tailwind + shadcn/ui components; max width ~600px; neutral palette.
 */
import { LoginPageContent } from "@/components/login-page-content"
import { configuredProviderIds, providersConfigured } from "@/lib/auth"

export default function LoginPage() {
  return (
    <LoginPageContent
      providersConfigured={providersConfigured}
      configuredProviders={configuredProviderIds}
    />
  )
}
