import NextAuth from "next-auth"
import type { NextRequest } from "next/server"
import { authOptions, logOAuthMessage, runWithTraceClient } from "@/lib/auth-server"
import { TRACE_COOKIE_NAME } from "@/lib/trace-cookie"

const handler = NextAuth(authOptions)

type RouteContext = {
	params: {
		nextauth?: string[]
	}
}

function providerLabel(provider?: string) {
	if (!provider) return "provider"
	return provider.charAt(0).toUpperCase() + provider.slice(1)
}

async function authHandler(request: NextRequest, context: RouteContext) {
	const clientId = request.cookies.get(TRACE_COOKIE_NAME)?.value
	return runWithTraceClient(clientId, async () => {
		const segments = context.params?.nextauth ?? []
		const action = segments[0] ?? ""
		const providerFromPath = segments[1]
		const providerFromQuery = request.nextUrl.searchParams.get("provider") ?? undefined
		const provider = providerFromPath ?? providerFromQuery ?? undefined
		const providerLabelText = providerLabel(provider)

		if (action === "signin" && provider) {
			logOAuthMessage({
				direction: "client→server",
				method: "SIGNIN",
				endpoint: "/api/auth/signin",
				stageType: "user-action",
				provider,
				hint: `User triggered sign-in with ${providerLabelText} from the client.`,
			})
		}

		if (action === "session" && request.method === "GET") {
			logOAuthMessage({
				direction: "client→server",
				method: "GET",
				endpoint: "/api/auth/session",
				stageType: "session-lifecycle",
				hint: "Client is fetching the current session (e.g. useSession()).",
			})
		}

		if (action === "callback" && provider) {
			logOAuthMessage({
				direction: "provider→server",
				method: "REDIRECT",
				endpoint: `/api/auth/callback/${provider}`,
				stageType: "oauth-auth-code",
				provider,
				hint: `${providerLabelText} redirected back with an authorization code.`,
			})
		}

		const response = await handler(request, context)

		if (action === "signin" && provider) {
			const location = response.headers.get("location") ?? response.headers.get("Location") ?? ""
			if (location) {
				if (location.startsWith("http")) {
					try {
						const authorizeUrl = new URL(location)
						const queryParams = Object.fromEntries(authorizeUrl.searchParams.entries())
						logOAuthMessage({
							direction: "server→provider",
							method: "GET",
							endpoint: authorizeUrl.origin + authorizeUrl.pathname,
							stageType: "oauth-auth-code",
							provider,
							headers: {
								scheme: authorizeUrl.protocol.replace(":", ""),
								host: authorizeUrl.host,
								path: authorizeUrl.pathname,
							},
							payload: queryParams,
							hint: `Server prepared ${providerLabelText} authorization redirect (query params shown as payload).`,
						})
					} catch (error) {
						console.warn("Failed to parse authorization redirect for trace", error)
					}
				}

				logOAuthMessage({
					direction: "server→client",
					method: "REDIRECT",
					endpoint: "/api/auth/signin",
					stageType: "oauth-auth-code",
					provider,
					response: { location },
					hint: `NextAuth is redirecting the browser to the ${providerLabelText} authorization URL.`,
				})
				if (location.startsWith("http")) {
					logOAuthMessage({
						direction: "client→provider",
						method: "GET",
						endpoint: location,
						stageType: "oauth-auth-code",
						provider,
						hint: `Browser opening ${providerLabelText} OAuth authorization page.`,
					})
				}
			}
		}

		if (action === "session" && request.method === "GET") {
			let sessionPayload: unknown = null
			try {
				const clone = response.clone()
				sessionPayload = await clone.json()
			} catch {
				sessionPayload = null
			}
			logOAuthMessage({
				direction: "server→client",
				method: "SESSION RESPONSE",
				endpoint: "/api/auth/session",
				stageType: "session-lifecycle",
				response: { session: sessionPayload },
				hint: "NextAuth returned the current session to the client.",
			})
		}

		return response
	})
}

export async function GET(request: NextRequest, context: RouteContext) {
	return authHandler(request, context)
}

export async function POST(request: NextRequest, context: RouteContext) {
	return authHandler(request, context)
}