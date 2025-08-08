import type { Rarity } from './rarity.interface'

export interface Character {
  id: string | number
  name: string
  rarity: Rarity
  urlImage: string
  repeatedCount?: number
}

export interface CharacterObtained extends Character {
  obtainedAt: Date
  pullNumber: number
  isDuplicate: boolean
}
