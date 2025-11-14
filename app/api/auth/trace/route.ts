import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import { getOAuthTrace, clearTrace } from "@/lib/auth-server"
import { TRACE_COOKIE_NAME } from "@/lib/trace-cookie"

function currentClientId() {
  return cookies().get(TRACE_COOKIE_NAME)?.value
}

export async function GET() {
  const clientId = currentClientId()
  const data = clientId ? getOAuthTrace(clientId) : []
  return NextResponse.json(data)
}

export async function DELETE() {
  const clientId = currentClientId()
  if (clientId) clearTrace(clientId)
  return NextResponse.json({ cleared: Boolean(clientId) })
}
