'use client'

import { CodeXml } from 'lucide-react'
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

import { CreateProjectForm } from './create-project-form'

export function CreateProjectSheet() {
  const [isOpen, setIsOpen] = useState(false)

  function onSuccess() {
    setIsOpen(false)
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start text-sm"
        >
          <CodeXml className="size-4 mr-2" />
          Projeto
        </Button>
      </SheetTrigger>
      <SheetContent className="min-h-screen flex flex-col">
        <SheetHeader>
          <SheetTitle>Novo projeto</SheetTitle>
          <SheetDescription>
            Salve o seu novo projeto na coleção
          </SheetDescription>
        </SheetHeader>
        <div className="flex-1 pb-4 overflow-y-auto">
          <CreateProjectForm onSuccess={onSuccess} />
        </div>
      </SheetContent>
    </Sheet>
  )
}
