import { AuthUser, JwtPayload } from '@/auth/decorators/auth-user.decorator'
import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common'
import { PullDto, UserPullDto } from './dto/pull.dto'
import { GachaService } from './gacha.service'
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard'
import { CharacterObtainedDto } from './dto/character-obtained.dto'

@Controller('gacha')
export class GachaController {
  constructor(private readonly gachaService: GachaService) {}

  @UseGuards(JwtAuthGuard)
  @Post('pull')
  gachaPull(@AuthUser() user: JwtPayload, @Body() pullDto: PullDto) {
    const getPullDto: UserPullDto = { ...pullDto, userId: user.sub }
    return this.gachaService.gachaPull(getPullDto)
  }

  @UseGuards(JwtAuthGuard)
  @Get('history')
  getHistoryPull(
    @AuthUser() user: JwtPayload,
    @Query('page') page: number,
    @Query('limit') limit: number
  ) {
    return this.gachaService.getHistoryPull(page, limit, user.sub)
  }

  @UseGuards(JwtAuthGuard)
  @Post('character-obtained')
  setCharacterObtained(
    @AuthUser() user: JwtPayload,
    @Body() charInfo: CharacterObtainedDto
  ) {
    return this.gachaService.setCharacterObtained(
      user.sub,
      charInfo.anime,
      charInfo.charId
    )
  }

  @UseGuards(JwtAuthGuard)
  @Get('character-obtained')
  getCharactersObtained(
    @AuthUser() user: JwtPayload,
    @Query('anime') anime: string
  ) {
    return this.gachaService.getCharactersObtained(user.sub, anime)
  }
}
