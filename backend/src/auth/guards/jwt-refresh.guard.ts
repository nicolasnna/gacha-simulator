import { RedisService } from '@/redis/redis.service'
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { Request, Response } from 'express'

@Injectable()
export class JwtWithRefreshGuard implements CanActivate {
  private readonly logger = new Logger(JwtWithRefreshGuard.name)

  constructor(
    private readonly jwtService: JwtService,
    private readonly redisService: RedisService,
    private readonly configService: ConfigService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>()
    const response = context.switchToHttp().getResponse<Response>()

    const token = this.extractTokenFromHeader(request)

    if (!token) throw new UnauthorizedException('No se ha recibido token')

    this.logger.log(`Token de acceso. ${token}`)
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get('JWT_ACCESS_SECRET')
      })

      request['user'] = payload
      return true
    } catch (err) {
      this.logger.warn(`Token de acceso expirado`)
      if (err.name === 'TokenExpiredError') {
        return await this.handleTokenRefresh(request, response)
      }

      throw new UnauthorizedException('Token invalido')
    }
  }

  private async handleTokenRefresh(
    req: Request,
    res: Response
  ): Promise<boolean> {
    const refresh_token = req.cookies?.refresh_token

    if (!refresh_token)
      throw new UnauthorizedException('No hay refresh token disponible')

    try {
      const refreshPayload = await this.jwtService.verifyAsync(refresh_token, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET')
      })

      const storedRefreshToken = await this.redisService.getRefreshToken(
        refreshPayload.sub
      )

      if (!storedRefreshToken || storedRefreshToken !== refresh_token)
        throw new UnauthorizedException('Refresh token inválido')
      const newAccessToken = this.jwtService.sign({
        sub: refreshPayload.sub,
        email: refreshPayload.email,
        role: refreshPayload.role,
        superAdmin: refreshPayload.superAdmin
      })

      this.logger.log(
        `Nuevo token generado a partir de refresh token. ${newAccessToken}`
      )
      res.setHeader('X-New-Access-Token', newAccessToken)
      req['user'] = refreshPayload
      return true
    } catch {
      throw new UnauthorizedException('Refresh token invalido')
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? []
    return type === 'Bearer' ? token : undefined
  }
}
