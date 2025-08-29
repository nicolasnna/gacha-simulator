import { Logger } from '@nestjs/common'
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'

@WebSocketGateway(80, {
  cors: {
    origin: ['http://localhost:3000', 'http://localhost:5173'],
    credentials: true
  },
  namespace: 'gacha'
})
export class GachaGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server

  private readonly logger = new Logger(GachaGateway.name)
  private connectedClients = new Map<string, Socket>()

  handleConnection(client: Socket) {
    this.logger.log(`Cliente conectado: ${client.id}`)
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Cliente desconectado: ${client.id}`)
    for (const [userId, socket] of this.connectedClients.entries()) {
      if (socket.id === client.id) {
        this.connectedClients.delete(userId)
        break
      }
    }
  }

  @SubscribeMessage('join-user-room')
  handleJoinRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { userId: string }
  ) {
    const { userId } = data
    this.connectedClients.set(userId, client)
    client.join(`user-${userId}`)

    this.logger.log(`Usuario ${userId} se unio a su room`)
    client.emit('room-joined', { userId, message: 'Conectado correctamente' })
  }

  sendPullUpdate(userId: string, data: any) {
    this.server.to(`user-${userId}`).emit('gacha-pull-update', data)
    this.logger.log(`Enviado update a usuario ${userId}`)
  }

  sendPullResult(userId: string, data: any) {
    this.server.to(`user-${userId}`).emit('gacha-pull-completed', data)
    this.logger.log(`Enviando resultado a usuario ${userId}`)
  }

  sendPullError(userId: string, error: any) {
    this.server.to(`user-${userId}`).emit('gacha-pull-error', error)
    this.logger.log(`Enviando error a usuario ${userId} : ${error.message}`)
  }

  isUserConnected(userId: string): boolean {
    return this.connectedClients.has(userId)
  }
}
