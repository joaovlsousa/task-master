'use server'

import { HTTPError } from 'ky'
import { revalidateTag } from 'next/cache'

import { type DeleteProjectRequest, deleteProject } from '@/http/delete-project'

interface DeleteProjectActionResponse {
  error: {
    message: string
  } | null
}

export async function deleteProjectAction(
  payload: DeleteProjectRequest
): Promise<DeleteProjectActionResponse> {
  try {
    await deleteProject(payload)

    revalidateTag('projects')

    return {
      error: null,
    }
  } catch (error) {
    if (error instanceof HTTPError) {
      const { message } = await error.response.json<{ message: string }>()

      return {
        error: {
          message,
        },
      }
    }

    return {
      error: {
        message: 'Ops, algo deu errado! Tente novamente mais tarde.',
      },
    }
  }
}
