import { RarityCharacterEnum } from '@common/enums'
import { CharactersSeederT } from './charactersSeeder.type'

export const charactersNaruto: CharactersSeederT[] = [
  // SSR
  { mal_id: 17, rarity: RarityCharacterEnum.SuperSuperRare }, // Uzumaki, Naruto
  { mal_id: 13, rarity: RarityCharacterEnum.SuperSuperRare }, // Uchiha, Sasuke
  { mal_id: 2423, rarity: RarityCharacterEnum.SuperSuperRare }, // Jiraiya
  { mal_id: 85, rarity: RarityCharacterEnum.SuperSuperRare }, // Hatake, Kakashi
  { mal_id: 53901, rarity: RarityCharacterEnum.SuperSuperRare }, // Madara Uchiha

  // SR
  { mal_id: 145, rarity: RarityCharacterEnum.SuperRare }, // Haruno, Sakura
  { mal_id: 1662, rarity: RarityCharacterEnum.SuperRare }, // Gaara
  { mal_id: 2767, rarity: RarityCharacterEnum.SuperRare }, // Tsunade
  { mal_id: 2455, rarity: RarityCharacterEnum.SuperRare }, // Orochimaru
  { mal_id: 307, rarity: RarityCharacterEnum.SuperRare }, // Might Guy
  { mal_id: 2535, rarity: RarityCharacterEnum.SuperRare }, // Minato Namikaze
  { mal_id: 22893, rarity: RarityCharacterEnum.SuperRare }, // Shisui Uchiha

  // R
  { mal_id: 1555, rarity: RarityCharacterEnum.Rare }, // Hyuuga, Hinata
  { mal_id: 2007, rarity: RarityCharacterEnum.Rare }, // Nara, Shikamaru
  { mal_id: 3495, rarity: RarityCharacterEnum.Rare }, // Inuzuka, Kiba
  { mal_id: 3428, rarity: RarityCharacterEnum.Rare }, // Aburame, Shino
  { mal_id: 2009, rarity: RarityCharacterEnum.Rare }, // Yamanaka, Ino
  { mal_id: 2008, rarity: RarityCharacterEnum.Rare }, // Akimichi, Chouji
  { mal_id: 1694, rarity: RarityCharacterEnum.Rare }, // Hyuuga, Neji
  { mal_id: 4775, rarity: RarityCharacterEnum.Rare }, // Sensei Asuma
  { mal_id: 1901, rarity: RarityCharacterEnum.Rare }, // Sai
  { mal_id: 56691, rarity: RarityCharacterEnum.Rare }, // Mito Uzumaki

  // C
  { mal_id: 306, rarity: RarityCharacterEnum.Common }, // Rock Lee
  { mal_id: 3710, rarity: RarityCharacterEnum.Common }, // Tenten
  { mal_id: 2011, rarity: RarityCharacterEnum.Common }, // Iruka Umino
  { mal_id: 4643, rarity: RarityCharacterEnum.Common }, // Shizune
  { mal_id: 3889, rarity: RarityCharacterEnum.Common }, // Konohamaru
  { mal_id: 809, rarity: RarityCharacterEnum.Common }, // Anko Mitarashi
  { mal_id: 4773, rarity: RarityCharacterEnum.Common }, // Kurenai Yuhi
  { mal_id: 17298, rarity: RarityCharacterEnum.Common }, // Raidou Namiashi
  { mal_id: 3735, rarity: RarityCharacterEnum.Common }, // Genma Shiranui
  { mal_id: 22923, rarity: RarityCharacterEnum.Common }, // Ibiki Morino
  { mal_id: 12563, rarity: RarityCharacterEnum.Common }, // Hanabi Hyuuga
  { mal_id: 22872, rarity: RarityCharacterEnum.Common }, // Omoi
  { mal_id: 4694, rarity: RarityCharacterEnum.Common } // Kankuro
].map((char) => ({ ...char, anime: 'naruto' }))
