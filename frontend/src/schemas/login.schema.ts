import z from 'zod'

export const EmailSchema = z
  .email()
  .trim()
  .max(40)
  .min(6, { message: 'Debe tener un mínimo de 6 caracteres' })
  .transform((email) => email.toLowerCase())

export const PasswordSchema = z
  .string()
  .max(16)
  .min(6, { message: 'Debe tener un mínimo de 6 caracteres' })

export const LoginSchema = z.object({
  email: EmailSchema,
  password: PasswordSchema
})

export type LoginType = z.infer<typeof LoginSchema>
