import type { CreateProjectSchema } from '@/app/(app)/projects/schemas'

import { api } from './api-client'

export type CreateProjectRequest = CreateProjectSchema

export interface CreateProjectResponse {
  projectId: string
}

export async function createProject(payload: CreateProjectRequest) {
  const result = await api
    .post('projects', {
      json: {
        ...payload,
      },
    })
    .json<CreateProjectResponse>()

  return result
}
