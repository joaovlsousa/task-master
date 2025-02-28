import { api } from './api-client'

export interface UploadProjectImageRequest {
  image: File
  projectId: string
}

export async function uploadProjectImage({
  image,
  projectId,
}: UploadProjectImageRequest) {
  const formDataToUpload = new FormData()
  formDataToUpload.append('file', image)

  await api.patch(`projects/${projectId}/image`, {
    body: formDataToUpload,
  })
}
