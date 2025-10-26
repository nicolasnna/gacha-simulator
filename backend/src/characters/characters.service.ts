import { RarityCharacterEnum } from '@common/enums'
import { Character, CharacterDocument } from '@common/schemas'
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { CreateCharacterDto } from './dto/create-character.dto'
import { UpdateCharacterDto } from './dto/update-character.dto'

@Injectable()
export class CharactersService {
  constructor(
    @InjectModel(Character.name)
    private readonly characterModel: Model<CharacterDocument>
  ) {}

  private async _fetchAndGetCharacter({
    mal_id,
    rarity,
    value,
    banners
  }: CreateCharacterDto) {
    const urlApiJikan = `https://api.jikan.moe/v4/characters/${mal_id}/full`

    try {
      const existingCharacter = await this.characterModel
        .findOne({ mal_id: mal_id })
        .exec()
      if (existingCharacter) return existingCharacter.toObject()

      const response = await fetch(urlApiJikan, { method: 'GET' })
      const apiData = await response.json()

      const characterData = apiData.data

      const title = characterData.anime[0].anime.title.split(':')[0] // En caso de que el titlo haga referencia a una variante de la serie principal

      const newCharacter = new this.characterModel({
        mal_id: mal_id,
        name: characterData.name,
        nicknames: characterData.nicknames ?? [],
        imgUrl: characterData.images.webp.image_url,
        rarity: rarity,
        banners: banners,
        value: value,
        animeOrigin: String(title).toLowerCase()
      })

      const char = await newCharacter.save({ validateBeforeSave: true })

      return char
    } catch (error) {
      throw new InternalServerErrorException({
        message: error?.message || 'Error interno al genererar el personaje'
      })
    }
  }

  private async _changeStateChar(id: string, isActive: boolean) {
    const char = await this.characterModel
      .findByIdAndUpdate(
        id,
        {
          $set: { isActive: isActive }
        },
        { new: true }
      )
      .exec()

    if (!char) throw new NotFoundException('Personaje no encontrado')

    const { _id, ...rest } = char.toObject()
    return { id: _id.toString(), ...rest }
  }

  async createByMalId(charData: CreateCharacterDto) {
    const char = await this._fetchAndGetCharacter({ ...charData })
    return { data: char }
  }

  async getAll(page: number = 1, limit: number = 20, anime?: string) {
    if (page < 1 || limit < 1)
      throw new BadRequestException(
        'Parametro page y number deben ser mayores o iguales a 1'
      )
    const skip = (Math.max(page, 1) - 1) * Math.max(limit, 1)

    const filter: any = {}
    if (anime) {
      filter.animeOrigin = anime
    }

    const [chars, totalItems] = await Promise.all([
      this.characterModel
        .find(filter)
        .skip(skip)
        .limit(limit)
        .sort({ rarity: -1 })
        .lean()
        .exec(),
      this.characterModel.find(filter).countDocuments().exec()
    ])

    const charsWithId = chars.map(({ _id, ...rest }) => ({
      id: _id.toString(),
      ...rest
    }))

    const lastItemNumber = skip + chars.length

    return { data: charsWithId, totalItems, lastItemNumber, page, limit }
  }

  async findById(id: string) {
    const char = await this.characterModel.findById(id).exec()

    if (!char) throw new NotFoundException('Id de personaje no encontrado')

    const charObj = char.toObject()
    charObj.id = charObj._id
    delete charObj._id

    return { data: charObj }
  }

  async getRandomByRarity(
    bannerId: string,
    rarity: RarityCharacterEnum,
    count: number
  ) {
    const results = await this.characterModel
      .aggregate([
        {
          $match: {
            rarity: rarity,
            isActive: true,
            banners: bannerId
          }
        },
        { $sample: { size: count } },
        {
          $project: {
            name: 1,
            imgUrl: 1,
            rarity: 1,
            value: 1
          }
        }
      ])
      .exec()

    if (results.length < count) {
      const missing = count - results.length
      const duplicates = []

      for (let i = 0; i < missing; i++) {
        const randomIndex = Math.floor(Math.random() * results.length)
        const duplicate = { ...results[randomIndex] }

        duplicate.isDuplicate = true
        duplicates.push(duplicate)
      }

      results.push(...duplicates)
    }

    return results
  }

  async updateCharGacha(id: string, newCharData: UpdateCharacterDto) {
    const charUpdated = await this.characterModel
      .findByIdAndUpdate(
        id,
        {
          $set: { ...newCharData }
        },
        { new: true }
      )
      .exec()

    if (!charUpdated) throw new NotFoundException('Personaje no encontrado')

    const { _id, ...rest } = charUpdated.toObject()
    return { data: { id: _id.toString(), ...rest } }
  }

  async deactivate(id: string) {
    const charObj = await this._changeStateChar(id, false)
    return { data: charObj }
  }

  async activate(id: string) {
    const charObj = await this._changeStateChar(id, true)
    return { data: charObj }
  }

  remove(id: number) {
    return `This action removes a #${id} character`
  }
}
