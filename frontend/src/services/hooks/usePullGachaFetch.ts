import { toaster } from '@/components/ui/toaster'
import type { RarityType } from '@/interfaces/rarity.interface'
import { getErrorMessageAxios } from '@/utils/axios.helper'
import axios from 'axios'
import { useState } from 'react'
import type { CharPull, UsePullGacha } from './usePullGacha'

export default function usePullGachaFetch(): UsePullGacha {
  const [chars, setChars] = useState<CharPull[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState<boolean>(false)

  const fetchPull = async (count: number, bannerId: string) => {
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'localhost:3000'
    const res = await axios.post(`${BACKEND_URL}/gacha/pull`, {
      bannerId: bannerId,
      pulls: count
    })
    return res.data
  }

  const handlePulls = async (pulls: 1 | 10, bannerId: string) => {
    setIsLoading(() => true)
    setIsError(() => false)
    try {
      const resPull = await fetchPull(pulls, bannerId)
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

  const handleTenPulls = async (bannerId: string) =>
    await handlePulls(10, bannerId)
  const handleOnePull = async (bannerId: string) =>
    await handlePulls(1, bannerId)

  return {
    chars,
    setChars,
    isLoading,
    isError,
    handleTenPulls,
    handleOnePull
  }
}
