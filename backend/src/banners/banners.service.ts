import {
  ConflictException,
  Injectable,
  Logger,
  NotFoundException
} from '@nestjs/common'
import { CreateBannerDto } from './dto/create-banner.dto'
import { UpdateBannerDto } from './dto/update-banner.dto'
import { InjectModel } from '@nestjs/mongoose'
import { Banner, BannerDocument } from '@common/schemas/banner.schema'
import { Model } from 'mongoose'

@Injectable()
export class BannersService {
  private readonly _logger = new Logger(BannersService.name)
  constructor(
    @InjectModel(Banner.name)
    private readonly bannerModel: Model<BannerDocument>
  ) {}

  async create(bannerData: CreateBannerDto) {
    const bannerAnimeExist = await this.bannerModel.exists({
      anime: bannerData.anime
    })
    if (bannerAnimeExist)
      throw new ConflictException('El banner a crear ya existe')

    const newBannerModel = new this.bannerModel({
      ...this.bannerModel
    })

    const newBannerDoc = await newBannerModel.save()

    return { data: newBannerDoc }
  }

  async findAll() {
    const allBanners = await this.bannerModel.find({})
    return { data: allBanners }
  }

  async findOne(id: string) {
    const bannerById = await this.bannerModel.findById(id)
    return { data: bannerById }
  }

  async update(id: string, newDataBanner: UpdateBannerDto) {
    const bannerAnimeExist = await this.bannerModel.findById(id)
    if (!bannerAnimeExist)
      throw new NotFoundException(
        'No se ha encontrado el banner por la id entregada'
      )

    const bannerUpdated = await this.bannerModel
      .findByIdAndUpdate(
        id,
        {
          $set: { ...newDataBanner }
        },
        { new: true }
      )
      .exec()

    return { data: bannerUpdated }
  }

  async remove(id: string) {
    const bannerDoc = await this.bannerModel.findByIdAndDelete(id).exec()

    if (!bannerDoc) throw new NotFoundException('Banner no encontrado')

    return { data: bannerDoc }
  }
}
