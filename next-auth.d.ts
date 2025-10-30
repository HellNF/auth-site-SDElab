import "next-auth"
import "next-auth/jwt"

declare module "next-auth" {
  interface Session {
    user?: {
      id?: string
      name?: string | null
      email?: string | null
      image?: string | null
      provider?: string
    }
    oauthTrace?: Array<{
      direction:
        | "client→provider"
        | "provider→client"
        | "server→provider"
        | "provider→server"
        | "client→server"
        | "server→client"
      endpoint: string
      method: string
      payload?: Record<string, any>
      response?: Record<string, any>
      timestamp: number
    }>
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    provider?: string
    oauthTrace?: Array<{
      direction:
        | "client→provider"
        | "provider→client"
        | "server→provider"
        | "provider→server"
        | "client→server"
        | "server→client"
      endpoint: string
      method: string
      payload?: Record<string, any>
      response?: Record<string, any>
      timestamp: number
    }>
  }
}