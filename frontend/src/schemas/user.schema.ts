import z from 'zod'
import { EmailSchema, PasswordSchema } from './login.schema'

export const UserSchema = z.object({
  email: EmailSchema,
  password: PasswordSchema,
  role: z
    .string()
    .trim()
    .min(4, { message: 'Debe tener u mínimo de 4 caracteres' })
    .max(20),
  name: z.string().trim().min(6).max(35)
})

export const UserPartialSchema = z.object({
  email: EmailSchema.optional(),
  password: PasswordSchema.or(z.literal('')).optional(),
  role: z
    .string()
    .trim()
    .min(4, { message: 'Debe tener u mínimo de 4 caracteres' })
    .max(20)
    .optional(),
  name: z.string().trim().max(35).optional()
})

export type UserType = z.infer<typeof UserSchema>
export type UserPartialType = z.infer<typeof UserPartialSchema>
