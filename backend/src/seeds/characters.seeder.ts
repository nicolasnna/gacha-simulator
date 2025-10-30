import { CharactersService } from '@/characters/characters.service'
import { Character, CharacterDocument } from '@common/schemas'
import { Injectable, Logger } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { ValueCharacterEnum } from '@common/enums'
import { Banner, BannerDocument } from '@common/schemas/banner.schema'
import { bannerList } from './utils/banners'
import { charactersNaruto } from './utils/characters-naruto-malid'

@Injectable()
export class CharactersSeeder {
  private readonly _logger = new Logger(CharactersSeeder.name)

  constructor(
    @InjectModel(Character.name)
    private readonly characterModel: Model<CharacterDocument>,
    private readonly characterService: CharactersService,
    @InjectModel(Banner.name)
    private readonly bannerModel: Model<BannerDocument>
  ) {}

  async drop() {
    const malIds = charactersNaruto.map((char) => char.mal_id)
    await this.characterModel.deleteMany({ mal_id: { $in: malIds } }).exec()
    this._logger.warn(
      `The characters with mal_ids: ${malIds.join(', ')} has been deleted`
    )
    const bannerAnime = bannerList.map((banner) => banner.anime)
    await this.bannerModel.deleteMany({ anime: { $in: bannerAnime } })
    this._logger.warn(
      `The banners with animeName: ${bannerAnime.join(', ')} has been deleted`
    )
  }

  async seed() {
    const bannersCreated = await this.bannerModel.insertMany(bannerList, {
      ordered: false
    })
    this._logger.log('Se ha añadido los banner de la lista en banner.ts')

    for (const char of charactersNaruto) {
      try {
        const value = ValueCharacterEnum[char.rarity]
        const charInfo = { ...char, value }

        const bannersId = bannersCreated
          .filter((b) => b.anime.includes(char.anime))
          .map((banner) => String(banner._id))

        const newChar = await this.characterService.createByMalId({
          ...charInfo,
          banners: bannersId
        })
        // Limitar las peticiones por segundo
        await new Promise((resolve) => setTimeout(resolve, 1000))
        this._logger.log(
          `Added mal_id: ${newChar.data.name}:${newChar.data.mal_id}:${newChar.data.rarity}`
        )
      } catch (err) {
        this._logger.warn(`Is Omiting mal_id: ${char.mal_id} for: ${err}`)
        break
      }
    }
  }
}
