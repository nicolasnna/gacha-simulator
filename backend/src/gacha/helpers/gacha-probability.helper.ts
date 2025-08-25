import { RarityCharacterEnum } from '@common/enums'

export type Rates = Record<RarityCharacterEnum, number>

export const BASE_RATES: Rates = {
  [RarityCharacterEnum.SuperSuperRare]: 0.5,
  [RarityCharacterEnum.SuperRare]: 3.0,
  [RarityCharacterEnum.Rare]: 12.0,
  [RarityCharacterEnum.Common]: 84.5
}

export function calculateSinglePullRarity(rate: Rates): RarityCharacterEnum {
  const random = Math.random() * 100
  let cumulative = 0

  for (const [rarity, probs] of Object.entries(rate)) {
    cumulative += probs
    if (random <= cumulative) return rarity as RarityCharacterEnum
  }

  return RarityCharacterEnum.Common
}

export function calculateMultiplePullRarity(
  rate: Rates,
  pulls: number
): Record<RarityCharacterEnum, number> {
  const numberByRarity = {
    [RarityCharacterEnum.SuperSuperRare]: 0,
    [RarityCharacterEnum.SuperRare]: 0,
    [RarityCharacterEnum.Rare]: 0,
    [RarityCharacterEnum.Common]: 0
  }

  for (let pull = 0; pull < pulls; pull++) {
    const rarity = calculateSinglePullRarity(rate)
    numberByRarity[rarity] += 1
  }

  return numberByRarity
}
