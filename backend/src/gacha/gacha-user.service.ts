import { CharactersService } from '@/characters/characters.service'
import { UsersService } from '@/users/users.service'
import { Character, CharacterDocument } from '@common/schemas'
import { GachaUser, GachaUserDocument } from '@common/schemas/gacha-user.schema'
import { InjectQueue } from '@nestjs/bull'
import {
  forwardRef,
  Inject,
  Injectable,
  Logger,
  OnModuleInit
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Queue } from 'bull'
import { Model } from 'mongoose'
import { GachaGateway } from './gacha.gateway'
import { rarityOrder } from './helpers/rarity-order.helper'

@Injectable()
export class GachaUserService implements OnModuleInit {
  private readonly logger = new Logger(GachaUserService.name)

  constructor(
    @InjectModel(GachaUser.name)
    private readonly gachaUserModel: Model<GachaUserDocument>,
    private readonly charactersService: CharactersService,
    @InjectQueue('gacha')
    private readonly gachaQueue: Queue,
    @Inject(forwardRef(() => GachaGateway))
    private readonly gachaGateway: GachaGateway,
    @InjectModel(Character.name)
    private readonly characterModel: Model<CharacterDocument>,
    private readonly usersService: UsersService
  ) {}

  async onModuleInit() {
    this.logger.log('Iniciando cron de recarga de creditos')
    await this.gachaQueue.add(
      'recharge-credits',
      {},
      {
        repeat: { cron: '* * * * *' },
        removeOnComplete: true,
        removeOnFail: true
      }
    )
  }

  async setCharacterObtained(userId: string, anime: string, charId: string) {
    const characterUserExist = await this.gachaUserModel.findOne({
      userId,
      animeOrigin: anime,
      'characters.characterId': charId
    })

    if (characterUserExist) {
      const updatedChar = await this.gachaUserModel.findOneAndUpdate(
        {
          userId,
          animeOrigin: anime,
          'characters.characterId': charId
        },
        {
          $inc: { 'characters.$.repeatCount': 1 }
        },
        { new: true }
      )

      return { data: updatedChar }
    }

    const charInfo = await this.charactersService.findById(charId)
    const updatedChar = await this.gachaUserModel.findOneAndUpdate(
      {
        userId,
        animeOrigin: anime
      },
      {
        $push: {
          characters: {
            characterId: charId,
            name: charInfo.data.name,
            rarity: charInfo.data.rarity,
            imgUrl: charInfo.data.imgUrl,
            repeatCount: 0
          }
        }
      },
      { new: true, upsert: true }
    )

    return { data: updatedChar }
  }

  async getCharactersObtained(userId: string, anime: string) {
    const gachaUserDoc = await this.gachaUserModel
      .findOne({
        userId: userId,
        animeOrigin: anime
      })
      .lean()
      .exec()

    if (!gachaUserDoc || !gachaUserDoc.characters) {
      return { data: gachaUserDoc || [] }
    }

    const chars = Array.isArray(gachaUserDoc?.characters)
      ? gachaUserDoc.characters
      : []

    const sortedCharacters = chars.sort(
      (a, b) => rarityOrder.indexOf(a.rarity) - rarityOrder.indexOf(b.rarity)
    ) // Orderer to ssr, sr, r, and c

    return { data: { ...gachaUserDoc, characters: sortedCharacters } }
  }

  async getCharacterRemaining(userId: string, anime: string) {
    try {
      const gachaUser = await this.gachaUserModel
        .findOne({
          userId: userId,
          animeOrigin: anime
        })
        .lean()
        .exec()

      if (!Array.isArray(gachaUser.characters)) return []

      const listCharObtained = gachaUser.characters.map(
        (char) => char.characterId
      )

      const listCharRemaining = await this.characterModel
        .find({ _id: { $nin: listCharObtained }, animeOrigin: anime })
        .lean()
        .exec()

      return listCharRemaining
    } catch (err) {
      this.logger.error(`Error: ${err.message}`)
      throw new Error(err.message)
    }
  }

  async rechargeCreditsToAllUsers() {
    const result = await this.usersService.incrementAllUserCredits(5, 15)
    if (result) this.gachaGateway.informCreditRecharge()
  }
}
