import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { CreateCharacterDto } from './dto/create-character.dto'
import { UpdateCharacterDto } from './dto/update-character.dto'
import { InjectModel } from '@nestjs/mongoose'
import { Character, CharacterDocument } from '@common/schemas'
import { Model } from 'mongoose'

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
    banner
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

      const newCharacter = new this.characterModel({
        mal_id: mal_id,
        name: characterData.name,
        nicknames: characterData.nicknames ?? [],
        imgUrl: characterData.images.webp.image_url,
        rarity: rarity,
        banner: banner,
        value: value,
        animeOrigin: characterData.anime[0].anime.title
      })

      const char = await newCharacter.save({ validateBeforeSave: true })

      return char
    } catch (error) {
      throw new InternalServerErrorException({
        message: error?.message || 'Error interno al genererar el personaje'
      })
    }
  }

  async create(charData: CreateCharacterDto) {
    const char = await this._fetchAndGetCharacter({ ...charData })
    return { data: char }
  }

  findAll() {
    return `This action returns all characters`
  }

  findOne(id: number) {
    return `This action returns a #${id} character`
  }

  update(id: number, updateCharacterDto: UpdateCharacterDto) {
    return `This action updates a #${id} character`
  }

  remove(id: number) {
    return `This action removes a #${id} character`
  }
}
