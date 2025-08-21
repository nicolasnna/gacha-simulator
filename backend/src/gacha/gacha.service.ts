import { CharactersService } from '@/characters/characters.service'
import { RarityCharacterEnum } from '@common/enums'
import { PullsEnum } from '@common/enums/pulls.enum'
import { GachaPull, GachaPullDocument } from '@common/schemas'
import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { GetPullDto } from './dto/get-pull.dto'

@Injectable()
export class GachaService {
  constructor(
    @InjectModel(GachaPull.name)
    private readonly gachaPullModel: Model<GachaPullDocument>,
    private charactersService: CharactersService
  ) {}

  private readonly rarityProbabilities = {
    [RarityCharacterEnum.SuperSuperRare]: 0.5,
    [RarityCharacterEnum.SuperRare]: 3.0,
    [RarityCharacterEnum.Rare]: 12.0,
    [RarityCharacterEnum.Common]: 84.5
  }

  private _calculateRarity(): RarityCharacterEnum {
    const random = Math.random() * 100
    let cumulative = 0

    for (const [rarity, probs] of Object.entries(this.rarityProbabilities)) {
      cumulative += probs
      if (random <= cumulative) return rarity as RarityCharacterEnum
    }

    return RarityCharacterEnum.Common
  }

  async getPull({ anime, pulls, userId }: GetPullDto & { userId: string }) {
    if (![PullsEnum.One, PullsEnum.Ten].includes(pulls)) {
      throw new BadRequestException(
        'Los pulls del gacha solo pueden ser 1 o 10'
      )
    }

    let items = []

    if (pulls === PullsEnum.One) {
      const rarity = this._calculateRarity()
      items = await this.charactersService.getRandomByRarity(rarity, 1)
    }

    if (pulls === PullsEnum.Ten) {
      const numberByRarity = {
        [RarityCharacterEnum.SuperSuperRare]: 0,
        [RarityCharacterEnum.SuperRare]: 0,
        [RarityCharacterEnum.Rare]: 0,
        [RarityCharacterEnum.Common]: 0
      }

      for (let pull = 0; pull < 10; pull++) {
        const rarity = this._calculateRarity()
        numberByRarity[rarity] += 1
      }

      for (const [rarity, count] of Object.entries(numberByRarity)) {
        if (count > 0) {
          const charObtained = await this.charactersService.getRandomByRarity(
            rarity as RarityCharacterEnum,
            count
          )
          items.push(...charObtained)
        }
      }
    }

    const newPull = new this.gachaPullModel({
      userId: userId,
      animeOrigin: anime,
      pullsCount: pulls,
      items: items
    })

    return await newPull.save({ validateBeforeSave: true })
  }
}
