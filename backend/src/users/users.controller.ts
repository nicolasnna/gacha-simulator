import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query
} from '@nestjs/common'
import { UpdateUserInfoDto } from './dto/update-user-info.dto'
import { UsersService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() dataUser: CreateUserDto) {
    return this.usersService.create(dataUser)
  }

  @Get()
  findAll(@Query('page') page: number, @Query('limit') limit: number) {
    return this.usersService.findAll(page, limit)
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.usersService.findById(id)
  }

  @Patch(':id')
  updateInfo(@Param('id') id: string, @Body() userInfo: UpdateUserInfoDto) {
    return this.usersService.updateInfo(id, userInfo)
  }

  @Delete(':id')
  deactivateById(@Param('id') id: string) {
    return this.usersService.deactivateById(id)
  }

  @Patch(':id/activate')
  activateById(@Param('id') id: string) {
    return this.usersService.activateById(id)
  }
}
