import { Global, Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { Redis } from 'ioredis'
import { RedisService } from './redis.service'

export const REDIS_CLIENT = 'REDIS_CLIENT'

@Global()
@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: REDIS_CLIENT,
      useFactory: (configService: ConfigService) => {
        const redis = new Redis({
          host: configService.get('REDIS_HOST') || 'localhost',
          port: configService.get<number>('REDIS_PORT') || 6379,
          password: configService.get('REDIS_PASSWORD') || undefined
        })

        redis.on('error', (err) => {
          console.error('Redis Client Error', err)
        })

        redis.on('connect', () => {
          console.log('Connected to Redis')
        })

        return redis
      },
      inject: [ConfigService]
    },
    RedisService
  ],
  exports: [REDIS_CLIENT, RedisService]
})
export class RedisModule {}
