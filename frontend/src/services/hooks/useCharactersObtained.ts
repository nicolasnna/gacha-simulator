/* eslint-disable @typescript-eslint/no-explicit-any */
import { type CharacterObtained } from '@/interfaces/character.interface'
import type { RarityType } from '@/interfaces/rarity.interface'
import axios from 'axios'
import { useState } from 'react'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'localhost:3000'

export default function useCharactersObtained() {
  const [chars, setChars] = useState<CharacterObtained[]>([])

  const fetchCharacters = async () => {
    const res = await axios.get(
      `${BACKEND_URL}/gacha/character-obtained?anime=naruto`
    )
    return res.data
  }

  const getCharactersObtained = async () => {
    try {
      const result = await fetchCharacters()
      const charProcessed = result.data.characters.map(
        (char: {
          characterId: any
          name: any
          rarity: string
          imgUrl: any
          repeatCount: any
        }) => ({
          characterId: char.characterId,
          name: char.name,
          rarity: char.rarity as RarityType,
          imgUrl: char.imgUrl,
          repeatCount: char.repeatCount
        })
      )
      setChars(charProcessed)
    } catch (err) {
      console.error(`Error useCharactersObtained: ${err}`)
    }
  }

  return {
    chars,
    getCharactersObtained
  }
}
