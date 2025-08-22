import type { RarityType } from '@/interfaces/rarity.interface'
import axios from 'axios'
import { useState } from 'react'
import { useAppSelector } from './useRedux'

interface CharPull {
  name: string
  rarity: RarityType
  imgUrl: string
  isDuplicate: boolean
}

export default function usePullGacha() {
  const [chars, setChars] = useState<CharPull[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const userToken = useAppSelector((s) => s.auth.userToken)

  const fetchPull = async (count: number, anime: string) => {
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'localhost:3000'
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userToken}`
      }
    }
    const res = await axios.post(
      `${BACKEND_URL}/gacha/pull`,
      {
        anime: anime,
        pulls: count
      },
      config
    )
    return res.data
  }

  const handlePulls = async (pulls: 1 | 10, anime: string = 'naruto') => {
    setIsLoading(() => true)
    try {
      const resPull = await fetchPull(pulls, anime)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const objCharPull: CharPull[] = resPull.items.map((p: any) => ({
        name: p.name,
        rarity: p.rarity as RarityType,
        imgUrl: p.imgUrl,
        isDuplicate: p.isDuplicate
      }))
      setChars(objCharPull)
    } catch (err) {
      console.log(err)
    } finally {
      setIsLoading(() => false)
    }
  }

  const handleTenPulls = async (anime?: string) => await handlePulls(10, anime)
  const handleOnePull = async (anime?: string) => await handlePulls(1, anime)

  return {
    chars,
    isLoading,
    handleTenPulls,
    handleOnePull
  }
}
