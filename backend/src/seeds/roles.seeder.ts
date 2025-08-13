import { ROLE_PERMISSIONS, RoleKey } from '@common/enums'
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
      key: RoleKey.SuperAdmin,
      label: 'Super Administrador',
      grants: ROLE_PERMISSIONS[RoleKey.SuperAdmin]
    },
    {
      key: RoleKey.Moderator,
      label: 'Moderador',
      grants: ROLE_PERMISSIONS[RoleKey.Moderator]
    },
    {
      key: RoleKey.Developer,
      label: 'Desarrollador',
      grants: ROLE_PERMISSIONS[RoleKey.Developer]
    },
    {
      key: RoleKey.User,
      label: 'Usuario General',
      grants: ROLE_PERMISSIONS[RoleKey.User]
    }
  ]

  async drop() {
    const roleKeys = this.roleDefinitions.map((r) => r.key)
    await this.roleModel.deleteMany({ key: { $in: roleKeys } })
    this.logger.warn(
      `Roles in mongoDB has been deleted: ${roleKeys.join(', ')}`
    )
  }

  async seed() {
    for (const role of this.roleDefinitions) {
      await this.roleModel.findOneAndUpdate(
        { key: role.key },
        { $set: role },
        {
          upsert: true,
          setDefaultsOnInsert: false,
          new: true
        }
      )
      this.logger.log(`Set ${role.key} whith label: ${role.label}`)
    }
  }
}
