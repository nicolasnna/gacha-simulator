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
    private readonly reflector: Reflector,
    @InjectModel(Role.name) private readonly roleModel: Model<RoleDocument>
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()
    const user = request.user
    if (!user) throw new ForbiddenException('Usuario no autenticado')

    if (user.role === RoleEnum.SuperAdmin) return true

    const requiredRoles = this.reflector.getAllAndOverride<RoleEnum[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()]
    )
    // Decoradores individuales
    const metaRequiredResource =
      this.reflector.getAllAndOverride<ModuleKeyEnum>(RESOURCE_KEY, [
        context.getHandler(),
        context.getClass()
      ])
    const metaRequiredAcl = this.reflector.getAllAndOverride<ActionKeyEnum>(
      ACL_KEY,
      [context.getHandler(), context.getClass()]
    )
    // Decorador conjunto
    const requiredPermission = this.reflector.getAllAndOverride<{
      module: ModuleKeyEnum
      action: ActionKeyEnum
    }>(PERMISSION_KEY, [context.getHandler(), context.getClass()])

    const requiredResource = requiredPermission?.module || metaRequiredResource
    const requiredAcl = requiredPermission?.action || metaRequiredAcl

    if (!requiredResource || !requiredAcl) {
      console.warn('Falta definir modulo o action')
      return true
    }

    if (requiredRoles?.length && !requiredRoles.includes(user.role))
      throw new ForbiddenException('Rol del usuario no autorizado')

    const userRole = await this.roleModel.findOne({ key: user.role })

    const grantForModule = userRole.grants.find(
      (g) => g.module === requiredResource
    )

    if (
      grantForModule.actions.includes(requiredAcl) ||
      grantForModule.actions.includes(ActionKeyEnum.MANAGE)
    )
      return true

    return false
  }
}
