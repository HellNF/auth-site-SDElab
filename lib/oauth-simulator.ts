export type OAuthStep = {
  id: number
  title: string
  description: string
  status: "pending" | "active" | "completed"
  technical: string
}

export const OAUTH_STEPS: OAuthStep[] = [
  {
    id: 1,
    title: "Authorization Request",
    description: "L'applicazione richiede l'autorizzazione all'utente",
    status: "pending",
    technical: "GET /authorize?client_id=xxx&redirect_uri=xxx&scope=email,profile",
  },
  {
    id: 2,
    title: "User Consent",
    description: "L'utente acconsente e si autentica con il provider",
    status: "pending",
    technical: "User authenticates with OAuth provider (GitHub/Google)",
  },
  {
    id: 3,
    title: "Authorization Code",
    description: "Il provider restituisce un codice di autorizzazione",
    status: "pending",
    technical: "Redirect: callback?code=AUTH_CODE_HERE",
  },
  {
    id: 4,
    title: "Token Exchange",
    description: "L'app scambia il codice per un access token",
    status: "pending",
    technical: "POST /token with code, client_id, client_secret",
  },
  {
    id: 5,
    title: "Access Granted",
    description: "L'utente è autenticato e può accedere alle risorse",
    status: "pending",
    technical: "Bearer token stored, user session created",
  },
]

export function simulateOAuthFlow(onStepChange: (steps: OAuthStep[]) => void, onComplete: () => void) {
  let currentStep = 0
  const steps = [...OAUTH_STEPS]

  const interval = setInterval(() => {
    if (currentStep > 0) {
      steps[currentStep - 1].status = "completed"
    }

    if (currentStep < steps.length) {
      steps[currentStep].status = "active"
      onStepChange([...steps])
      currentStep++
    } else {
      clearInterval(interval)
      onComplete()
    }
  }, 1500)

  return () => clearInterval(interval)
}
