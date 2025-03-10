import { z } from 'zod'

export const createProjectSchema = z.object({
  name: z.string({ required_error: 'Campo obrigatório' }),
  description: z.string({ required_error: 'Campo obrigatório' }),
  type: z.enum(['BACKEND', 'FRONTEND'], {
    required_error: 'Campo obrigatório',
  }),
  githubUrl: z
    .string({ required_error: 'Campo obrigatório' })
    .url('URL inválida'),
  deployUrl: z.union([z.string().url().nullish(), z.literal('')]),
  pinned: z.boolean({ required_error: 'Campo obrigatório' }).default(false),
})

export type CreateProjectSchema = z.infer<typeof createProjectSchema>

const MAX_UPLOAD_SIZE = 1024 * 1024 * 5 // 5MB
const ACCEPTED_FILE_TYPES = ['image/png']

export const uploadProjectImageSchema = z
  .instanceof(File)
  .refine(file => {
    return !file || file.size <= MAX_UPLOAD_SIZE
  }, 'A imagem não pode ser maior que 5MB')
  .refine(file => {
    return ACCEPTED_FILE_TYPES.includes(file.type)
  }, 'A imagem precisa seguir o formato PNG')

export type UploadProjectImageSchema = z.infer<typeof uploadProjectImageSchema>

export const updateProjectSchema = createProjectSchema
export type UpdateProjectSchema = CreateProjectSchema
