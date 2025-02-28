'use server'

import { HTTPError } from 'ky'
import { revalidateTag } from 'next/cache'

import {
  type UploadProjectImageRequest,
  uploadProjectImage,
} from '@/http/upload-project-image'

interface UploadProjectImageActionResponse {
  error: {
    message: string
  } | null
}

export async function uploadProjectImageAction(
  payload: UploadProjectImageRequest
): Promise<UploadProjectImageActionResponse> {
  try {
    await uploadProjectImage(payload)

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
