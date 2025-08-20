import { User, UserDocument } from '@common/schemas'
import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { UpdateUserInfoDto } from './dto/update-user-info.dto'
import { UserLean } from './types'
import { UserResponse, UserWithOmit } from './types/user-response.type'
import { CreateUserDto } from './dto/create-user.dto'
import * as bcrypt from 'bcrypt'
import { FindEmailUserDto } from './dto/find-email-user.dto'

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>
  ) {}

  async create(userData: CreateUserDto) {
    const exists = await this.userModel.exists({ email: userData.email })
    if (exists) throw new ConflictException('Email ya registrado')

    const passwordHash = await bcrypt.hash(userData.password, 12)
    const doc = await this.userModel.create({
      email: userData.email,
      passwordHash,
      role: userData.role,
      name: userData.name
    })

    const user = doc.toObject()
    user.id = user._id
    delete user._id
    delete user.__v
    return { data: user }
  }

  async findAll(
    page = 1,
    limit = 20
  ): Promise<{
    data: UserWithOmit[]
    totalItems: number
    lastItemNumber: number
    page: number
    limit: number
  }> {
    if (page < 1)
      throw new BadRequestException('La query page debe ser 1 o mayor')

    // Desde que elemento empezar a traer
    const skip = (Math.max(page, 1) - 1) * Math.max(limit, 1)

    const [users, totalItems] = await Promise.all([
      this.userModel
        .find()
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 })
        .lean<UserLean[]>()
        .exec(),
      this.userModel.countDocuments().exec()
    ])

    const data: UserWithOmit[] = users.map(({ _id, ...restUser }) => ({
      id: _id.toString(),
      ...restUser
    }))

    const lastItemNumber = skip + data.length // N° ultimo elemento entregado

    return { data, totalItems, lastItemNumber, page, limit }
  }

  async findById(id: string): Promise<UserResponse> {
    const data = await this.userModel.findById(id).exec()

    if (!data) throw new NotFoundException('Usuario no encontrado')

    const { _id, ...rest } = data.toObject<UserWithOmit>()
    return { data: { id: _id, ...rest } }
  }

  async findByEmail(data: FindEmailUserDto) {
    const user = await this.userModel.findOne({ email: data.email }).exec()
    if (!user) throw new NotFoundException()

    return { data: { ...user, passwordHash: user.passwordHash } }
  }

  async updateInfo(
    id: string,
    userInfo: UpdateUserInfoDto
  ): Promise<UserResponse> {
    const userData = await this.userModel
      .findByIdAndUpdate(
        id,
        {
          $set: { ...userInfo }
        },
        { new: true }
      )
      .exec()

    if (!userData) throw new NotFoundException('Usuario no encontrado')

    const { _id, ...rest } = userData.toObject<UserWithOmit>()
    return { data: { id: _id.toString(), ...rest } }
  }

  async deactivateById(id: string): Promise<UserResponse> {
    return await this._changeActiveState(id, false)
  }

  async activateById(id: string): Promise<UserResponse> {
    return await this._changeActiveState(id, true)
  }

  private async _changeActiveState(id: string, active: boolean) {
    const doc = await this.userModel
      .findByIdAndUpdate(id, { $set: { active } }, { new: true })
      .exec()

    if (!doc) throw new NotFoundException('Usuario no encontrado')

    const { _id, ...rest } = doc.toObject<UserWithOmit>()
    return { data: { id: _id.toString(), ...rest } }
  }
}
