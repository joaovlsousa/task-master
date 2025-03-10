import Image from 'next/image'
import Link from 'next/link'

import GithubLogo from '@/assets/github-logo.svg'
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
        <Image src={GithubLogo} alt="github logo" className="size-4 mr-2" />
        Continue com o github
      </Link>
    </Button>
  )
}
