import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

export class LoginUserDto {
  @IsEmail()
  email: string

  @IsNotEmpty()
  @IsString()
  password: string
}

export class ResponseLoginUserDto {
  role: string
  access_token: string
}
