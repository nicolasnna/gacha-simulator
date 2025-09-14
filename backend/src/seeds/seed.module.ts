import { CharactersModule } from '@/characters/characters.module'
import { DatabaseModule } from '@/connection'
import {
  Character,
  CharacterSchema,
  Role,
  RoleSchema,
  User,
  UserSchema
} from '@common/schemas'
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
    MongooseModule.forFeature([
      { name: Role.name, schema: RoleSchema },
      { name: User.name, schema: UserSchema },
      { name: Character.name, schema: CharacterSchema }
    ]),
    CharactersModule
  ],
  providers: [RolesSeeder, UsersSeeder, CharactersSeeder]
})
export class SeedModule {}
