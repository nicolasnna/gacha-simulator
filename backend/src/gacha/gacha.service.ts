import { CharactersService } from '@/characters/characters.service'
import { RarityCharacterEnum } from '@common/enums'
import { PullsEnum, PullsValueEnum } from '@common/enums/pulls.enum'
import { GachaPull, GachaPullDocument } from '@common/schemas'
import { InjectQueue } from '@nestjs/bull'
import { BadRequestException, Injectable, Logger } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Queue } from 'bull'
import { Model } from 'mongoose'
import { UserPullDto } from './dto/pull.dto'
import {
  BASE_RATES,
  calculateMultiplePullRarity,
  calculateSinglePullRarity
} from './helpers/gacha-probability.helper'
import { GachaUserService } from './gacha-user.service'
import { GachaGateway } from './gacha.gateway'

@Injectable()
export class GachaService {
  private readonly logger = new Logger(GachaService.name)

  constructor(
    @InjectModel(GachaPull.name)
    private readonly gachaPullModel: Model<GachaPullDocument>,
    private charactersService: CharactersService,
    private gachaUserService: GachaUserService,
    private gachaGateway: GachaGateway,
    @InjectQueue('gacha') private gachaQueue: Queue
  ) {}

  async gachaPullQueue({ anime, pulls, userId }: UserPullDto) {
    try {
      const job = await this.gachaQueue.add(
        'gacha-pull',
        { anime, pulls, userId },
        {
          attempts: 3, // Reintentar 3 veces si falla
          backoff: 5000, // Esperar 5 segundos entre intentos
          removeOnComplete: true
        }
      )
      return {
        jobId: job.id,
        message: 'Pull iniciado, revisar jobId'
      }
    } catch (err) {
      throw new Error('Error al añadir el pull a la cola ' + err)
    }
  }

  async gachaPull({ anime, pulls, userId }: UserPullDto) {
    if (![PullsEnum.One, PullsEnum.Ten].includes(pulls)) {
      throw new BadRequestException(
        'Los pulls del gacha solo pueden ser 1 o 10'
      )
    }

    const dataUser = await this.gachaUserService.getCreditsByAnimeBanner(
      userId,
      anime
    )

    let items = []

    if (pulls === PullsEnum.One) {
      if (dataUser.data.credits < (PullsValueEnum.One as number)) {
        throw new BadRequestException('Necesitas 3 creditos para una single')
      }
      const rarity = calculateSinglePullRarity(BASE_RATES)
      items = await this.charactersService.getRandomByRarity(rarity, 1)
    }

    if (pulls === PullsEnum.Ten) {
      if (dataUser.data.credits < (PullsValueEnum.Ten as number)) {
        throw new BadRequestException('Necesitas 25 creditos para una multi')
      }

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

    // update user gacha info
    for (const char of items) {
      await this.gachaUserService.setCharacterObtained(userId, anime, char._id)
    }

    let newCreditsUser
    if (pulls === PullsEnum.One) {
      newCreditsUser = await this.gachaUserService.incCreditValue(
        userId,
        anime,
        -3
      )
    } else {
      newCreditsUser = await this.gachaUserService.incCreditValue(
        userId,
        anime,
        -25
      )
    }
    this.gachaGateway.sendCurrentCredits(userId, anime, newCreditsUser?.credits)

    return await newPull.save({ validateBeforeSave: true })
  }

  async getHistoryPull(page: number = 1, limit: number = 20, userId?: string) {
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
