import { Role, RoleSchema } from '@common/schemas'
import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { RolesController } from './roles.controller'
import { RolesService } from './roles.service'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Role.name, schema: RoleSchema }])
  ],
  controllers: [RolesController],
  providers: [RolesService],
  exports: [RolesService]
})
export class RolesModule {}
