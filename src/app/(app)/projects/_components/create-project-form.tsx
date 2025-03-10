'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { createProjectAction } from '@/actions/create-project-action'
import { Loader } from '@/components/loader'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'

import { type CreateProjectSchema, createProjectSchema } from '../schemas'

interface CreateProjectFormProps {
  onSuccess: () => void
}

export function CreateProjectForm({ onSuccess }: CreateProjectFormProps) {
  const form = useForm<CreateProjectSchema>({
    resolver: zodResolver(createProjectSchema),
    mode: 'all',
  })

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = form

  async function onSubmit(payload: CreateProjectSchema) {
    const { error } = await createProjectAction(payload)

    if (error) {
      toast.error(error.message)

      return
    }

    onSuccess()
    toast.success('Projeto criado com sucesso!')
  }

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 w-[95%] mx-auto"
      >
        <FormField
          control={control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="name">Nome do projeto</FormLabel>
              <Input
                {...field}
                id="name"
                disabled={isSubmitting}
                value={field.value ?? ''}
              />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="description">Descrição do projeto</FormLabel>
              <FormControl>
                <Textarea id="description" className="resize-none" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tipo do projeto</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecione o tipo do projeto" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="BACKEND">Back end</SelectItem>
                  <SelectItem value="FRONTEND">Front end</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="githubUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="githubUrl">Link do repositório</FormLabel>
              <Input
                {...field}
                id="githubUrl"
                disabled={isSubmitting}
                value={field.value ?? ''}
              />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="deployUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="deployUrl">Link da aplicação</FormLabel>
              <Input
                {...field}
                id="deployUrl"
                disabled={isSubmitting}
                value={field.value ?? ''}
              />
              <FormDescription>Campo opcional</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="pinned"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center space-x-3 space-y-0 py-4">
              <FormControl>
                <Checkbox
                  id="pinned"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel
                htmlFor="pinned"
                className="text-sm font-medium text-muted-foreground"
              >
                Fixar na página inicial
              </FormLabel>
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? (
            <>
              <Loader className="mr-2" />
              <span>Salvando projeto...</span>
            </>
          ) : (
            'Salvar projeto'
          )}
        </Button>
      </form>
    </Form>
  )
}
