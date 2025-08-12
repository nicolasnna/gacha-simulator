import { Body, Controller, Get, Post } from '@nestjs/common'
import { AuthService } from './auth.service'
import { RegisterUserDto } from './dto/register-user.dto'
import { LoginUserDto } from './dto/login-user.dto'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  registerUser(@Body() registerUserDto: RegisterUserDto) {
    this.authService.register(registerUserDto)
  }

  @Get('login')
  loginUser(@Body() loginUserDto: LoginUserDto) {
    this.authService.loginUser(loginUserDto)
  }
}
