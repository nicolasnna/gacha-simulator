import { CharactersService } from '@/characters/characters.service'
import { RarityCharacterEnum } from '@common/enums'
import { PullsEnum } from '@common/enums/pulls.enum'
import { GachaPull, GachaPullDocument } from '@common/schemas'
import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { UserPullDto } from './dto/pull.dto'
import {
  BASE_RATES,
  calculateMultiplePullRarity,
  calculateSinglePullRarity
} from './helpers/gacha-probability.helper'

@Injectable()
export class GachaService {
  constructor(
    @InjectModel(GachaPull.name)
    private readonly gachaPullModel: Model<GachaPullDocument>,
    private charactersService: CharactersService
  ) {}

  async gachaPull({ anime, pulls, userId }: UserPullDto) {
    if (![PullsEnum.One, PullsEnum.Ten].includes(pulls)) {
      throw new BadRequestException(
        'Los pulls del gacha solo pueden ser 1 o 10'
      )
    }

    let items = []

    if (pulls === PullsEnum.One) {
      const rarity = calculateSinglePullRarity(BASE_RATES)
      items = await this.charactersService.getRandomByRarity(rarity, 1)
    }

    if (pulls === PullsEnum.Ten) {
      const numberByRarity = calculateMultiplePullRarity(BASE_RATES, 10)

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

  async getHistoryPull(page: number, limit: number, userId?: string) {
    if (page < 1 || limit < 1)
      throw new BadRequestException(
        'La query page y limit deben ser mayores a 0'
      )

    const skip = (Math.max(page, 1) - 1) * Math.max(limit, 1)

    const [historyPulls, totalItems] = await Promise.all([
      this.gachaPullModel
        .find({ userId: userId })
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 })
        .lean()
        .exec(),
      this.gachaPullModel.countDocuments({ userId: userId }).exec()
    ])

    const dataIdClean = historyPulls.map(({ _id, ...rest }) => ({
      id: _id.toString(),
      ...rest
    }))

    const lastItemNumber = skip + dataIdClean.length

    return { data: dataIdClean, totalItems, lastItemNumber, page, limit }
  }
}
