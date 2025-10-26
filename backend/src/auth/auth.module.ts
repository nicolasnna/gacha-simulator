import { RedisModule } from '@/redis/redis.module'
import { User, UserSchema } from '@common/schemas'
import { Global, Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { MongooseModule } from '@nestjs/mongoose'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { JwtWithRefreshGuard } from './guards/jwt-refresh.guard'
import { JwtStrategy } from './strategies/jwt.strategy'

@Global()
@Module({
  imports: [
    ConfigModule,
    RedisModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_ACCESS_SECRET'),
        signOptions: { expiresIn: '5m' }
      }),
      inject: [ConfigService],
      global: true
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, JwtWithRefreshGuard],
  exports: [AuthService, JwtWithRefreshGuard]
})
export class AuthModule {}
