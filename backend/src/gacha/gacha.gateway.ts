import { forwardRef, Inject, Logger } from '@nestjs/common'
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
import { GachaUserService } from './gacha-user.service'

@WebSocketGateway({
  cors: {
    origin: ['http://localhost:3000', 'http://localhost:5173'],
    credentials: true
  },
  namespace: 'gacha'
})
export class GachaGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server

  constructor(
    @Inject(forwardRef(() => GachaUserService))
    private readonly gachaUserService: GachaUserService
  ) {}

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

    client.on(
      `get-user-credits-${userId}`,
      async (data: { userId: string; anime: string }) => {
        console.log('Entrado a get user credist ws')
        const dataUser = await this.gachaUserService.getCreditsByAnimeBanner(
          data.userId,
          data.anime
        )
        this.sendCurrentCredits(data.userId, data.anime, dataUser.data.credits)
      }
    )
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

  informCreditRecharge() {
    this.server.emit('credits-recharged', {
      message: 'Créditos recargados a todos los usuarios'
    })
  }

  sendCurrentCredits(userId: string, anime: string, credits: number) {
    this.server.to(`user-${userId}`).emit('user-credits', { credits, anime })
    this.logger.log(
      `Enviando la cantidad actual de creditos (${credits}) al usuario ${userId}`
    )
  }

  isUserConnected(userId: string): boolean {
    return this.connectedClients.has(userId)
  }
}
