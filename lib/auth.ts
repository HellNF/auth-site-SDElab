// Client-safe module: expose only env-derived info to UI without importing next-auth

export const configuredProviderIds = [
  process.env.GITHUB_ID && process.env.GITHUB_SECRET ? "github" : null,
  process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET ? "google" : null,
].filter(Boolean) as string[]

export const providersConfigured = configuredProviderIds.length > 0