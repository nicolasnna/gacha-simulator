import { io, type Socket } from 'socket.io-client'

class SocketSingleton {
  private static instance: Socket | null = null

  static getInstance(userId?: string): Socket {
    if (!SocketSingleton.instance) {
      SocketSingleton.instance = io('http://localhost:3000/gacha', {
        withCredentials: true
      })

      SocketSingleton.instance.on('connect', () => {
        if (userId) {
          SocketSingleton.instance?.emit('join-user-room', { userId })
        }
        console.log('Socket conectado:', SocketSingleton.instance?.id)
      })
    }
    return SocketSingleton.instance
  }

  static disconnect() {
    if (SocketSingleton.instance) {
      SocketSingleton.instance.disconnect()
      SocketSingleton.instance = null
    }
  }
}

export default SocketSingleton
