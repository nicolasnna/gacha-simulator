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

type UserResponse = Omit<User, 'passwordHash'> & { id: string }
@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private jwtService: JwtService,
    private userService: UsersService
  ) {}

  async register(userData: RegisterUserDto): Promise<AuthUserResponse> {
    const user = await this.userService.create({
      name: userData.name,
      email: userData.email,
      password: userData.password,
      role: RoleEnum.User
    })

    return {
      email: user.data.email,
      role: user.data.role,
      ...(await this.sign(user.data.id, user.data.email, user.data.role, false))
    }
  }

  async loginUser(userData: LoginUserDto): Promise<AuthUserResponse> {
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

    const userRes: UserResponse = {
      id: user._id.toString(),
      email: user.email,
      role: user.role,
      superAdmin: user.superAdmin,
      active: user.active
    }

    const userObject = user.toObject<UserResponse>()

    return {
      email: userObject.email,
      role: userObject.role,
      ...(await this.sign(
        userRes.id,
        userRes.email,
        userRes.role,
        userRes.superAdmin
      ))
    }
  }

  private async sign(
    sub: string,
    email: string,
    role: string,
    superAdmin: boolean
  ) {
    const roles = [role]
    const payload = { sub, email, roles, superAdmin }
    const access_token = await this.jwtService.signAsync(payload)
    return { access_token }
  }
}
