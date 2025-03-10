'use server'

import { HTTPError } from 'ky'
import { revalidateTag } from 'next/cache'

import { type UpdateProjectRequest, updateProject } from '@/http/update-project'

interface UpdateProjectActionResponse {
  error: {
    message: string
  } | null
}

export async function updateProjectAction(
  payload: UpdateProjectRequest
): Promise<UpdateProjectActionResponse> {
  try {
    payload.deployUrl = payload.deployUrl || null

    await updateProject(payload)

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
