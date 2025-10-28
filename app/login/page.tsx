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
