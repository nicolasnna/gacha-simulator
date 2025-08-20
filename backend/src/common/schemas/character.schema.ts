import {
  AnimeEnum,
  BannerEnum,
  RarityCharacterEnum,
  ValueCharacterEnum
} from '@common/enums'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

export type CharacterDocument = HydratedDocument<Character>

@Schema({
  timestamps: true
})
export class Character {
  @Prop({ unique: true, required: true })
  mal_id: number

  @Prop({ required: true })
  name: string

  @Prop([String])
  nicknames?: string[]

  @Prop({ required: true })
  imgUrl: string

  @Prop({
    required: true,
    enum: RarityCharacterEnum,
    type: String,
    index: 1
  })
  rarity: RarityCharacterEnum

  @Prop({
    required: true,
    enum: ValueCharacterEnum,
    type: Number
  })
  value: ValueCharacterEnum

  @Prop({
    default: BannerEnum.Standard,
    enum: Object.values(BannerEnum),
    type: String,
    index: 1
  })
  banner: BannerEnum

  @Prop({ required: true, enum: AnimeEnum, type: String, index: 1 })
  animeOrigin: AnimeEnum

  @Prop({ default: true, index: 1 })
  isActive: boolean
}

export const CharacterSchema = SchemaFactory.createForClass(Character)
