import type { RarityType } from '@/interfaces/rarity.interface'
import axios from 'axios'
import { useEffect, useState } from 'react'
import type { CharPull, UsePullGacha } from './usePullGacha'
import { useWebsocketSingleton } from './useWebsocketSingleton'

interface PullUpdate {
  jobId: string
  status: 'processing' | 'completed' | 'failed'
  message: string
  progress?: number
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  result?: any
  error?: string
}

export default function usePullGachaWebsocket(): UsePullGacha {
  const [chars, setChars] = useState<CharPull[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState<boolean>(false)
  const socket = useWebsocketSingleton()

  useEffect(() => {
    if (!socket) return

    socket.on('gacha-pull-update', () => {
      setChars([])
      setIsLoading(() => true)
    })

    socket.on('gacha-pull-completed', (data: PullUpdate) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const objCharPull: CharPull[] = data.result.items.map((p: any) => ({
        name: p.name,
        rarity: p.rarity as RarityType,
        imgUrl: p.imgUrl,
        isDuplicate: p.isDuplicate
      }))
      setChars(objCharPull)
      setIsLoading(() => false)
    })

    socket.on('gacha-pull-error', (err) => {
      console.error(`Error websocket: ${err}`)
      setChars([])
      setIsError(true)
      setIsLoading(() => false)
    })

    return () => {
      socket.off('gacha-pull-update')
      socket.off('gacha-pull-completed')
      socket.off('gacha-pull-error')
    }
  }, [socket])

  const handlePullQueue = async (count: 1 | 10, anime: string = 'naruto') => {
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'localhost:3000'
    await axios.post(`${BACKEND_URL}/gacha/pull-queue`, {
      anime: anime,
      pulls: count
    })
  }

  const handleOnePull = async (anime?: string) =>
    await handlePullQueue(1, anime)
  const handleTenPulls = async (anime?: string) =>
    await handlePullQueue(10, anime)

  return {
    chars,
    setChars,
    isLoading,
    isError,
    handleOnePull,
    handleTenPulls
  }
}
