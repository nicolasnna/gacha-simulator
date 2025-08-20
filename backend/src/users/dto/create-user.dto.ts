import { RoleEnum } from '@common/enums'
import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString
} from 'class-validator'

export class CreateUserDto {
  @IsOptional()
  @IsString()
  name?: string

  @IsNotEmpty()
  @IsEmail()
  email: string

  @IsNotEmpty()
  @IsString()
  password: string

  @IsEnum(RoleEnum)
  role: RoleEnum

  @IsOptional()
  @IsBoolean()
  superAdmin?: boolean
}
