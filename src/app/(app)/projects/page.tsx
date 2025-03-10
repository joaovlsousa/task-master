import { ArrowUpRight } from 'lucide-react'

import { getProjectsAction } from '@/actions/get-projects-action'
import { ProjectSettings } from '@/app/(app)/projects/_components/project-settings'
import GithubLogo from '@/assets/github-logo.svg'
import { Button } from '@/components/ui/button'

import Image from 'next/image'
import {
  Project,
  ProjectContent,
  ProjectDescription,
  ProjectFooter,
  ProjectImage,
  ProjectName,
} from './_components/project'

export default async function Projects() {
  const { data, error } = await getProjectsAction()

  if (error) {
    return (
      <main className="flex justify-center">
        <p className="text-sm font-medium text-muted-foreground">
          {error.message}
        </p>
      </main>
    )
  }

  const { projects } = data

  if (!projects.length) {
    return (
      <main className="flex justify-center">
        <p className="text-sm font-medium text-muted-foreground">
          Nenhum projeto encontrado
        </p>
      </main>
    )
  }

  return (
    <main className="flex justify-center">
      <div className="grid grid-cols-3 gap-10">
        {projects.map(project => (
          <Project key={project.id}>
            <ProjectImage imageUrl={project.imageUrl} />
            <ProjectContent>
              <ProjectName>{project.name}</ProjectName>
              <ProjectDescription>{project.description}</ProjectDescription>
            </ProjectContent>
            <ProjectFooter>
              <div className="flex items-center gap-x-4">
                <Button asChild variant="secondary" size="icon">
                  <a href={project.githubUrl} target="_blank" rel="noreferrer">
                    <Image
                      src={GithubLogo}
                      alt="github logo"
                      className="size-5 invert"
                    />
                  </a>
                </Button>

                {project.deployUrl && (
                  <Button asChild variant="secondary" size="icon">
                    <a
                      href={project.deployUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <ArrowUpRight className="size-5" />
                    </a>
                  </Button>
                )}
              </div>
              <ProjectSettings projectValues={project} />
            </ProjectFooter>
          </Project>
        ))}
      </div>
    </main>
  )
}
