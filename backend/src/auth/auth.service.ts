import { RedisService } from '@/redis/redis.service'
import { RoleEnum } from '@common/enums'
import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { InjectModel } from '@nestjs/mongoose'
import * as bcrypt from 'bcrypt'
import { Response } from 'express'
import { Model } from 'mongoose'
import { User, UserDocument } from 'src/common/schemas/user.schema'
import { LoginUserDto } from './dto/login-user.dto'
import { RegisterUserDto } from './dto/register-user.dto'
import { AuthUserResponse } from './types/auth-response.type'

type UserResponse = Omit<User, 'passwordHash'> & { id: string }
@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly redisService: RedisService
  ) {}

  async register(
    userData: RegisterUserDto,
    res: Response
  ): Promise<AuthUserResponse> {
    const exists = await this.userModel.exists({ email: userData.email })
    if (exists) throw new ConflictException('Email ya registrado')

    const passwordHash = await bcrypt.hash(userData.password, 12)
    const userDoc = await this.userModel.create({
      email: userData.email,
      passwordHash,
      role: RoleEnum.User,
      name: userData.name
    })

    return await this.sendTokens(userDoc, res)
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
      userId: userRes.id,
      email: userRes.email,
      role: userRes.role,
      access_token: tokens.access_token
    }
  }
}
