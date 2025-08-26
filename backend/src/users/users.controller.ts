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
import { UpdateUserInfoDto } from './dto/update-user-info.dto'
import { UsersService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto'
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard'
import { AccessGuard } from '@access/access.guard'
import { Action, ModuleResource } from '@access/access.decorator'
import { ActionKeyEnum, ModuleKeyEnum } from '@common/enums'

@UseGuards(JwtAuthGuard, AccessGuard)
@ModuleResource(ModuleKeyEnum.Users)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Action(ActionKeyEnum.CREATE)
  @Post()
  create(@Body() dataUser: CreateUserDto) {
    return this.usersService.create(dataUser)
  }

  @Action(ActionKeyEnum.READ)
  @Get()
  findAll(@Query('page') page: number, @Query('limit') limit: number) {
    return this.usersService.findAll(page, limit)
  }

  @Action(ActionKeyEnum.READ)
  @Get(':id')
  findById(@Param('id') id: string) {
    return this.usersService.findById(id)
  }

  @Action(ActionKeyEnum.UPDATE)
  @Patch(':id')
  updateInfo(@Param('id') id: string, @Body() userInfo: UpdateUserInfoDto) {
    return this.usersService.updateInfo(id, userInfo)
  }

  @Action(ActionKeyEnum.UPDATE)
  @Patch(':id/activate')
  activateById(@Param('id') id: string) {
    return this.usersService.activateById(id)
  }

  @Action(ActionKeyEnum.DELETE)
  @Delete(':id')
  deactivateById(@Param('id') id: string) {
    return this.usersService.deactivateById(id)
  }
}
