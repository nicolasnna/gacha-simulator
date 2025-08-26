import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards
} from '@nestjs/common'
import { CharactersService } from './characters.service'
import { CreateCharacterDto } from './dto/create-character.dto'
import { UpdateCharacterDto } from './dto/update-character.dto'
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard'
import { AccessGuard } from '@access/access.guard'
import { Action, ModuleResource } from '@access/access.decorator'
import { ActionKeyEnum, ModuleKeyEnum } from '@common/enums'

@UseGuards(JwtAuthGuard, AccessGuard)
@ModuleResource(ModuleKeyEnum.Characters)
@Controller('characters')
export class CharactersController {
  constructor(private readonly charactersService: CharactersService) {}

  @Action(ActionKeyEnum.CREATE)
  @Post()
  create(@Body() createCharacterDto: CreateCharacterDto) {
    return this.charactersService.create(createCharacterDto)
  }

  @Action(ActionKeyEnum.READ)
  @Get()
  getAll(@Query('page') page: number, @Query('limit') limit: number) {
    return this.charactersService.getAll(page, limit)
  }

  @Action(ActionKeyEnum.READ)
  @Get(':id')
  findById(@Param('id') id: string) {
    return this.charactersService.findById(id)
  }

  @Action(ActionKeyEnum.UPDATE)
  @Patch(':id')
  updateCharGacha(
    @Param('id') id: string,
    @Body() newCharData: UpdateCharacterDto
  ) {
    return this.charactersService.updateCharGacha(id, newCharData)
  }

  @Action(ActionKeyEnum.UPDATE)
  @Patch(':id/activate')
  activate(@Param('id') id: string) {
    return this.charactersService.activate(id)
  }

  @Action(ActionKeyEnum.DELETE)
  @Delete(':id')
  deactivate(@Param('id') id: string) {
    return this.charactersService.deactivate(id)
  }
}
