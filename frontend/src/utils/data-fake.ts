import type {
  Character,
  CharacterObtained
} from '@/interfaces/character.interface'
import type { User } from '@/interfaces/user.interface'

export const usersFake: User[] = [
  {
    id: 1,
    email: 'superadmin@example.com',
    role: 'superAdmin',
    superAdmin: true,
    active: true,
    createdAt: new Date('2024-01-10T10:20:00Z'),
    updatedAt: new Date('2024-06-01T12:00:00Z'),
    name: 'Alice Root'
  },
  {
    id: 2,
    email: 'user1@example.com',
    role: 'user',
    superAdmin: false,
    active: true,
    createdAt: new Date('2024-02-15T09:00:00Z'),
    updatedAt: new Date('2024-07-05T16:30:00Z'),
    name: 'Bob User'
  },
  {
    id: 3,
    email: 'dev@example.com',
    role: 'developer',
    superAdmin: false,
    active: true,
    createdAt: new Date('2024-03-01T14:45:00Z'),
    updatedAt: new Date('2024-08-10T18:00:00Z'),
    name: 'Charlie Dev'
  },
  {
    id: 4,
    email: 'moderator@example.com',
    role: 'moderator',
    superAdmin: false,
    active: false, // deshabilitado
    createdAt: new Date('2024-04-20T08:15:00Z'),
    updatedAt: new Date('2024-08-12T11:00:00Z'),
    name: 'Diana Mod'
  },
  {
    id: 5,
    email: 'testuser@example.com',
    role: 'user',
    superAdmin: false,
    active: true,
    createdAt: new Date('2024-05-05T20:00:00Z'),
    updatedAt: new Date('2024-08-15T09:30:00Z'),
    name: 'Eve Tester'
  }
]

export const obtainedCharactersFake: CharacterObtained[] = [
  {
    id: 1,
    name: 'Aria Windblade',
    rarity: 'ssr',
    urlImage: 'https://example.com/images/aria.png',
    repeatedCount: 0,
    obtainedAt: new Date('2025-08-01T10:00:00'),
    pullNumber: 1,
    isDuplicate: false
  },
  {
    id: 2,
    name: 'Blaze Pyro',
    rarity: 'sr',
    urlImage: 'https://example.com/images/blaze.png',
    repeatedCount: 0,
    obtainedAt: new Date('2025-08-01T10:05:00'),
    pullNumber: 2,
    isDuplicate: false
  },
  {
    id: 3,
    name: 'Cobalt Shield',
    rarity: 'r',
    urlImage: 'https://example.com/images/cobalt.png',
    repeatedCount: 1,
    obtainedAt: new Date('2025-08-01T10:07:00'),
    pullNumber: 3,
    isDuplicate: true
  },
  {
    id: 4,
    name: 'Dawn Mystic',
    rarity: 'ssr',
    urlImage: 'https://example.com/images/dawn.png',
    repeatedCount: 0,
    obtainedAt: new Date('2025-08-01T10:10:00'),
    pullNumber: 4,
    isDuplicate: false
  },
  {
    id: 5,
    name: 'Elder Oak',
    rarity: 'c',
    urlImage: 'https://example.com/images/elder-oak.png',
    repeatedCount: 2,
    obtainedAt: new Date('2025-08-01T10:12:00'),
    pullNumber: 5,
    isDuplicate: true
  },
  {
    id: 6,
    name: 'Frostbite',
    rarity: 'sr',
    urlImage: 'https://example.com/images/frostbite.png',
    repeatedCount: 0,
    obtainedAt: new Date('2025-08-01T10:15:00'),
    pullNumber: 6,
    isDuplicate: false
  },
  {
    id: 1,
    name: 'Aria Windblade',
    rarity: 'ssr',
    urlImage: 'https://example.com/images/aria.png',
    repeatedCount: 1,
    obtainedAt: new Date('2025-08-01T10:20:00'),
    pullNumber: 7,
    isDuplicate: true
  },
  {
    id: 7,
    name: 'Gale Whisper',
    rarity: 'r',
    urlImage: 'https://example.com/images/gale.png',
    repeatedCount: 0,
    obtainedAt: new Date('2025-08-01T10:22:00'),
    pullNumber: 8,
    isDuplicate: false
  },
  {
    id: 8,
    name: 'Hail Storm',
    rarity: 'c',
    urlImage: 'https://example.com/images/hail.png',
    repeatedCount: 0,
    obtainedAt: new Date('2025-08-01T10:25:00'),
    pullNumber: 9,
    isDuplicate: false
  },
  {
    id: 3,
    name: 'Cobalt Shield',
    rarity: 'r',
    urlImage: 'https://example.com/images/cobalt.png',
    repeatedCount: 2,
    obtainedAt: new Date('2025-08-01T10:27:00'),
    pullNumber: 10,
    isDuplicate: true
  },
  {
    id: 9,
    name: 'Ivy Thorn',
    rarity: 'sr',
    urlImage: 'https://example.com/images/ivy.png',
    repeatedCount: 0,
    obtainedAt: new Date('2025-08-01T10:30:00'),
    pullNumber: 11,
    isDuplicate: false
  },
  {
    id: 10,
    name: 'Jade Fang',
    rarity: 'ssr',
    urlImage: 'https://example.com/images/jade.png',
    repeatedCount: 0,
    obtainedAt: new Date('2025-08-01T10:32:00'),
    pullNumber: 12,
    isDuplicate: false
  },
  {
    id: 2,
    name: 'Blaze Pyro',
    rarity: 'sr',
    urlImage: 'https://example.com/images/blaze.png',
    repeatedCount: 1,
    obtainedAt: new Date('2025-08-01T10:35:00'),
    pullNumber: 13,
    isDuplicate: true
  },
  {
    id: 11,
    name: 'Kite Runner',
    rarity: 'c',
    urlImage: 'https://example.com/images/kite.png',
    repeatedCount: 0,
    obtainedAt: new Date('2025-08-01T10:37:00'),
    pullNumber: 14,
    isDuplicate: false
  },
  {
    id: 12,
    name: 'Lunar Veil',
    rarity: 'r',
    urlImage: 'https://example.com/images/lunar.png',
    repeatedCount: 0,
    obtainedAt: new Date('2025-08-01T10:40:00'),
    pullNumber: 15,
    isDuplicate: false
  }
]

export const characterListFake: Character[] = [
  {
    id: 101,
    name: 'Luna Eclipse',
    rarity: 'ssr',
    urlImage: 'https://example.com/images/luna-eclipse.png',
    repeatedCount: 0
  },
  {
    id: 102,
    name: 'Vortex Blade',
    rarity: 'ssr',
    urlImage: 'https://example.com/images/vortex-blade.png',
    repeatedCount: 2
  },
  {
    id: 103,
    name: 'Shadow Dancer',
    rarity: 'sr',
    urlImage: 'https://example.com/images/shadow-dancer.png',
    repeatedCount: 1
  },
  {
    id: 104,
    name: 'Stormcaller',
    rarity: 'sr',
    urlImage: 'https://example.com/images/stormcaller.png'
  },
  {
    id: 105,
    name: 'Ironclad Guardian',
    rarity: 'r',
    urlImage: 'https://example.com/images/ironclad-guardian.png',
    repeatedCount: 3
  },
  {
    id: 106,
    name: 'Mist Weaver',
    rarity: 'r',
    urlImage: 'https://example.com/images/mist-weaver.png'
  },
  {
    id: 107,
    name: 'Wildfire Archer',
    rarity: 'c',
    urlImage: 'https://example.com/images/wildfire-archer.png'
  },
  {
    id: 108,
    name: 'Frost Spirit',
    rarity: 'c',
    urlImage: 'https://example.com/images/frost-spirit.png',
    repeatedCount: 1
  }
]
