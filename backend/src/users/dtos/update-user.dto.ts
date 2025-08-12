import { PartialType, OmitType } from '@nestjs/mapped-types'
import { IsOptional, IsString, MinLength } from 'class-validator'
import { CreateUserDto } from './create-user.dto'

export class UpdateUserDto extends PartialType(
  OmitType(CreateUserDto, ['password', 'email', 'role', 'superAdmin'] as const)
) {
  @IsOptional()
  @IsString()
  @MinLength(6)
  password?: string
}
