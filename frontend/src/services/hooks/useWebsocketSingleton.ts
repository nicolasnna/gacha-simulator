import { useEffect, useRef, useState } from 'react'
import { Socket } from 'socket.io-client'
import { useAppSelector } from './useRedux'
import SocketSingleton from '@/utils/websocket.singleton'

export function useWebsocketSingleton() {
  const socketRef = useRef<Socket | null>(null)
  const [socket, setSocket] = useState<Socket | null>(null)
  const userId = useAppSelector((s) => s.auth.userInfo?.userId)

  useEffect(() => {
    if (!userId) return

    const s = SocketSingleton.getInstance(userId)
    socketRef.current = s
    setSocket(s)
  }, [userId])

  return socket
}
