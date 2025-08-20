import { ROLE_PERMISSIONS, RoleEnum } from '@common/enums'
import { Role, RoleDocument } from '@common/schemas'
import { Injectable, Logger } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

@Injectable()
export class RolesSeeder {
  private readonly logger = new Logger(RolesSeeder.name)

  constructor(
    @InjectModel(Role.name) private readonly roleModel: Model<RoleDocument>
  ) {}

  private readonly roleDefinitions = [
    {
      key: RoleEnum.SuperAdmin,
      label: 'Super Administrador',
      grants: ROLE_PERMISSIONS[RoleEnum.SuperAdmin]
    },
    {
      key: RoleEnum.Moderator,
      label: 'Moderador',
      grants: ROLE_PERMISSIONS[RoleEnum.Moderator]
    },
    {
      key: RoleEnum.Developer,
      label: 'Desarrollador',
      grants: ROLE_PERMISSIONS[RoleEnum.Developer]
    },
    {
      key: RoleEnum.User,
      label: 'Usuario General',
      grants: ROLE_PERMISSIONS[RoleEnum.User]
    }
  ]

  async drop() {
    const roleKeys = this.roleDefinitions.map((r) => r.key)
    await this.roleModel.deleteMany({ key: { $in: roleKeys } }).exec()
    this.logger.warn(
      `Roles in mongoDB has been deleted: ${roleKeys.join(', ')}`
    )
  }

  async seed() {
    for (const role of this.roleDefinitions) {
      await this.roleModel
        .findOneAndUpdate(
          { key: role.key },
          { $set: role },
          {
            upsert: true,
            setDefaultsOnInsert: false,
            new: true
          }
        )
        .exec()
      this.logger.log(`Setted ${role.key} whith label: ${role.label}`)
    }
  }
}
