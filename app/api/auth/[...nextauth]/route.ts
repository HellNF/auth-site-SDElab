import NextAuth from "next-auth"
import type { NextRequest } from "next/server"
import { authOptions, logOAuthMessage } from "@/lib/auth-server"

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

type AuthorizationRequestDetails = {
	source: "redirect" | "form"
	endpoint: string
	method: string
	payload?: Record<string, string>
	headers?: Record<string, string>
}

function buildAuthorizationDetailsFromLocation(location: string): AuthorizationRequestDetails | null {
	try {
		const authorizeUrl = new URL(location)
		return {
			source: "redirect",
			endpoint: location,
			method: "GET",
			payload: Object.fromEntries(authorizeUrl.searchParams.entries()),
			headers: {
				scheme: authorizeUrl.protocol.replace(":", ""),
				host: authorizeUrl.host,
				path: authorizeUrl.pathname,
			},
		}
	} catch {
		return null
	}
}

async function buildAuthorizationDetailsFromForm(response: Response): Promise<AuthorizationRequestDetails | null> {
	try {
		const clone = response.clone()
		const html = await clone.text()
		const formMatch = html.match(/<form[^>]*action=["']([^"']+)["'][^>]*>/i)
		if (!formMatch) return null
		const action = formMatch[1]
		const methodMatch = formMatch[0].match(/method=["']?([^"'>\s]+)/i)
		const method = methodMatch?.[1]?.toUpperCase() ?? "POST"
		const inputs: Record<string, string> = {}
		const inputRegex = /<input[^>]*name=["']([^"']+)["'][^>]*value=["']([^"']*)["'][^>]*>/gi
		let match: RegExpExecArray | null
		while ((match = inputRegex.exec(html))) {
			inputs[match[1]] = match[2]
		}
		return {
			source: "form",
			endpoint: action,
			method,
			payload: inputs,
			headers:
				method === "POST"
					? {
						"content-type": "application/x-www-form-urlencoded",
					}
					: undefined,
		}
	} catch {
		return null
	}
}

async function authHandler(request: NextRequest, context: RouteContext) {
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
		let authDetails: AuthorizationRequestDetails | null = null
		if (location && location.startsWith("http")) {
			authDetails = buildAuthorizationDetailsFromLocation(location)
		} else {
			authDetails = await buildAuthorizationDetailsFromForm(response)
		}

		if (authDetails) {
			logOAuthMessage({
				direction: "server→provider",
				method: authDetails.method,
				endpoint: authDetails.endpoint,
				stageType: "oauth-auth-code",
				provider,
				headers: authDetails.headers,
				payload: authDetails.payload,
				hint:
					authDetails.source === "form"
						? `Server generated ${providerLabelText} authorization form (auto-submit payload shown).`
						: `Server prepared ${providerLabelText} authorization redirect (query params shown as payload).`,
			})
		}

		if (location && location.startsWith("http")) {
			logOAuthMessage({
				direction: "server→client",
				method: "REDIRECT",
				endpoint: "/api/auth/signin",
				stageType: "oauth-auth-code",
				provider,
				response: { location },
				hint: `NextAuth is redirecting the browser to the ${providerLabelText} authorization URL.`,
			})
			logOAuthMessage({
				direction: "client→provider",
				method: "GET",
				endpoint: location,
				stageType: "oauth-auth-code",
				provider,
				payload: authDetails?.payload,
				hint: `Browser opening ${providerLabelText} OAuth authorization page.`,
			})
		} else if (authDetails?.source === "form") {
			logOAuthMessage({
				direction: "server→client",
				method: "OAUTH FORM",
				endpoint: "/api/auth/signin",
				stageType: "oauth-auth-code",
				provider,
				response: {
					action: authDetails.endpoint,
					method: authDetails.method,
					fields: Object.keys(authDetails.payload ?? {}),
				},
				hint: `NextAuth returned an auto-submitting form pointing to ${providerLabelText}.`,
			})
			logOAuthMessage({
				direction: "client→provider",
				method: authDetails.method,
				endpoint: authDetails.endpoint,
				stageType: "oauth-auth-code",
				provider,
				payload: authDetails.payload,
				hint: `Browser auto-submits a ${authDetails.method} form to ${providerLabelText} authorization endpoint.`,
			})
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
}

export async function GET(request: NextRequest, context: RouteContext) {
	return authHandler(request, context)
}

export async function POST(request: NextRequest, context: RouteContext) {
	return authHandler(request, context)
}