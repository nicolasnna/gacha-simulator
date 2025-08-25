import type { Grants } from './grants.interface'

export type RoleType = 'superAdmin' | 'user' | 'developer' | 'moderator'

export interface Role {
  id: string
  key: RoleType
  grants: Grants[]
  label: string
  updatedAt: Date
  createdAt: Date
}

export interface ResponseGetAllRoleApi {
  data: Role[]
  totalItems: number
  lastItemNumber: number
  page: number
  limit: number
}
