import { AnimeEnum } from '@common/enums'
import { PullsEnum } from '@common/enums/pulls.enum'
import { IsEnum } from 'class-validator'

export class PullDto {
  @IsEnum(AnimeEnum)
  anime: AnimeEnum

  @IsEnum(PullsEnum)
  pulls!: PullsEnum
}

export type UserPullDto = PullDto & { userId: string }
