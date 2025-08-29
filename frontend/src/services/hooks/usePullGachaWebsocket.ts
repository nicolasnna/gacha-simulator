import type { RarityType } from '@/interfaces/rarity.interface'
import axios from 'axios'
import { useEffect, useRef, useState } from 'react'
import { io, Socket } from 'socket.io-client'
import type { CharPull, UsePullGacha } from './usePullGacha'
import { useAppSelector } from './useRedux'

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
  const socketRef = useRef<Socket | null>(null)
  const userId = useAppSelector((s) => s.auth.userInfo?.userId)

  useEffect(() => {
    if (!userId || socketRef.current !== null) return

    const socket = io('http://localhost:3000/gacha', {
      withCredentials: true
    })

    socketRef.current = socket

    socket.on('connect', () => {
      console.log('Websocket connectado', socket.id)
      socket.emit('join-user-room', { userId })
    })

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
      socket.disconnect()
      socketRef.current = null
    }
  }, [userId])

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
