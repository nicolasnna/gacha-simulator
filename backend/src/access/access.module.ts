import { RolesModule } from '@/roles/roles.module'
import { Role, RoleSchema } from '@common/schemas'
import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { AccessGuard } from './access.guard'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Role.name, schema: RoleSchema }]),
    RolesModule
  ],
  providers: [AccessGuard],
  exports: [AccessGuard, MongooseModule]
})
export class AccessModule {}
