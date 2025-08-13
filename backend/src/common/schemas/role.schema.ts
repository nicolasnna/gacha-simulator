import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'
import { Action, ACTIONS, ModuleKey, RoleKey } from '../enums'

export type RoleDocument = HydratedDocument<Role>

@Schema({ timestamps: true })
export class Role {
  @Prop({
    required: true,
    unique: true,
    enum: Object.values(RoleKey),
    type: String
  })
  key: RoleKey

  @Prop()
  label: string

  @Prop({
    type: [
      {
        module: {
          type: String,
          enum: Object.values(ModuleKey),
          required: true
        },
        actions: [{ type: String, enum: ACTIONS, default: [] }]
      }
    ],
    default: []
  })
  grants: { module: ModuleKey; actions: Action[] }[]
}
export const RoleSchema = SchemaFactory.createForClass(Role)
