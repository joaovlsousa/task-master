'use client'

import { Trash } from 'lucide-react'
import { toast } from 'sonner'

import { deleteProjectAction } from '@/actions/delete-project-action'
import { AlertDialog } from '@/components/alert-dialog'
import { Button } from '@/components/ui/button'

interface DeleteProjectAlertProps {
  projectId: string
}

export function DeleteProjectAlert({ projectId }: DeleteProjectAlertProps) {
  async function handleDeleteProject() {
    const { error } = await deleteProjectAction({ projectId })

    if (error) {
      toast.error(error.message)

      return
    }

    toast.success('Projeto deletado com sucesso!')
  }

  return (
    <AlertDialog
      title="Deletar projeto?"
      description="Você não poderá reverter esta ação depois."
      onConfirm={handleDeleteProject}
    >
      <Button
        variant="ghost"
        size="sm"
        className="w-full justify-start text-red-500 hover:text-red-600"
      >
        <Trash className="size-3 mr-2" />
        Deletar
      </Button>
    </AlertDialog>
  )
}
