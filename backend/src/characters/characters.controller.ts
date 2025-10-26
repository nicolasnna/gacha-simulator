import { JwtWithRefreshGuard } from '@/auth/guards/jwt-refresh.guard'
import { Action, ModuleResource } from '@/access/access.decorator'
import { AccessGuard } from '@/access/access.guard'
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
import { CharactersService } from './characters.service'
import { CreateCharacterDto } from './dto/create-character.dto'
import { UpdateCharacterDto } from './dto/update-character.dto'

@UseGuards(JwtWithRefreshGuard, AccessGuard)
@ModuleResource(ModuleKeyEnum.Characters)
@Controller('characters')
export class CharactersController {
  constructor(private readonly charactersService: CharactersService) {}

  @Action(ActionKeyEnum.CREATE)
  @Post('byMalId')
  createByMalId(@Body() createCharacterDto: CreateCharacterDto) {
    return this.charactersService.createByMalId(createCharacterDto)
  }

  @Action(ActionKeyEnum.READ)
  @Get()
  getAll(
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('anime') anime: string
  ) {
    return this.charactersService.getAll(page, limit, anime)
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
