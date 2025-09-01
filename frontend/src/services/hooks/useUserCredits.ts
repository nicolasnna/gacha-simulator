import { useEffect, useState } from 'react'
import { useWebsocketSingleton } from './useWebsocketSingleton'
import axios from 'axios'

export default function useUserCredits() {
  const [credits, setCredits] = useState<number>(0)
  const socket = useWebsocketSingleton()

  useEffect(() => {
    if (!socket) {
      fetchGetCredits()
      return
    }

    socket.on('credits-recharged', () => {
      fetchGetCredits()
    })

    socket.on('user-credits', (data) => {
      setCredits(data.credits)
    })

    return () => {
      socket.off('credits-recharged')
    }
  }, [socket])

  const fetchGetCredits = async () => {
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'localhost:3000'
    try {
      const res = await axios.get(`${BACKEND_URL}/gacha/credits`)
      const data = res.data
      setCredits(data.data.credits)
    } catch (err) {
      console.log(`Error con la obtencion de creditos: ${err}`)
    }
  }

  return { credits }
}
