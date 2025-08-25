import { IsEmail } from 'class-validator'

export class FindEmailUserDto {
  @IsEmail()
  email: string
}
