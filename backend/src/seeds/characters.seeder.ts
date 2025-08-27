import { CharactersService } from '@/characters/characters.service'
import { Character, CharacterDocument } from '@common/schemas'
import { Injectable, Logger } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { charactersNaruto } from './utils/characters-naruto.helper'
import { ValueCharacterEnum } from '@common/enums'

@Injectable()
export class CharactersSeeder {
  private readonly _logger = new Logger(CharactersSeeder.name)

  constructor(
    @InjectModel(Character.name)
    private readonly characterModel: Model<CharacterDocument>,
    private characterService: CharactersService
  ) {}

  async drop() {
    const malIds = charactersNaruto.map((char) => char.mal_id)
    await this.characterModel.deleteMany({ mal_id: { $in: malIds } }).exec()
    this._logger.warn(
      `The characters with mal_ids: ${malIds.join(', ')} has been deleted`
    )
  }

  async seed() {
    for (const char of charactersNaruto) {
      try {
        const value = ValueCharacterEnum[char.rarity]
        const charInfo = { ...char, value }
        const newChar = await this.characterService.create({ ...charInfo })
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
