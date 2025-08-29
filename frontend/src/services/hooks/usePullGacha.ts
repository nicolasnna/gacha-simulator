import { toaster } from '@/components/ui/toaster'
import type { RarityType } from '@/interfaces/rarity.interface'
import { getErrorMessageAxios } from '@/utils/axios.helper'
import axios from 'axios'
import { useState } from 'react'

export interface CharPull {
  name: string
  rarity: RarityType
  imgUrl: string
  isDuplicate: boolean
}

export default function usePullGacha() {
  const [chars, setChars] = useState<CharPull[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState<boolean>(false)

  const fetchPull = async (count: number, anime: string) => {
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'localhost:3000'
    const res = await axios.post(`${BACKEND_URL}/gacha/pull`, {
      anime: anime,
      pulls: count
    })
    return res.data
  }

  const handlePulls = async (pulls: 1 | 10, anime: string = 'naruto') => {
    setIsLoading(() => true)
    setIsError(() => false)
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
      setIsError(() => true)
      toaster.error({
        title: 'Error al obtener el pull',
        description: getErrorMessageAxios(err)
      })
    } finally {
      setIsLoading(() => false)
    }
  }

  const testPullQueue = async () => {
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'localhost:3000'
    const res = await axios.post(`${BACKEND_URL}/gacha/pull-queue`, {
      anime: 'naruto',
      pulls: 10
    })
    console.log(res.data)
  }

  const handleTenPulls = async (anime?: string) => await handlePulls(10, anime)
  const handleOnePull = async (anime?: string) => await handlePulls(1, anime)

  return {
    chars,
    isLoading,
    handleTenPulls,
    handleOnePull,
    isError,
    testPullQueue
  }
}
