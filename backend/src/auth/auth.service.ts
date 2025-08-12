import {
  ConflictException,
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

type UserResponse = Omit<User, 'passwordHash'> & { id: string }
@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private jwtService: JwtService
  ) {}

  async register(dto: RegisterUserDto) {
    const exists = await this.userModel.exists({ email: dto.email })
    if (exists) throw new ConflictException('Email ya registrado')

    const passwordHash = await bcrypt.hash(dto.password, 12)
    const doc = await this.userModel.create({
      email: dto.email,
      passwordHash,
      role: 'user',
      name: dto.name
    })

    const user = doc.toObject<UserResponse>()
    return {
      user,
      ...(await this.sign(user.id, user.email, user.role, false))
    }
  }

  async loginUser(userData: LoginUserDto) {
    const user = await this.userModel
      .findOne({ email: userData.email })
      .select('+passwordHash')
      .exec()

    if (!user) {
      throw new NotFoundException()
    }
    const validatePassword = await bcrypt.compare(
      userData.password,
      user.passwordHash
    )

    if (!validatePassword) {
      throw new UnauthorizedException()
    }

    const userObject = user.toObject<UserResponse>()

    return {
      userObject,
      ...(await this.sign(
        userObject.id,
        userObject.email,
        userObject.role,
        user.superAdmin
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
