import { CharactersService } from '@/characters/characters.service'
import { GachaUser, GachaUserDocument } from '@common/schemas/gacha-user.schema'
import { InjectQueue } from '@nestjs/bull'
import { Injectable, Logger, OnModuleInit } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Queue } from 'bull'
import { Model } from 'mongoose'
import { rarityOrder } from './helpers/rarity-order.helper'
import { GachaGateway } from './gacha.gateway'

@Injectable()
export class GachaUserService implements OnModuleInit {
  private readonly logger = new Logger(GachaUserService.name)

  constructor(
    @InjectModel(GachaUser.name)
    private readonly gachaUserModel: Model<GachaUserDocument>,
    private charactersService: CharactersService,
    @InjectQueue('gacha') private gachaQueue: Queue,
    private gachaGateway: GachaGateway
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

  async rechargeCreditsToAllUsers() {
    try {
      await this.gachaUserModel.updateMany({}, { $inc: { credits: 15 } })
      this.logger.log('Creditos incrementados de todos los usuarios')
      this.gachaGateway.informCreditRecharge()
    } catch (err) {
      console.error(`Error al recargar los creditos de los usuarios: ${err}`)
      throw err
    }
  }

  async getCreditsByAnimeBanner(userId: string, animeOrigin: string) {
    const exist = await this.gachaUserModel
      .findOne({
        userId: userId,
        animeOrigin: animeOrigin
      })
      .lean()
      .exec()

    if (exist) {
      const data = { credits: exist.credits, anime: exist.animeOrigin }

      return { data: data }
    }

    const newGachaUser = new this.gachaUserModel({
      userId,
      animeOrigin
    })

    const newDoc = await newGachaUser.save()

    return { data: { credits: newDoc.credits, anime: newDoc.animeOrigin } }
  }
}
