import {
  BannerEnum,
  RarityCharacterEnum,
  ValueCharacterEnum
} from '@common/enums'
import { IsEnum, IsNumber, IsPositive } from 'class-validator'

export class CreateCharacterDto {
  @IsNumber()
  @IsPositive()
  mal_id: number

  @IsEnum(BannerEnum)
  banner: BannerEnum

  @IsEnum(ValueCharacterEnum)
  value: ValueCharacterEnum

  @IsEnum(RarityCharacterEnum)
  rarity: RarityCharacterEnum
}
