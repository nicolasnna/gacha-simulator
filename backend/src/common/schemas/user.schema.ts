import { RoleEnum } from '@common/enums'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

export type UserDocument = HydratedDocument<User>

@Schema({
  timestamps: true,
  toObject: {
    versionKey: false
  },
  toJSON: {
    versionKey: false
  }
})
export class User {
  @Prop({ unique: true, required: true, index: true })
  email: string

  @Prop({ required: true, select: false })
  passwordHash: string

  @Prop({ required: true })
  role!: RoleEnum

  @Prop({ default: false })
  superAdmin: boolean

  @Prop({ default: true })
  active: boolean

  @Prop()
  name?: string
}

export const UserSchema = SchemaFactory.createForClass(User)
