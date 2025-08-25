import { AnimeEnum } from '@common/enums'
import { IsEnum, IsString } from 'class-validator'

export class CharacterObtainedDto {
  @IsEnum(AnimeEnum)
  anime: AnimeEnum

  @IsString()
  charId: string
}
