import { Role, UserDocument } from '@common/schemas'
import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { CreateRoleDto } from './dto/create-role.dto'
import { GrantsArrayDto } from './dto/grants-role.dto'
import { RoleLean } from './types/role-lean.type'
import { RoleType } from './types/role.type'

@Injectable()
export class RolesService {
  constructor(
    @InjectModel(Role.name) private readonly roleModel: Model<UserDocument>
  ) {}

  async create(roleData: CreateRoleDto) {
    const roleExist = await this.roleModel.exists({ key: roleData.key }).exec()
    if (roleExist) throw new ConflictException('El rol a crear ya existe')

    const newRoleModel = new this.roleModel({
      ...roleData
    })

    const newRoleDoc = await newRoleModel.save()

    return { data: newRoleDoc }
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
    const roleDocs = await this.roleModel.findOne({ key: role }).exec()

    if (!roleDocs) throw new NotFoundException('Rol no encontrado')

    const roleObj = roleDocs.toObject()
    roleObj.id = roleObj._id
    delete roleObj._id
    delete roleObj.__v

    return { data: roleObj }
  }

  async updatePermission(id: string, rolePermissions: GrantsArrayDto) {
    const roleDoc = await this.roleModel
      .findByIdAndUpdate(
        id,
        {
          $set: { grants: rolePermissions.grants }
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
