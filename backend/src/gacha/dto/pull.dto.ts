import { PullsEnum } from '@common/enums/pulls.enum'
import { IsEnum, IsString } from 'class-validator'

export class PullDto {
  @IsString()
  bannerId: string

  @IsEnum(PullsEnum)
  pulls!: PullsEnum
}

export type UserPullDto = PullDto & { userId: string }
