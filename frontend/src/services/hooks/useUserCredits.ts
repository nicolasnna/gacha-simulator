import { useEffect, useState } from 'react'
import { useAppSelector } from './useRedux'
import { useWebsocketSingleton } from './useWebsocketSingleton'

export default function useUserCredits() {
  const [credits, setCredits] = useState<number>(0)
  const socket = useWebsocketSingleton()
  const userId = useAppSelector((s) => s.auth.userInfo?.userId)

  useEffect(() => {
    if (!socket || !userId) {
      // socketGetCredits()
      return
    }

    if (socket.connected)
      socket.emit(`get-user-credits-${userId}`, { userId, anime: 'naruto' })

    socket.on('credits-recharged', () => {
      // fetchGetCredits()
      socket.emit(`get-user-credits-${userId}`, { userId, anime: 'naruto' })
    })

    socket.on('user-credits', (data) => {
      setCredits(data.credits)
    })

    return () => {
      socket.off('credits-recharged')
      socket.off('user-credits')
    }
  }, [socket, userId])

  // const fetchGetCredits = async () => {
  //   const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'localhost:3000'
  //   try {
  //     const res = await axios.get(`${BACKEND_URL}/gacha/credits`)
  //     const data = res.data
  //     setCredits(data.data.credits)
  //   } catch (err) {
  //     console.log(`Error con la obtencion de creditos: ${err}`)
  //   }
  // }

  return { credits }
}
