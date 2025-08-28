import { Inject, Injectable, OnModuleDestroy } from '@nestjs/common'
import { Redis } from 'ioredis'

@Injectable()
export class RedisService implements OnModuleDestroy {
  constructor(@Inject('REDIS_CLIENT') private readonly redisClient: Redis) {}

  onModuleDestroy() {
    this.redisClient.disconnect()
  }

  async get(key: string) {
    return this.redisClient.get(key)
  }

  async set(key: string, value: string, ttlSeconds?: number) {
    if (ttlSeconds) return this.redisClient.setex(key, ttlSeconds, value)
    return this.redisClient.set(key, value)
  }

  async exist(key: string) {
    return this.redisClient.exists(key)
  }

  async ttl(key: string) {
    return this.redisClient.ttl(key)
  }

  async del(key: string) {
    return this.redisClient.del(key)
  }

  async setRefreshToken(
    userId: string,
    token: string,
    ttlSeconds: number = 86400
  ) {
    return await this.set(`refresh_token:${userId}`, token, ttlSeconds)
  }

  async getRefreshToken(userId: string) {
    return await this.get(`refresh_token:${userId}`)
  }

  async delRefreshToken(userId: string) {
    return await this.del(`refresh_token:${userId}`)
  }
}
