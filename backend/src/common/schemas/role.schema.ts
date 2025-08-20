import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'
import { ACTIONS, ActionType, ModuleKeyEnum, RoleEnum } from '../enums'

export type RoleDocument = HydratedDocument<Role>

@Schema({ timestamps: true })
export class Role {
  @Prop({
    required: true,
    unique: true,
    enum: Object.values(RoleEnum),
    type: String
  })
  key: RoleEnum

  @Prop()
  label: string

  @Prop({
    type: [
      {
        module: {
          type: String,
          enum: Object.values(ModuleKeyEnum),
          required: true
        },
        actions: [{ type: String, enum: ACTIONS, default: [] }]
      }
    ],
    default: []
  })
  grants: { module: ModuleKeyEnum; actions: ActionType[] }[]
}
export const RoleSchema = SchemaFactory.createForClass(Role)
