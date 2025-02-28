'use client'

import { ImageUp } from 'lucide-react'
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

import { UplaodProjectImageForm } from './upload-project-image-form'

interface UploadProjectImageSheetProps {
  projectId: string
}

export function UploadProjectImageSheet({
  projectId,
}: UploadProjectImageSheetProps) {
  const [isOpen, setIsOpen] = useState(false)

  function onSuccess() {
    setIsOpen(false)
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm" className="w-full justify-start">
          <ImageUp className="size-3 mr-2" />
          Atualizar imagem
        </Button>
      </SheetTrigger>
      <SheetContent className="min-h-screen flex flex-col">
        <SheetHeader>
          <SheetTitle>Atualizar imagem</SheetTitle>
          <SheetDescription>
            Selecione uma imagem para o seu projeto
          </SheetDescription>
        </SheetHeader>
        <UplaodProjectImageForm projectId={projectId} onSuccess={onSuccess} />
      </SheetContent>
    </Sheet>
  )
}
