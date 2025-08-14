import { User } from '@common/schemas'

export type UserResponse = Omit<User, 'passwordHash'> & {
  id: string
  createdAt: Date
  updatedAt: Date
}
