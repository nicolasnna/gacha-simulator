import { BannerEnum } from '@common/enums'
import { Rates } from '@common/types'
import {
  IsEnum,
  IsNumber,
  IsObject,
  IsOptional,
  IsString
} from 'class-validator'

export class CreateBannerDto {
  @IsString()
  anime: string

  @IsEnum(BannerEnum)
  type: BannerEnum

  @IsObject()
  rates: Rates

  @IsOptional()
  @IsNumber()
  costSinglePull: number

  @IsOptional()
  @IsNumber()
  costMultiPull: number
}
