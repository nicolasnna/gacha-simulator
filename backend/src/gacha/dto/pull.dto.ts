import { PullsEnum } from '@common/enums/pulls.enum'
import { IsEnum, IsString } from 'class-validator'

export class PullDto {
  @IsString()
  anime: string

  @IsEnum(PullsEnum)
  pulls!: PullsEnum
}

export type UserPullDto = PullDto & { userId: string }
