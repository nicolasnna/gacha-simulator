import { AccessModule } from '@/access/access.module'
import { BullModule } from '@nestjs/bull'
import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { BannersModule } from './banners/banners.module'
import { CharactersModule } from './characters/characters.module'
import { DatabaseModule } from './connection'
import { GachaModule } from './gacha/gacha.module'
import { RedisModule } from './redis/redis.module'
import { RolesModule } from './roles/roles.module'
import { UsersModule } from './users/users.module'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    RedisModule,
    AccessModule,
    BullModule.forRootAsync({
      useFactory: (confService: ConfigService) => ({
        redis: {
          host: confService.get('REDIS_HOST'),
          port: confService.get<number>('REDIS_PORT')
        },
        defaultJobOptions: {
          removeOnComplete: true,
          removeOnFail: 5000
        }
      }),
      inject: [ConfigService]
    }),
    AuthModule,
    UsersModule,
    RolesModule,
    DatabaseModule,
    CharactersModule,
    GachaModule,
    BannersModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
