import type { Role } from './role.interface'

export interface LoginUserApi {
  email: string
  password: string
}
export interface RegisterUserApi extends LoginUserApi {
  name?: string
}

export interface ResponseAuthApi {
  email: string
  role: Role
  access_token: string
}
