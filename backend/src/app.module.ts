import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { UsersModule } from './users/users.module'
import { ConfigModule } from '@nestjs/config'
import { DatabaseModule } from './connection'
import { RolesModule } from './roles/roles.module'
import { CharactersModule } from './characters/characters.module';
import { GachaModule } from './gacha/gacha.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    UsersModule,
    DatabaseModule,
    RolesModule,
    CharactersModule,
    GachaModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
