import z from 'zod'

export const UsernameSchema = z
  .string()
  .trim()
  .max(16)
  .min(6, { message: 'Debe tener un mínimo de 6 caracteres' })

export const PasswordSchema = z
  .string()
  .max(16)
  .min(6, { message: 'Debe tener un mínimo de 6 caracteres' })

export const LoginSchema = z.object({
  username: UsernameSchema,
  password: PasswordSchema
})

export type LoginType = z.infer<typeof LoginSchema>
