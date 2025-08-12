import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose'

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService): MongooseModuleOptions => ({
        uri: config.getOrThrow<string>('URI_MONGO'),
        dbName: config.get<string>('DB_NAME')
      })
    })
  ],
  exports: [MongooseModule]
})
export class DatabaseModule {}
