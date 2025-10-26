import { PullsEnum } from '@common/enums/pulls.enum'
import { GachaPull, GachaPullDocument } from '@common/schemas'
import { Banner, BannerDocument } from '@common/schemas/banner.schema'
import { InjectQueue } from '@nestjs/bull'
import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Queue } from 'bull'
import { Model } from 'mongoose'
import { UserPullDto } from './dto/pull.dto'
import { GachaGateway } from './gacha.gateway'
import { PullHelper } from './helpers/pull.helper'

@Injectable()
export class GachaService {
  private readonly logger = new Logger(GachaService.name)

  constructor(
    @InjectModel(GachaPull.name)
    private readonly gachaPullModel: Model<GachaPullDocument>,
    @InjectModel(Banner.name)
    private readonly bannerModel: Model<BannerDocument>,
    private readonly pullHelper: PullHelper,
    private readonly gachaGateway: GachaGateway,
    @InjectQueue('gacha') private readonly gachaQueue: Queue
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
    const getBannerAnime = await this.bannerModel.findOne({ anime: anime })

    if (!getBannerAnime)
      throw new NotFoundException(
        'No se ha encontrador el banner del anime mencionado'
      )

    if (![PullsEnum.One, PullsEnum.Ten].includes(pulls)) {
      throw new BadRequestException(
        'Los pulls del gacha solo pueden ser 1 o 10'
      )
    }

    const results =
      pulls === PullsEnum.One
        ? await this.pullHelper.singlePull(userId, getBannerAnime)
        : await this.pullHelper.multiPull(userId, getBannerAnime)
    const { currentCredits, ...pullsInfo } = results

    this.gachaGateway.sendCurrentCredits(userId, anime, +currentCredits)

    const newPull = new this.gachaPullModel(pullsInfo)

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
