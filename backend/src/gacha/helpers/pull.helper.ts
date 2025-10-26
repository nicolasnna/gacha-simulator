import { CharactersService } from '@/characters/characters.service'
import { UsersService } from '@/users/users.service'
import { BannerEnum, RarityCharacterEnum } from '@common/enums'
import { User } from '@common/schemas'
import { Banner, BannerDocument } from '@common/schemas/banner.schema'
import { BadRequestException, Injectable } from '@nestjs/common'
import { GachaUserService } from '../gacha-user.service'
import {
  calculateMultiplePullRarity,
  calculateSinglePullRarity
} from './gacha-probability.helper'

@Injectable()
export class PullHelper {
  constructor(
    private readonly charactersService: CharactersService,
    private readonly gachaUserService: GachaUserService,
    private readonly usersGacha: UsersService
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
      ...currentCredits
    }
  }

  async multiPull(userId: string, bannerInfo: BannerDocument) {
    const dataUser = await this.gachaUserService.getCreditsByAnimeBanner(
      userId,
      bannerInfo.anime
    )

    if (dataUser.data.credits < bannerInfo.costMultiPull) {
      throw new BadRequestException(
        `Necesitas ${bannerInfo.costMultiPull} creditos para una multi`
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
      ...currentCredits
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

    const { costMultiPull, costSinglePull, type } = bannerInfo

    const valueToInc =
      characters.length === 1 ? -costSinglePull : -costMultiPull
    const incPromotional = type === BannerEnum.Promotional ? valueToInc : 0
    const incStandard = type === BannerEnum.Standard ? valueToInc : 0

    const userDataUpdated: User =
      await this.usersGacha.incrementSingleUserCredits(
        userId,
        incPromotional,
        incStandard
      )

    const { creditsPromotional, creditsStandard } = userDataUpdated

    return { creditsPromotional, creditsStandard }
  }
}
