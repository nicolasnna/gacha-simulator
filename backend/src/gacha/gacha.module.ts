import { AccessModule } from '@/access/access.module'
import { CharactersModule } from '@/characters/characters.module'
import {
  Character,
  CharacterSchema,
  GachaPull,
  GachaPullSchema
} from '@common/schemas'
import { Banner, BannerSchema } from '@common/schemas/banner.schema'
import { GachaUser, GachaUserSchema } from '@common/schemas/gacha-user.schema'
import { BullModule } from '@nestjs/bull'
import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { GachaUserService } from './gacha-user.service'
import { GachaController } from './gacha.controller'
import { GachaGateway } from './gacha.gateway'
import { GachaProcessor } from './gacha.processor'
import { GachaService } from './gacha.service'
import { PullHelper } from './helpers/pull.helper'
import { UsersModule } from '@/users/users.module'

@Module({
  imports: [
    AccessModule,
    MongooseModule.forFeature([
      { name: GachaPull.name, schema: GachaPullSchema },
      { name: GachaUser.name, schema: GachaUserSchema },
      { name: Character.name, schema: CharacterSchema },
      { name: Banner.name, schema: BannerSchema }
    ]),
    UsersModule,
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
