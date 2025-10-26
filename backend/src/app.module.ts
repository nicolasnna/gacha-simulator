import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { UsersModule } from './users/users.module'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { DatabaseModule } from './connection'
import { RolesModule } from './roles/roles.module'
import { CharactersModule } from './characters/characters.module'
import { GachaModule } from './gacha/gacha.module'
import { AccessModule } from '@/access/access.module'
import { RedisModule } from './redis/redis.module'
import { BullModule } from '@nestjs/bull'
import { BannersModule } from './banners/banners.module'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
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
    DatabaseModule,
    RolesModule,
    CharactersModule,
    GachaModule,
    AccessModule,
    RedisModule,
    BannersModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
