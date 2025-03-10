'use client'

import { Pen } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import type { ProjectType } from '@/http/get-projects'

import { UpdateProjectForm } from './update-project-form'

interface UpdateProjectSheetProps {
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

export function UpdateProjectSheet({ projectValues }: UpdateProjectSheetProps) {
  const [isOpen, setIsOpen] = useState(false)

  function onSuccess() {
    setIsOpen(false)
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm" className="w-full justify-start">
          <Pen className="size-3 mr-2" />
          Atualizar projeto
        </Button>
      </SheetTrigger>
      <SheetContent className="min-h-screen flex flex-col">
        <SheetHeader>
          <SheetTitle>Atualizar projeto</SheetTitle>
          <SheetDescription>Atualize o seu projeto da coleção</SheetDescription>
        </SheetHeader>
        <div className="flex-1 pb-4 overflow-y-auto">
          <UpdateProjectForm
            projectValues={projectValues}
            onSuccess={onSuccess}
          />
        </div>
      </SheetContent>
    </Sheet>
  )
}
