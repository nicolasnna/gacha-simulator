import { Role, UserDocument } from '@common/schemas'
import {
  BadRequestException,
  Injectable,
  NotFoundException
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Document, Model } from 'mongoose'
import { CreateRoleDto } from './dto/create-role.dto'
import { GrantsDto } from './dto/grants-role.dto'
import { RoleLean } from './types/role-lean.type'
import { RoleType } from './types/role.type'

@Injectable()
export class RolesService {
  constructor(
    @InjectModel(Role.name) private readonly roleModel: Model<UserDocument>
  ) {}

  create(createRoleDto: CreateRoleDto) {
    return 'This action adds a new role'
  }

  async getAll(
    page: number = 1,
    limit: number = 20
  ): Promise<{
    data: RoleType[]
    totalItems: number
    lastItemNumber: number
    page: number
    limit: number
  }> {
    if (page < 1)
      throw new BadRequestException('La query page debe ser 1 o mayor')

    const skip = (Math.max(page, 1) - 1) * Math.max(limit, 1)

    const [roles, totalItems] = await Promise.all([
      this.roleModel
        .find()
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 })
        .lean<RoleLean[]>()
        .exec(),
      this.roleModel.countDocuments().exec()
    ])

    const data: RoleType[] = roles.map(({ _id, ...rest }) => ({
      id: _id.toString(),
      ...rest
    }))

    const lastItemNumber = skip + data.length

    return { data, totalItems, lastItemNumber, page, limit }
  }

  async findRole(role: string) {
    const roleDoc = await this.roleModel.find({ key: role }).exec()

    if (!roleDoc) throw new NotFoundException('Rol no encontrado')

    return { data: roleDoc }
  }

  async updatePermission(id: string, rolePermissions: GrantsDto[]) {
    const roleDoc = await this.roleModel
      .findByIdAndUpdate(
        id,
        {
          $set: { grants: rolePermissions }
        },
        { new: true }
      )
      .exec()

    if (!roleDoc) throw new NotFoundException('Rol no encontrado')
    const rolObject = roleDoc.toObject()
    rolObject.id = rolObject._id
    delete rolObject._id
    delete rolObject.__v

    return { data: rolObject }
  }

  async remove(id: string) {
    const roleDoc = await this.roleModel.findByIdAndDelete(id).exec()

    if (!roleDoc) throw new NotFoundException('Rol no encontrado')

    const roleDeleted = roleDoc.toObject()
    roleDeleted.id = roleDeleted._id
    delete roleDeleted._id
    delete roleDeleted.__v

    return { data: roleDeleted }
  }
}
