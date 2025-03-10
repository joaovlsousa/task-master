import { Cog } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import type { ProjectType } from '@/http/get-projects'

import { DeleteProjectAlert } from './delete-project-alert'
import { UpdateProjectSheet } from './update-project-sheet'
import { UploadProjectImageSheet } from './upload-project-image-sheet'

interface ProjectSettingsProps {
  projectValues: {
    id: string
    type: ProjectType
    name: string
    description: string
    pinned: boolean
    githubUrl: string
    deployUrl: string | null
  }
}

export function ProjectSettings({ projectValues }: ProjectSettingsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" size="icon" className="group">
          <Cog className="size-5 group-hover:-rotate-45 duration-400" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="max-w-40 space-y-1.5">
        <UpdateProjectSheet projectValues={projectValues} />
        <UploadProjectImageSheet projectId={projectValues.id} />
        <DeleteProjectAlert projectId={projectValues.id} />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
