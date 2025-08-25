import { CharactersModule } from '@/characters/characters.module'
import { AccessModule } from '@access/access.module'
import { GachaPull, GachaPullSchema } from '@common/schemas'
import { GachaUser, GachaUserSchema } from '@common/schemas/gacha-user.schema'
import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { GachaController } from './gacha.controller'
import { GachaService } from './gacha.service'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: GachaPull.name, schema: GachaPullSchema },
      { name: GachaUser.name, schema: GachaUserSchema }
    ]),
    CharactersModule,
    AccessModule
  ],
  controllers: [GachaController],
  providers: [GachaService]
})
export class GachaModule {}
