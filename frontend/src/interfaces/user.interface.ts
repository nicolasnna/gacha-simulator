import type { Role } from './role.interface'

export interface User {
  id: string | number
  email: string
  role: Role
  superAdmin: boolean
  active?: boolean
  createdAt?: Date
  updatedAt?: Date
  name?: string
}

export interface ResponseGetAllUsersApi {
  data: User[]
  totalItems: number
  lastItemNumber: number
  page: number
  limit: number
}

export interface ResponseUpdateUser {
  data: User
}
