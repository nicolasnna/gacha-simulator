import SocketSingleton from '@/utils/websocket.singleton'
import { useEffect, useState } from 'react'
import { Socket } from 'socket.io-client'
import { useAppSelector } from './useRedux'

export function useWebsocketSingleton() {
  const [socket, setSocket] = useState<Socket | null>(null)
  const userId = useAppSelector((s) => s.auth.userInfo?.userId)

  useEffect(() => {
    if (!userId) return

    const s = SocketSingleton.getInstance(userId)
    setSocket(s)
  }, [userId])

  return socket
}
