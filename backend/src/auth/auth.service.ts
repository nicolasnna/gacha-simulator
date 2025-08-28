import { UsersService } from '@/users/users.service'
import { RoleEnum } from '@common/enums'
import {
  Injectable,
  NotFoundException,
  UnauthorizedException
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectModel } from '@nestjs/mongoose'
import * as bcrypt from 'bcrypt'
import { Model } from 'mongoose'
import { User, UserDocument } from 'src/common/schemas/user.schema'
import { LoginUserDto } from './dto/login-user.dto'
import { RegisterUserDto } from './dto/register-user.dto'
import { AuthUserResponse } from './types/auth-response.type'
import { Response } from 'express'
import { ConfigService } from '@nestjs/config'
import { RedisService } from '@/redis/redis.service'

type UserResponse = Omit<User, 'passwordHash'> & { id: string }
@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private jwtService: JwtService,
    private userService: UsersService,
    private configService: ConfigService,
    private redisService: RedisService
  ) {}

  async register(
    userData: RegisterUserDto,
    res: Response
  ): Promise<AuthUserResponse> {
    const user = await this.userService.create({
      name: userData.name,
      email: userData.email,
      password: userData.password,
      role: RoleEnum.User
    })

    return await this.sendTokens(user.data, res)
  }

  async loginUser(
    userData: LoginUserDto,
    res: Response
  ): Promise<AuthUserResponse> {
    console.log('Entrando login')
    const user = await this.userModel
      .findOne({ email: userData.email })
      .select('+passwordHash')
      .exec()

    if (!user) throw new NotFoundException()

    const validatePassword = await bcrypt.compare(
      userData.password,
      user.passwordHash
    )

    if (!validatePassword) throw new UnauthorizedException()

    return await this.sendTokens(user, res)
  }

  private async generateTokens(
    sub: string,
    email: string,
    role: string,
    superAdmin: boolean
  ) {
    const payload = { sub, email, role, superAdmin }

    const access_token = await this.jwtService.signAsync(payload)

    const refresh_token = await this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      expiresIn: '1d'
    })

    return { access_token, refresh_token }
  }

  private async sendTokens(user: UserDocument, res: Response) {
    const idObj = String(user._id) || String(user.id)

    const userRes: UserResponse = {
      id: idObj,
      email: user.email,
      role: user.role,
      superAdmin: user.superAdmin,
      active: user.active
    }

    const tokens = await this.generateTokens(
      userRes.id,
      userRes.email,
      userRes.role,
      userRes.superAdmin
    )

    res.cookie('refresh_token', tokens.refresh_token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000 // 1 day
    })

    await this.redisService.setRefreshToken(userRes.id, tokens.refresh_token)

    return {
      email: userRes.email,
      role: userRes.role,
      access_token: tokens.access_token
    }
  }
}
