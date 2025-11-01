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

export const charactersHajimeNoIppo: CharactersSeederT[] = [
  { mal_id: 15, rarity: RarityCharacterEnum.SuperSuperRare }, // IPPO
  { mal_id: 845, rarity: RarityCharacterEnum.SuperSuperRare }, // Takamura
  { mal_id: 1821, rarity: RarityCharacterEnum.SuperSuperRare }, // Sendo
  { mal_id: 10446, rarity: RarityCharacterEnum.SuperSuperRare }, // Volg

  { mal_id: 846, rarity: RarityCharacterEnum.SuperRare }, // Aoki
  { mal_id: 847, rarity: RarityCharacterEnum.SuperRare }, // Kimura
  { mal_id: 1817, rarity: RarityCharacterEnum.SuperRare }, // Mashiba
  { mal_id: 5177, rarity: RarityCharacterEnum.SuperRare }, // Date

  { mal_id: 12796, rarity: RarityCharacterEnum.Rare }, // Umezawa
  { mal_id: 1818, rarity: RarityCharacterEnum.Rare }, // Kumi
  { mal_id: 34715, rarity: RarityCharacterEnum.Rare }, // Nekota
  { mal_id: 19736, rarity: RarityCharacterEnum.Rare }, // yamaguchi
  { mal_id: 19267, rarity: RarityCharacterEnum.Rare }, // Mari Iimura

  { mal_id: 15978, rarity: RarityCharacterEnum.Common }, // Yagi
  { mal_id: 28365, rarity: RarityCharacterEnum.Common }, // Oda
  { mal_id: 18831, rarity: RarityCharacterEnum.Common }, // Okita
  { mal_id: 52007, rarity: RarityCharacterEnum.Common }, // Shigeta
  { mal_id: 30130, rarity: RarityCharacterEnum.Common } // Comentador
].map((char) => ({
  ...char,
  anime: 'hajime no ippo'
}))

export const charactersJujutsuKaisen: CharactersSeederT[] = [
  { mal_id: 164471, rarity: RarityCharacterEnum.SuperSuperRare }, // Gojo
  { mal_id: 163847, rarity: RarityCharacterEnum.SuperSuperRare }, // Itadori
  { mal_id: 164470, rarity: RarityCharacterEnum.SuperSuperRare }, // Megumi
  { mal_id: 164472, rarity: RarityCharacterEnum.SuperSuperRare }, // Nobara

  { mal_id: 164473, rarity: RarityCharacterEnum.SuperRare }, // Nanami
  { mal_id: 164482, rarity: RarityCharacterEnum.SuperRare }, // Maki
  { mal_id: 164478, rarity: RarityCharacterEnum.SuperRare }, // Toge
  { mal_id: 168067, rarity: RarityCharacterEnum.SuperRare }, // Yuuta

  { mal_id: 164476, rarity: RarityCharacterEnum.Rare }, // Panda
  { mal_id: 164485, rarity: RarityCharacterEnum.Rare }, // Miwa
  { mal_id: 180766, rarity: RarityCharacterEnum.Rare }, // Mei mei
  { mal_id: 164477, rarity: RarityCharacterEnum.Rare }, // Shouko

  { mal_id: 164474, rarity: RarityCharacterEnum.Common }, // Yaga
  { mal_id: 184441, rarity: RarityCharacterEnum.Common }, // Dagon
  { mal_id: 189222, rarity: RarityCharacterEnum.Common }, // Shigemo
  { mal_id: 186825, rarity: RarityCharacterEnum.Common } // Setsuko
].map((char) => ({ ...char, anime: 'jujutsu kaisen' }))

export const charactersSousouNoFrieren: CharactersSeederT[] = [
  { mal_id: 184947, rarity: RarityCharacterEnum.SuperSuperRare }, // Frieren
  { mal_id: 188176, rarity: RarityCharacterEnum.SuperSuperRare }, // Fern
  { mal_id: 188177, rarity: RarityCharacterEnum.SuperSuperRare }, // Stark

  { mal_id: 206725, rarity: RarityCharacterEnum.SuperRare }, // Ubel
  { mal_id: 196825, rarity: RarityCharacterEnum.SuperRare }, // Eisen
  { mal_id: 187307, rarity: RarityCharacterEnum.SuperRare }, // Flamme
  { mal_id: 196912, rarity: RarityCharacterEnum.SuperRare }, // Sein

  { mal_id: 215250, rarity: RarityCharacterEnum.Rare }, // Denken
  { mal_id: 215301, rarity: RarityCharacterEnum.Rare }, // Sense
  { mal_id: 206722, rarity: RarityCharacterEnum.Rare }, // Aura
  { mal_id: 215254, rarity: RarityCharacterEnum.Rare }, // Linie

  { mal_id: 206724, rarity: RarityCharacterEnum.Common }, // Edel
  { mal_id: 215251, rarity: RarityCharacterEnum.Common }, // Richter
  { mal_id: 215257, rarity: RarityCharacterEnum.Common }, // Granat
  { mal_id: 215261, rarity: RarityCharacterEnum.Common } // Genau
].map((char) => ({ ...char, anime: 'sousou no frieren' }))

export const charactersMalIdsAll = [
  ...charactersNaruto,
  ...charactersBlackClover,
  ...charactersHajimeNoIppo,
  ...charactersJujutsuKaisen,
  ...charactersSousouNoFrieren
]
