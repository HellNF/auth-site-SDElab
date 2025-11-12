import { NextResponse } from "next/server"
import { getOAuthTrace, clearTrace } from "@/lib/auth-server"

export async function GET() {
  return NextResponse.json(getOAuthTrace())
}

export async function DELETE() {
  clearTrace()
  return NextResponse.json({ cleared: true })
}
