import { RoleKey } from '@common/enums'
import { User, UserDocument } from '@common/schemas'
import { Injectable, Logger } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import * as bcrypt from 'bcrypt'
import { Model } from 'mongoose'

@Injectable()
export class UsersSeeder {
  private readonly logger = new Logger(UsersSeeder.name, { timestamp: true })

  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>
  ) {}

  private readonly usersData: Array<{
    email: string
    password: string
    name?: string
    role: RoleKey
    superAdmin?: boolean
    active?: boolean
  }> = [
    {
      email: 'super@local.test',
      password: 'Admin123',
      name: 'Super Admin',
      role: RoleKey.SuperAdmin,
      superAdmin: true
    },
    {
      email: 'gacha@local.test',
      password: 'Secret123',
      name: 'Gacha Mgr',
      role: RoleKey.Moderator
    },
    {
      email: 'editor@local.test',
      password: 'Secret123',
      name: 'Editor',
      role: RoleKey.Developer
    },
    {
      email: 'viewer@local.test',
      password: 'Secret123',
      name: 'Viewer',
      role: RoleKey.User
    },
    {
      email: 'user@local.test',
      password: 'Secret123',
      name: 'Usuario',
      role: RoleKey.User
    }
  ]

  async drop() {
    const userEmails = this.usersData.map((user) => user.email)
    await this.userModel.deleteMany({ email: { $in: userEmails } }).exec()
    this.logger.warn(
      `Emails in mongoDB hsa been deleted: ${userEmails.join(', ')}`
    )
  }

  async seed() {
    for (const user of this.usersData) {
      const { password, ...info } = user

      const passwordHash = await bcrypt.hash(password, 12)
      const superAdmin = info.role === RoleKey.SuperAdmin

      await this.userModel
        .findOneAndUpdate(
          { email: info.email },
          { $set: { ...info, passwordHash, superAdmin } },
          { upsert: true, setDefaultsOnInsert: false, new: true }
        )
        .exec()

      this.logger.log(`Setted ${info.email}`)
    }
  }
}
