import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class RegisterUserDto {
  @IsEmail()
  email: string

  @IsNotEmpty()
  @IsString()
  password: string

  @IsOptional()
  @IsString()
  name: string
}

export class ResponseRegisterUserDto {
  email: string
  role: string
  access_token: string
}
