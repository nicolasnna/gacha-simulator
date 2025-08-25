import z from 'zod'
import { LoginSchema, PasswordSchema } from './login.schema'

const NameSchema = z.string().min(4).max(20)

export const RegisterSchema = LoginSchema.extend({
  name: NameSchema,
  confirmPassword: PasswordSchema
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Las contraseñas no son iguales',
  path: ['confirmPassword']
})

export type RegisterType = z.infer<typeof RegisterSchema>
