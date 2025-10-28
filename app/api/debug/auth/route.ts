import { NextResponse } from "next/server"
import { configuredProviderIds, providersConfigured } from "@/lib/auth"
import { authReady, lastAuthInitError } from "@/lib/auth-server"

export async function GET() {
  const present = {
    GITHUB_ID: !!process.env.GITHUB_ID,
    GITHUB_SECRET: !!process.env.GITHUB_SECRET,
    GOOGLE_CLIENT_ID: !!process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: !!process.env.GOOGLE_CLIENT_SECRET,
  }
  return NextResponse.json(
    {
      schemaVersion: 2,
      providersConfigured,
      configuredProviderIds,
      authReady,
      lastAuthInitError,
      present,
      fields: ["schemaVersion", "providersConfigured", "configuredProviderIds", "authReady", "present"],
      timestamp: new Date().toISOString(),
    },
    { headers: { "Cache-Control": "no-store" } },
  )
}
