import { DatabaseModule } from '@/connection'
import { Role, RoleSchema, User, UserSchema } from '@common/schemas'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { RolesSeeder } from './roles.seeder'
import { UsersSeeder } from './users.seeder'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    MongooseModule.forFeature([
      { name: Role.name, schema: RoleSchema },
      { name: User.name, schema: UserSchema }
    ])
  ],
  providers: [RolesSeeder, UsersSeeder]
})
export class SeedModule {}
