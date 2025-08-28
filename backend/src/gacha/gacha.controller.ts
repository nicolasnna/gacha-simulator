import { AuthUser, JwtPayload } from '@/auth/decorators/auth-user.decorator'
import { JwtWithRefreshGuard } from '@/auth/guards/jwt-refresh.guard'
import { Action, ModuleResource } from '@access/access.decorator'
import { AccessGuard } from '@access/access.guard'
import { ActionKeyEnum, ModuleKeyEnum } from '@common/enums'
import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common'
import { CharacterObtainedDto } from './dto/character-obtained.dto'
import { PullDto, UserPullDto } from './dto/pull.dto'
import { GachaService } from './gacha.service'

@UseGuards(JwtWithRefreshGuard, AccessGuard)
@ModuleResource(ModuleKeyEnum.Gachas)
@Controller('gacha')
export class GachaController {
  constructor(private readonly gachaService: GachaService) {}

  @Action(ActionKeyEnum.CREATE)
  @Post('pull')
  gachaPull(@AuthUser() user: JwtPayload, @Body() pullDto: PullDto) {
    const getPullDto: UserPullDto = { ...pullDto, userId: user.sub }
    return this.gachaService.gachaPull(getPullDto)
  }

  @Action(ActionKeyEnum.READ)
  @Get('history')
  getHistoryPull(
    @AuthUser() user: JwtPayload,
    @Query('page') page: number,
    @Query('limit') limit: number
  ) {
    return this.gachaService.getHistoryPull(page, limit, user.sub)
  }

  @Action(ActionKeyEnum.CREATE)
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

  @Action(ActionKeyEnum.READ)
  @Get('character-obtained')
  getCharactersObtained(
    @AuthUser() user: JwtPayload,
    @Query('anime') anime: string
  ) {
    return this.gachaService.getCharactersObtained(user.sub, anime)
  }
}
