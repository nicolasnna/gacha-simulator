import { AnimeEnum } from '@common/enums'
import { PullsEnum } from '@common/enums/pulls.enum'
import { IsEnum } from 'class-validator'

export class GetPullDto {
  @IsEnum(AnimeEnum)
  anime: AnimeEnum

  @IsEnum(PullsEnum)
  pulls!: PullsEnum
}
