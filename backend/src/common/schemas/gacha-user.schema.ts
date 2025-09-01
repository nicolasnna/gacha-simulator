import { AnimeEnum, RarityCharacterEnum } from '@common/enums'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument, Types } from 'mongoose'

export type GachaUserDocument = HydratedDocument<GachaUser>

@Schema({
  timestamps: true
})
export class GachaUser {
  @Prop({ required: true, index: 1, type: String, ref: 'user' })
  userId: string

  @Prop({ required: true, enum: AnimeEnum, type: String, index: 1 })
  animeOrigin: AnimeEnum

  @Prop({ type: Number, default: 0 })
  credits: number

  @Prop({
    type: [
      {
        characterId: { type: Types.ObjectId, ref: 'Character', require: true },
        name: { type: String },
        rarity: {
          type: String,
          enum: Object.values(RarityCharacterEnum)
        },
        imgUrl: { type: String },
        repeatCount: { type: Number, default: 0 }
      }
    ],
    default: []
  })
  characters!: {
    characterId: Types.ObjectId
    name: string
    rarity: RarityCharacterEnum
    imgUrl: string
    repeatCount: number
  }
}

export const GachaUserSchema = SchemaFactory.createForClass(GachaUser)
