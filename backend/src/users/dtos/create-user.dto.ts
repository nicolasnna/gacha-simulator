import {
  IsBoolean,
  IsEmail,
  IsOptional,
  IsString,
  MinLength
} from 'class-validator'

export class CreateUserDto {
  @IsEmail()
  email!: string

  @IsString()
  @MinLength(6)
  password!: string

  @IsOptional()
  @IsString()
  name?: string

  @IsOptional()
  @IsString()
  role?: string

  @IsOptional()
  @IsBoolean()
  superAdmin?: boolean
}
