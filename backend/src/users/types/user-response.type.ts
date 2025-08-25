import { User } from '@common/schemas'

export type UserWithOmit = Omit<User, 'passwordHash'> & {
  id: string
  createdAt: Date
  updatedAt: Date
}

export interface UserResponse {
  data: UserWithOmit
}
