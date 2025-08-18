import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseArrayPipe,
  Patch,
  Post,
  Query
} from '@nestjs/common'
import { CreateRoleDto } from './dto/create-role.dto'
import { RolesService } from './roles.service'
import { GrantsDto } from './dto/grants-role.dto'

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.create(createRoleDto)
  }

  @Get()
  getAll(@Query('page') page: number, @Query('limit') limit: number) {
    return this.rolesService.getAll(page, limit)
  }

  @Get(':role')
  findRole(@Param('role') role: string) {
    return this.rolesService.findRole(role)
  }

  @Patch(':id')
  updatePermission(
    @Param('id') id: string,
    @Body(new ParseArrayPipe({ items: GrantsDto })) permission: GrantsDto[]
  ) {
    return this.rolesService.updatePermission(id, permission)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rolesService.remove(+id)
  }
}
