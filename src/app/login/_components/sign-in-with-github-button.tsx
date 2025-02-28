import { GithubIcon } from 'lucide-react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { env } from '@/env'

export function SignInWithGithubButton() {
  const githubSignInURL = new URL('login/oauth/authorize', 'https://github.com')

  githubSignInURL.searchParams.set('client_id', env.GITHUB_OAUTH_CLIENT_ID)
  githubSignInURL.searchParams.set(
    'redirect_uri',
    env.GITHUB_OAUTH_CLIENT_REDIRECT_URI
  )
  githubSignInURL.searchParams.set('scope', 'user:email')

  return (
    <Button className="w-full" asChild>
      <Link href={githubSignInURL.toString()}>
        <GithubIcon className="size-4 mr-2" />
        Continue com o github
      </Link>
    </Button>
  )
}
