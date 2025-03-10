import { api } from './api-client'

interface SignInWithGithubRequest {
  code: string
}

interface SignInWithGithubResponse {
  accessToken: string
}

export async function signInWithGithub({ code }: SignInWithGithubRequest) {
  const result = await api
    .post('auth/github', {
      json: {
        code,
      },
    })
    .json<SignInWithGithubResponse>()

  return result
}
