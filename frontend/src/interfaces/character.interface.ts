import type { BannerType } from './banner.interface'
import type { RarityType } from './rarity.interface'

export interface Character {
  id: string
  mal_id: number
  name: string
  rarity: RarityType
  imgUrl: string
  nicknames?: string[]
  value: number
  animeOrigin: string
  isActive: boolean
  banner: BannerType
  createdAt?: Date
  updatedAt?: Date
}

export interface CharacterObtained extends Character {
  obtainedAt: Date
  pullNumber: number
  isDuplicate: boolean
}
