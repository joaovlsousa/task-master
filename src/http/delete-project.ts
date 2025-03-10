import { api } from './api-client'

export interface DeleteProjectRequest {
  projectId: string
}

export async function deleteProject({ projectId }: DeleteProjectRequest) {
  await api.delete(`projects/${projectId}`)
}
