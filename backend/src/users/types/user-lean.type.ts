import { User } from '@common/schemas'
import { Types } from 'mongoose'

export type UserLean = Omit<User, 'passwordHash'> & {
  _id: Types.ObjectId
  createdAt: Date
  updatedAt: Date
}
