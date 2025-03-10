import dayjs from 'dayjs'
import { jwtDecode } from 'jwt-decode'
import { type NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get('access_token')?.value

  const urlToLoginPage = request.nextUrl.clone()
  urlToLoginPage.pathname = '/login'

  if (!accessToken) {
    return NextResponse.redirect(urlToLoginPage)
  }

  const { exp } = jwtDecode(accessToken)

  if (!exp) {
    return NextResponse.redirect(urlToLoginPage)
  }

  const accessTokenExpirationDate = dayjs.unix(exp)

  const isAccessTokenExpired = dayjs().isAfter(accessTokenExpirationDate)

  if (isAccessTokenExpired) {
    request.cookies.delete('access_token')

    return NextResponse.redirect(urlToLoginPage)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|login).*)',
  ],
}
