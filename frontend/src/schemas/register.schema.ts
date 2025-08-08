import type z from 'zod'
import { LoginSchema, PasswordSchema } from './login.schema'

export const RegisterSchema = LoginSchema.extend({
  confirmPassword: PasswordSchema
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Las contraseñas no son iguales',
  path: ['confirmPassword']
})


export type RegisterType = z.infer<typeof RegisterSchema>