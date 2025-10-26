import { AuthModule } from '@/auth/auth.module'
import { CharactersModule } from '@/characters/characters.module'
import { DatabaseModule } from '@/connection'
import { AccessModule } from '@access/access.module'
import {
  Character,
  CharacterSchema,
  Role,
  RoleSchema,
  User,
  UserSchema
} from '@common/schemas'
import { Banner, BannerSchema } from '@common/schemas/banner.schema'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { CharactersSeeder } from './characters.seeder'
import { RolesSeeder } from './roles.seeder'
import { UsersSeeder } from './users.seeder'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    AccessModule,
    AuthModule,
    MongooseModule.forFeature([
      { name: Role.name, schema: RoleSchema },
      { name: User.name, schema: UserSchema },
      { name: Character.name, schema: CharacterSchema },
      { name: Banner.name, schema: BannerSchema }
    ]),
    CharactersModule
  ],
  providers: [RolesSeeder, UsersSeeder, CharactersSeeder]
})
export class SeedModule {}
