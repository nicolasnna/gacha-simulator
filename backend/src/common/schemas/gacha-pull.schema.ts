import { RarityCharacterEnum } from '@common/enums'
import { PullsEnum } from '@common/enums/pulls.enum'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument, Types } from 'mongoose'

export type GachaPullDocument = HydratedDocument<GachaPull>

@Schema({
  timestamps: true
})
export class GachaPull {
  @Prop({ required: true, index: 1, type: String, ref: 'User' })
  userId: string

  @Prop({ required: true, type: Types.ObjectId, ref: 'Banner' })
  bannerId: Types.ObjectId

  @Prop({ enum: PullsEnum, type: Number })
  pullsCount: PullsEnum

  @Prop({
    type: [
      {
        characterId: { type: Types.ObjectId, ref: 'Character', require: true },
        name: { type: String },
        rarity: {
          type: String,
          enum: Object.values(RarityCharacterEnum),
          required: true
        },
        imgUrl: { type: String, required: true },
        isDuplicate: { type: Boolean, default: false }
      }
    ],
    required: true
  })
  items!: {
    characterId: Types.ObjectId
    name: string
    rarity: RarityCharacterEnum
    imgUrl: string
    isDuplicate: boolean
  }[]
}

export const GachaPullSchema = SchemaFactory.createForClass(GachaPull)
