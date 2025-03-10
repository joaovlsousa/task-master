import { api } from './api-client'

export type ProjectType = 'BACKEND' | 'FRONTEND'

export interface GetProjectsResponse {
  projects: {
    type: ProjectType
    id: string
    name: string
    description: string
    pinned: boolean
    imageUrl: string | null
    githubUrl: string
    deployUrl: string | null
    createdAt: string
    updatedAt: string
  }[]
}

export async function getProjects() {
  const result = await api
    .get('projects', {
      next: {
        tags: ['projects'],
      },
    })
    .json<GetProjectsResponse>()

  return result
}
