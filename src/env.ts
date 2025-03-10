import { z } from 'zod'

const envSchema = z.object({
  NEXT_PUBLIC_API_URL: z.string(),
  GITHUB_OAUTH_CLIENT_ID: z.string(),
  GITHUB_OAUTH_CLIENT_REDIRECT_URI: z.string().url(),
})

export const env = envSchema.parse(process.env)
