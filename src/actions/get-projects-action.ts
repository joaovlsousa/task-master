'use server'

import { HTTPError } from 'ky'

import { type GetProjectsResponse, getProjects } from '@/http/get-projects'

type GetProjectsActionResponse =
  | {
      data: GetProjectsResponse
      error: null
    }
  | {
      data: null
      error: {
        message: string
      }
    }

export async function getProjectsAction(): Promise<GetProjectsActionResponse> {
  try {
    const data = await getProjects()

    return {
      data,
      error: null,
    }
  } catch (error) {
    if (error instanceof HTTPError) {
      const { message } = await error.response.json<{ message: string }>()

      return {
        data: null,
        error: {
          message,
        },
      }
    }

    return {
      data: null,
      error: {
        message: 'Ops, algo deu errado! Tente novamente mais tarde.',
      },
    }
  }
}
