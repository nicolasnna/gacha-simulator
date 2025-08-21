import { Module } from '@nestjs/common'
import { GachaService } from './gacha.service'
import { GachaController } from './gacha.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { GachaPull, GachaPullSchema } from '@common/schemas'
import { CharactersModule } from '@/characters/characters.module'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: GachaPull.name, schema: GachaPullSchema }
    ]),
    CharactersModule
  ],
  controllers: [GachaController],
  providers: [GachaService]
})
export class GachaModule {}
