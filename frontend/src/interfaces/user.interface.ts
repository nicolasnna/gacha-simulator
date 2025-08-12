import type { PermissionType } from '@/schemas/permission.schema'
import type { Role } from './role.interface'

export interface User {
  id: string | number
  username: string
  uniqueCharacters: number
  credits: number
  role: Role
  permissions: PermissionType
}
