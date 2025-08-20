import { CharactersService } from '@/characters/characters.service'
import {
  BannerEnum,
  RarityCharacterEnum,
  ValueCharacterEnum
} from '@common/enums'
import { Character, CharacterDocument } from '@common/schemas'
import { Injectable, Logger } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

@Injectable()
export class CharactersSeeder {
  private readonly _logger = new Logger(CharactersSeeder.name)

  constructor(
    @InjectModel(Character.name)
    private readonly characterModel: Model<CharacterDocument>,
    private characterService: CharactersService
  ) {}

  private readonly charactersScrapping: {
    mal_id: number
    rarity: RarityCharacterEnum
    value: ValueCharacterEnum
    banner: BannerEnum
  }[] = [
    {
      mal_id: 14,
      rarity: RarityCharacterEnum.SuperSuperRare,
      value: ValueCharacterEnum.SSuperRare,
      banner: BannerEnum.Standard
    },
    {
      mal_id: 13,
      rarity: RarityCharacterEnum.SuperSuperRare,
      value: ValueCharacterEnum.SSuperRare,
      banner: BannerEnum.Standard
    },
    {
      mal_id: 85,
      rarity: RarityCharacterEnum.SuperSuperRare,
      value: ValueCharacterEnum.SSuperRare,
      banner: BannerEnum.Standard
    },
    {
      mal_id: 17,
      rarity: RarityCharacterEnum.SuperRare,
      value: ValueCharacterEnum.SuperRare,
      banner: BannerEnum.Standard
    },
    {
      mal_id: 145,
      rarity: RarityCharacterEnum.SuperRare,
      value: ValueCharacterEnum.SuperRare,
      banner: BannerEnum.Standard
    },
    {
      mal_id: 2174,
      rarity: RarityCharacterEnum.SuperRare,
      value: ValueCharacterEnum.SuperRare,
      banner: BannerEnum.Standard
    },
    {
      mal_id: 17312,
      rarity: RarityCharacterEnum.Rare,
      value: ValueCharacterEnum.Rare,
      banner: BannerEnum.Standard
    },
    {
      mal_id: 3052,
      rarity: RarityCharacterEnum.Rare,
      value: ValueCharacterEnum.Rare,
      banner: BannerEnum.Standard
    },
    {
      mal_id: 3735,
      rarity: RarityCharacterEnum.Rare,
      value: ValueCharacterEnum.Rare,
      banner: BannerEnum.Standard
    },
    {
      mal_id: 2766,
      rarity: RarityCharacterEnum.Common,
      value: ValueCharacterEnum.Common,
      banner: BannerEnum.Standard
    },
    {
      mal_id: 10791,
      rarity: RarityCharacterEnum.Common,
      value: ValueCharacterEnum.Common,
      banner: BannerEnum.Standard
    },
    {
      mal_id: 15081,
      rarity: RarityCharacterEnum.Common,
      value: ValueCharacterEnum.Common,
      banner: BannerEnum.Standard
    }
  ]

  async fetchAndSaveCharacter(
    mal_id: number,
    rarity: RarityCharacterEnum,
    value: ValueCharacterEnum
  ) {
    const urlApiJikan = `https://api.jikan.moe/v4/characters/${mal_id}/full`

    try {
      const existingCharacter = await this.characterModel.findOne({
        mal_id: mal_id
      })

      if (existingCharacter)
        return this._logger.warn(
          `Personaje existente: ${existingCharacter.name}`
        )

      const response = await fetch(urlApiJikan, { method: 'GET' })
      const apiData = await response.json()

      if (!apiData.data) {
        return this._logger.warn(
          `No se ha logrado obtener el personaje con el id ${mal_id}`
        )
      }

      const characterData = apiData.data

      const newCharacter = new this.characterModel({
        mal_id: mal_id,
        name: characterData.name,
        nicknames: characterData.nicknames ?? [],
        imgUrl: characterData.images.webp.image_url,
        rarity: rarity,
        banner: BannerEnum.Standard,
        value: value,
        animeOrigin: characterData.anime[0].anime.title
      })

      await newCharacter.save()

      this._logger.log(
        `Personaje ${characterData.name}:${mal_id}:${rarity} guardado correctamente`
      )
    } catch (error) {
      this._logger.error(error)
      throw new Error('Error al obtener información de la api JIKAN')
    }
  }

  async drop() {
    const malIds = this.charactersScrapping.map((char) => char.mal_id)
    await this.characterModel.deleteMany({ mal_id: { $in: malIds } }).exec()
    this._logger.warn(
      `The characters with mal_ids: ${malIds.join(', ')} has been deleted`
    )
  }

  async seed() {
    for (const char of this.charactersScrapping) {
      try {
        const newChar = await this.characterService.create({ ...char })
        // Limitar las peticiones por segundo
        await new Promise((resolve) => setTimeout(resolve, 1000))
        this._logger.log(
          `Added mal_id: ${newChar.data.name}:${newChar.data.mal_id}:${newChar.data.rarity}`
        )
      } catch {
        this._logger.warn(`Is Omiting mal_id: ${char.mal_id}`)
      }
    }
  }
}
