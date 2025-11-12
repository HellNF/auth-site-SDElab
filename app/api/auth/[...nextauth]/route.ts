import NextAuth from "next-auth"
import { authOptions } from "@/lib/auth-server"

// Questo è l’UNICO posto dove esponi l’handler NextAuth.
// Evita di invocare handler altrove per non avere l’errore “req.query.nextauth”.
const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }