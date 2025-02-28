import { cookies } from 'next/headers'
import { type NextRequest, NextResponse } from 'next/server'

import { signInWithGithub } from '@/http/sign-in-with-github'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams

  const code = searchParams.get('code')

  if (!code) {
    return NextResponse.json(
      { message: 'Github OAuth  code was not found.' },
      { status: 400 }
    )
  }

  const cookiesStore = await cookies()

  const { accessToken } = await signInWithGithub({ code })

  cookiesStore.set('access_token', accessToken, {
    path: '/',
    maxAge: 60 * 30, // 30 min
  })

  const redirectUrl = request.nextUrl.clone()

  redirectUrl.pathname = '/projects'
  redirectUrl.search = ''

  return NextResponse.redirect(redirectUrl)
}
