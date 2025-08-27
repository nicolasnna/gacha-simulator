import { RolesModule } from '@/roles/roles.module'
import { Character, CharacterSchema } from '@common/schemas'
import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { CharactersController } from './characters.controller'
import { CharactersService } from './characters.service'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Character.name, schema: CharacterSchema }
    ]),
    RolesModule
  ],
  controllers: [CharactersController],
  providers: [CharactersService],
  exports: [CharactersService]
})
export class CharactersModule {}
