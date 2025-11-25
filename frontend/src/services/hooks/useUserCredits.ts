import { useEffect, useState } from 'react'
import { useAppSelector } from './useRedux'
import { useWebsocketSingleton } from './useWebsocketSingleton'

interface Credits {
  promotional: number
  standard: number
}

export default function useUserCredits() {
  const [credits, setCredits] = useState<Credits>({
    promotional: 0,
    standard: 0
  })
  const socket = useWebsocketSingleton()
  const userId = useAppSelector((s) => s.auth.userInfo?.userId)

  const getCurrentCredits = () => {
    if (!socket) return
    socket.emit(`get-user-credits-${userId}`, { userId })
  }

  useEffect(() => {
    if (!socket || !userId) {
      return
    }

    if (socket.connected) getCurrentCredits()

    socket.on('credits-recharged', () => {
      // fetchGetCredits()
      setTimeout(() => {
        socket.emit(`get-user-credits-${userId}`, { userId })
      }, 1000)
    })

    socket.on('user-credits', (data) => {
      console.log(data)
      setCredits({
        standard: data.creditsStandard,
        promotional: data.creditsPromotional
      })
    })

    return () => {
      socket.off('credits-recharged')
      socket.off('user-credits')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket, userId, socket?.connected])

  return { credits }
}
