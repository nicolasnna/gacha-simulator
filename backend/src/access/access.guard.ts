import { ActionKeyEnum, ModuleKeyEnum, RoleEnum } from '@common/enums'
import { Role, RoleDocument } from '@common/schemas'
import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import {
  ACL_KEY,
  PERMISSION_KEY,
  RESOURCE_KEY,
  ROLES_KEY
} from './access.decorator'

@Injectable()
export class AccessGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @InjectModel(Role.name) private readonly roleModel: Model<RoleDocument>
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<RoleEnum[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()]
    )
    const metaRequiredResource =
      this.reflector.getAllAndOverride<ModuleKeyEnum>(RESOURCE_KEY, [
        context.getHandler(),
        context.getClass()
      ])
    const metaRequiredAcl = this.reflector.getAllAndOverride<ActionKeyEnum>(
      ACL_KEY,
      [context.getHandler(), context.getClass()]
    )

    const requiredPermission = this.reflector.getAllAndOverride<{
      module: ModuleKeyEnum
      action: ActionKeyEnum
    }>(PERMISSION_KEY, [context.getHandler(), context.getClass()])

    const requiredResource = requiredPermission?.module || metaRequiredResource
    const requiredAcl = requiredPermission?.action || metaRequiredAcl

    if (!requiredResource || !requiredAcl) {
      console.warn('Falta definir modulo o action')
      return false
    }

    const request = context.switchToHttp().getRequest()
    const user = request.user
    if (!user) throw new ForbiddenException('Usuario no autenticado')

    if (
      requiredRoles &&
      requiredRoles.length &&
      !requiredRoles.some((role) => role === user.role)
    )
      throw new ForbiddenException('Rol del usuario no autorizado')

    if (user.role === RoleEnum.SuperAdmin) return true

    const userRoleDb = await this.roleModel
      .findOne({ key: user.role })
      .lean()
      .exec()

    const grantForModule = userRoleDb.grants.find(
      (g) => g.module === requiredResource
    )

    if (grantForModule && grantForModule.actions.includes(requiredAcl))
      return true

    return false
  }
}
