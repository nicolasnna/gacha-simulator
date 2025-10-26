import { RarityCharacterEnum, ValueCharacterEnum } from '@common/enums'
import {
  IsArray,
  IsEnum,
  IsNumber,
  IsPositive,
  IsString
} from 'class-validator'

export class CreateCharacterDto {
  @IsNumber()
  @IsPositive()
  mal_id: number

  @IsArray()
  @IsString({ each: true })
  banners: string[]

  @IsEnum(ValueCharacterEnum)
  value: ValueCharacterEnum

  @IsEnum(RarityCharacterEnum)
  rarity: RarityCharacterEnum
}
