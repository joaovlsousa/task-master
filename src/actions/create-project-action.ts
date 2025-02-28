'use server'

import { HTTPError } from 'ky'
import { revalidateTag } from 'next/cache'

import {
  type CreateProjectRequest,
  type CreateProjectResponse,
  createProject,
} from '@/http/create-project'

type CreateProjectActionResponse =
  | {
      data: CreateProjectResponse
      error: null
    }
  | {
      data: null
      error: {
        message: string
      }
    }

export async function createProjectAction(
  payload: CreateProjectRequest
): Promise<CreateProjectActionResponse> {
  try {
    const data = await createProject(payload)

    revalidateTag('projects')

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
