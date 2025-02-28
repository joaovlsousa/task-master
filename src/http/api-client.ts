import { getCookie as getCookieFromClient } from 'cookies-next/client'
import { getCookie as getCookieFromServer } from 'cookies-next/server'
import ky from 'ky'

import { env } from '@/env'

export const api = ky.create({
  prefixUrl: env.NEXT_PUBLIC_API_URL,
  hooks: {
    beforeRequest: [
      async request => {
        let accessToken: string | undefined

        if (typeof window === 'undefined') {
          const { cookies } = await import('next/headers')

          accessToken = await getCookieFromServer('access_token', { cookies })
        } else {
          accessToken = getCookieFromClient('access_token')
        }

        if (accessToken) {
          request.headers.set('Authorization', `Bearer ${accessToken}`)
        }
      },
    ],
  },
})
