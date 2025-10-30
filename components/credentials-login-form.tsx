"use client"

import { Alert, AlertDescription } from "@/components/ui/alert"

export function CredentialsLoginForm() {
  return (
    <Alert variant="destructive">
      <AlertDescription>
        Local credentials authentication requires an external identity provider or user database. Configure a real
        pipeline before re-enabling this section.
      </AlertDescription>
    </Alert>
  )
}
