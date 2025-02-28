import { cookies } from 'next/headers'
import { type NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const cookiesStore = await cookies()

  cookiesStore.delete('access_token')

  const redirectUrl = request.nextUrl.clone()

  redirectUrl.pathname = '/login'

  return NextResponse.redirect(redirectUrl)
}
