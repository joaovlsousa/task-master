'use client'

import { Plus } from 'lucide-react'
import Image from 'next/image'
import {
  type ChangeEvent,
  type FormEvent,
  useEffect,
  useState,
  useTransition,
} from 'react'
import { toast } from 'sonner'

import { uploadProjectImageAction } from '@/actions/upload-project-image-action'
import { Loader } from '@/components/loader'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'

import { uploadProjectImageSchema } from '../schemas'

interface UplaodProjectImageFormProps {
  projectId: string
  onSuccess: () => void
}

export function UplaodProjectImageForm({
  projectId,
  onSuccess,
}: UplaodProjectImageFormProps) {
  const [isSubmitting, startTransition] = useTransition()

  const [file, setFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [validationError, setValidationError] = useState<string | null>(null)

  useEffect(() => {
    setPreviewUrl(file ? URL.createObjectURL(file) : null)
  }, [file])

  function handleFile(e: ChangeEvent<HTMLInputElement>) {
    setFile(e.target.files ? e.target.files[0] : null)
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const {
      success,
      data: image,
      error,
    } = uploadProjectImageSchema.safeParse(file)

    if (!success) {
      setValidationError(error.message)

      return
    }

    startTransition(async () => {
      const { error } = await uploadProjectImageAction({
        projectId,
        image,
      })

      if (error) {
        toast.error(error.message)

        return
      }

      onSuccess()
      toast.success('Imagem salva com sucesso!')
    })
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4 w-[95%] mx-auto">
      <Label
        htmlFor="file"
        className="w-full relative flex flex-col items-center justify-center aspect-video bg-transparent border rounded-md cursor-pointer overflow-hidden"
      >
        {!file && (
          <div className="w-full h-full flex flex-col items-center justify-center gap-y-2">
            <Plus className="size-5 text-muted-foreground" />
            <span className="text-sm text-muted-foreground font-medium">
              Toque para selecionar uma imagem
            </span>
          </div>
        )}

        {previewUrl && (
          <Image
            src={previewUrl}
            alt="Preview da imagem"
            fill
            quality={100}
            placeholder="blur"
            blurDataURL={previewUrl}
          />
        )}
      </Label>
      <input
        id="file"
        name="file"
        type="file"
        accept="image/png"
        onChange={handleFile}
        disabled={isSubmitting}
        className="invisible"
      />

      {validationError && (
        <span className="text-sm font-medium text-red-500">
          {validationError}
        </span>
      )}

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? (
          <>
            <Loader className="mr-2" />
            <span>Salvando imagem...</span>
          </>
        ) : (
          'Salvar imagem'
        )}
      </Button>
    </form>
  )
}
