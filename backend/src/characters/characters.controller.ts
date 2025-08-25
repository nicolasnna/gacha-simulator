import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query
} from '@nestjs/common'
import { CharactersService } from './characters.service'
import { CreateCharacterDto } from './dto/create-character.dto'
import { UpdateCharacterDto } from './dto/update-character.dto'

@Controller('characters')
export class CharactersController {
  constructor(private readonly charactersService: CharactersService) {}

  @Post()
  create(@Body() createCharacterDto: CreateCharacterDto) {
    return this.charactersService.create(createCharacterDto)
  }

  @Get()
  getAll(@Query('page') page: number, @Query('limit') limit: number) {
    return this.charactersService.getAll(page, limit)
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.charactersService.findById(id)
  }

  @Patch(':id')
  updateCharGacha(
    @Param('id') id: string,
    @Body() newCharData: UpdateCharacterDto
  ) {
    return this.charactersService.updateCharGacha(id, newCharData)
  }

  @Delete(':id')
  deactivate(@Param('id') id: string) {
    return this.charactersService.deactivate(id)
  }

  @Patch(':id/activate')
  activate(@Param('id') id: string) {
    return this.charactersService.activate(id)
  }
}
