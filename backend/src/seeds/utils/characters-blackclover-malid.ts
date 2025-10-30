import { RarityCharacterEnum } from '@common/enums'
import { CharactersSeederT } from './charactersSeeder.type'

export const charactersBlackClover: CharactersSeederT[] = [
  { mal_id: 124731, rarity: RarityCharacterEnum.SuperSuperRare }, // Asta
  { mal_id: 127141, rarity: RarityCharacterEnum.SuperSuperRare }, // NOELLE
  { mal_id: 150704, rarity: RarityCharacterEnum.SuperSuperRare }, // Mimosa
  { mal_id: 124732, rarity: RarityCharacterEnum.SuperSuperRare }, // Yuno
  { mal_id: 144370, rarity: RarityCharacterEnum.SuperRare }, // Gauche
  { mal_id: 153461, rarity: RarityCharacterEnum.SuperRare }, // Gordon
  { mal_id: 153561, rarity: RarityCharacterEnum.SuperRare }, // Finral
  { mal_id: 146420, rarity: RarityCharacterEnum.SuperRare }, // Vanessa
  { mal_id: 149302, rarity: RarityCharacterEnum.Rare }, // Lily
  { mal_id: 159397, rarity: RarityCharacterEnum.Rare }, // Sol
  { mal_id: 160284, rarity: RarityCharacterEnum.Rare }, // Vetto
  { mal_id: 161825, rarity: RarityCharacterEnum.Rare }, // Kahono
  { mal_id: 178638, rarity: RarityCharacterEnum.Rare }, // Megicula
  { mal_id: 156372, rarity: RarityCharacterEnum.Rare }, // Nebra
  { mal_id: 161727, rarity: RarityCharacterEnum.Common }, // Marco
  { mal_id: 162683, rarity: RarityCharacterEnum.Common }, // Gifso
  { mal_id: 162621, rarity: RarityCharacterEnum.Common }, // Nils
  { mal_id: 158194, rarity: RarityCharacterEnum.Common }, // Alecdora
  { mal_id: 178690, rarity: RarityCharacterEnum.Common }, // Tetia
  { mal_id: 159553, rarity: RarityCharacterEnum.Common } // Valtos
].map((char) => ({
  ...char,
  anime: 'black clover'
}))
