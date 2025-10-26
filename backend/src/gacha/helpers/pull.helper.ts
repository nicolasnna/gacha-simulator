import { CharactersService } from '@/characters/characters.service'
import { Banner, BannerDocument } from '@common/schemas/banner.schema'
import { BadRequestException, Injectable } from '@nestjs/common'
import { GachaUserService } from '../gacha-user.service'
import {
  calculateMultiplePullRarity,
  calculateSinglePullRarity
} from './gacha-probability.helper'
import { RarityCharacterEnum } from '@common/enums'
import { GachaUser } from '@common/schemas/gacha-user.schema'

@Injectable()
export class PullHelper {
  constructor(
    private readonly charactersService: CharactersService,
    private readonly gachaUserService: GachaUserService
  ) {}

  async singlePull(userId: string, bannerInfo: BannerDocument) {
    const dataUser = await this.gachaUserService.getCreditsByAnimeBanner(
      userId,
      bannerInfo.anime
    )

    if (dataUser.data.credits < bannerInfo.costSinglePull) {
      throw new BadRequestException(
        `Necesitas ${bannerInfo.costSinglePull} creditos para una single`
      )
    }
    const rarity = calculateSinglePullRarity(bannerInfo.rates)
    const char = await this.charactersService.getRandomByRarity(
      String(bannerInfo._id),
      rarity,
      1
    )

    const currentCredits = await this.updateUserGachaCharacters(
      userId,
      bannerInfo,
      char
    )

    return {
      userId,
      animeOrigin: bannerInfo.anime,
      pullsCount: 1,
      items: char,
      currentCredits
    }
  }

  async multiPull(userId: string, bannerInfo: BannerDocument) {
    const dataUser = await this.gachaUserService.getCreditsByAnimeBanner(
      userId,
      bannerInfo.anime
    )

    if (dataUser.data.credits < bannerInfo.costMultiPull) {
      throw new BadRequestException(
        `Necesitas ${bannerInfo.costMultiPull} creditos para una single`
      )
    }
    const numberByRarity = calculateMultiplePullRarity(bannerInfo.rates, 10)

    const characterObtained = []
    for (const [rarity, count] of Object.entries(numberByRarity)) {
      if (count > 0) {
        const charObtained = await this.charactersService.getRandomByRarity(
          String(bannerInfo._id),
          rarity as RarityCharacterEnum,
          count
        )
        characterObtained.push(...charObtained)
      }
    }

    const currentCredits = await this.updateUserGachaCharacters(
      userId,
      bannerInfo,
      characterObtained
    )

    return {
      userId,
      animeOrigin: bannerInfo.anime,
      pullsCount: 10,
      items: characterObtained,
      currentCredits
    }
  }

  async updateUserGachaCharacters(
    userId: string,
    bannerInfo: Banner,
    characters: any[]
  ) {
    for (const char of characters) {
      await this.gachaUserService.setCharacterObtained(
        userId,
        bannerInfo.anime,
        char._id
      )
    }

    const currentCredits: GachaUser =
      await this.gachaUserService.incCreditValue(
        userId,
        bannerInfo.anime,
        characters.length === 1
          ? bannerInfo.costSinglePull
          : bannerInfo.costMultiPull
      )
    return { currentCredits: currentCredits.credits }
  }
}
