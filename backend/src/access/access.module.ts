import { Role, RoleSchema } from '@common/schemas'
import { Global, Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { AccessGuard } from './access.guard'

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Role.name, schema: RoleSchema }])
  ],
  providers: [AccessGuard],
  exports: [AccessGuard, MongooseModule]
})
export class AccessModule {}
