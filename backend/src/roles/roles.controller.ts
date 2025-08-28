import { JwtWithRefreshGuard } from '@/auth/guards/jwt-refresh.guard'
import { Action, ModuleResource } from '@access/access.decorator'
import { AccessGuard } from '@access/access.guard'
import { ActionKeyEnum, ModuleKeyEnum } from '@common/enums'
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards
} from '@nestjs/common'
import { CreateRoleDto } from './dto/create-role.dto'
import { GrantsArrayDto } from './dto/grants-role.dto'
import { RolesService } from './roles.service'

@UseGuards(JwtWithRefreshGuard, AccessGuard)
@ModuleResource(ModuleKeyEnum.Roles)
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Action(ActionKeyEnum.CREATE)
  @Post()
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.create(createRoleDto)
  }

  @Action(ActionKeyEnum.READ)
  @Get()
  getAll(@Query('page') page: number, @Query('limit') limit: number) {
    return this.rolesService.getAll(page, limit)
  }

  @Action(ActionKeyEnum.READ)
  @Get(':role')
  findRole(@Param('role') role: string) {
    return this.rolesService.findRole(role)
  }

  @Action(ActionKeyEnum.UPDATE)
  @Patch(':id')
  updatePermission(
    @Param('id') id: string,
    @Body() permission: GrantsArrayDto
  ) {
    return this.rolesService.updatePermission(id, permission)
  }

  @Action(ActionKeyEnum.DELETE)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rolesService.remove(id)
  }
}
