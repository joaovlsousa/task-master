import type { UpdateProjectSchema } from '@/app/(app)/projects/schemas'

import { api } from './api-client'

export interface UpdateProjectRequest extends UpdateProjectSchema {
  projectId: string
}

export async function updateProject({
  projectId,
  ...payload
}: UpdateProjectRequest) {
  await api.put(`projects/${projectId}`, {
    json: {
      ...payload,
    },
  })
}
