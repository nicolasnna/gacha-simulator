import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { Role, RoleSchema, User, UserSchema } from 'src/common/schemas'
import { RolesSeeder } from './roles.seeder'
import { UsersSeeder } from './users.seeder'
import { DatabaseModule } from 'src/connection'

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
