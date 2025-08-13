import { User, UserDocument } from '@common/schemas'
import { Injectable, Logger } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

@Injectable()
export class UsersSeeder {
  private readonly logger = new Logger(UsersSeeder.name, { timestamp: true })

  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>
  ) {}

  private readonly data: Array<{
    email: string
    password: string
    name?: string
    role: string
    superAdmin?: boolean
    active?: boolean
  }> = [
    {
      email: 'super@local.test',
      password: 'Admin123',
      name: 'Super Admin',
      role: 'userAdmin',
      superAdmin: true
    },
    {
      email: 'gacha@local.test',
      password: 'Secret123',
      name: 'Gacha Mgr',
      role: 'gachaManager'
    },
    {
      email: 'editor@local.test',
      password: 'Secret123',
      name: 'Editor',
      role: 'contentEditor'
    },
    {
      email: 'viewer@local.test',
      password: 'Secret123',
      name: 'Viewer',
      role: 'viewer'
    },
    {
      email: 'user@local.test',
      password: 'Secret123',
      name: 'Usuario',
      role: 'user'
    }
  ]
}
