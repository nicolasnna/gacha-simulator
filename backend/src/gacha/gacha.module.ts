import { CharactersModule } from '@/characters/characters.module'
import { AccessModule } from '@/access/access.module'
import {
  Character,
  CharacterSchema,
  GachaPull,
  GachaPullSchema
} from '@common/schemas'
import { GachaUser, GachaUserSchema } from '@common/schemas/gacha-user.schema'
import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { GachaController } from './gacha.controller'
import { GachaService } from './gacha.service'
import { BullModule } from '@nestjs/bull'
import { GachaProcessor } from './gacha.processor'
import { GachaGateway } from './gacha.gateway'
import { GachaUserService } from './gacha-user.service'
import { Banner, BannerSchema } from '@common/schemas/banner.schema'
import { PullHelper } from './helpers/pull.helper'

@Module({
  imports: [
    AccessModule,
    MongooseModule.forFeature([
      { name: GachaPull.name, schema: GachaPullSchema },
      { name: GachaUser.name, schema: GachaUserSchema },
      { name: Character.name, schema: CharacterSchema },
      { name: Banner.name, schema: BannerSchema }
    ]),
    CharactersModule,
    BullModule.registerQueue({ name: 'gacha' })
  ],
  controllers: [GachaController],
  providers: [
    GachaService,
    GachaProcessor,
    GachaGateway,
    GachaUserService,
    PullHelper
  ],
  exports: [GachaService, GachaUserService]
})
export class GachaModule {}
