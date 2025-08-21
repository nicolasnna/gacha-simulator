import { Controller, Get, Param, Query } from '@nestjs/common'
import { GachaService } from './gacha.service'
import { AnimeEnum } from '@common/enums'

@Controller('gacha')
export class GachaController {
  constructor(private readonly gachaService: GachaService) {}

  @Get('pull/:anime')
  getPull(@Param('anime') anime: AnimeEnum, @Query('count') count: number = 1) {
    return this.gachaService.getPull({
      anime,
      pulls: count,
      userId: 'sfehishf2323'
    })
  }
}
