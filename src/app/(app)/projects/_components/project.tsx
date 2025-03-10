import Image from 'next/image'
import type { PropsWithChildren } from 'react'

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

function Project({ children }: PropsWithChildren) {
  return <div className="w-96 space-y-2">{children}</div>
}

function ProjectName({ children }: PropsWithChildren) {
  return <strong className="text-lg font-semibold">{children}</strong>
}

function ProjectDescription({ children }: PropsWithChildren) {
  return (
    <p className="text-sm font-medium text-muted-foreground text-justify">
      {children}
    </p>
  )
}

function ProjectContent({ children }: PropsWithChildren) {
  return <div className="space-y-1">{children}</div>
}

function ProjectFooter({ children }: PropsWithChildren) {
  return <div className="flex items-center justify-between">{children}</div>
}

interface ProjectImageProps {
  imageUrl?: string | null
}

function ProjectImage({ imageUrl }: ProjectImageProps) {
  if (!imageUrl) {
    return (
      <div className="w-96 h-56 flex items-center justify-center rounded-md bg-muted">
        <span className="text-sm font-medium text-muted-foreground">
          Not found.
        </span>
      </div>
    )
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Image
          src={imageUrl}
          alt="Imagem do projeto"
          width={1280}
          height={720}
          quality={100}
          className="aspect-video rounded-md cursor-zoom-in"
        />
      </DialogTrigger>
      <DialogContent className="p-0 max-w-5xl">
        <DialogTitle className="hidden" />
        <Image
          src={imageUrl}
          alt="Imagem do projeto"
          width={1280}
          height={720}
          quality={100}
          className="aspect-video rounded-md"
        />
      </DialogContent>
    </Dialog>
  )
}

export {
  Project,
  ProjectContent,
  ProjectDescription,
  ProjectFooter,
  ProjectImage,
  ProjectName,
}
