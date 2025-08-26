import { RolesModule } from '@/roles/roles.module'
import { Module } from '@nestjs/common'
import { AccessGuard } from './access.guard'

@Module({
  imports: [RolesModule],
  providers: [AccessGuard],
  exports: [AccessGuard, RolesModule]
})
export class AccessModule {}
