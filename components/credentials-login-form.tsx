"use client"

import { Alert, AlertDescription } from "@/components/ui/alert"

export function CredentialsLoginForm() {
  return (
    <Alert variant="destructive">
      <AlertDescription>
        L&apos;autenticazione con credenziali locali richiede un identity provider o un database utenti esterno. Configura una pipeline reale prima di riabilitare questa sezione.
      </AlertDescription>
    </Alert>
  )
}
