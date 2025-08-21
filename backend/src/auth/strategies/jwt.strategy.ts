import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { JwtPayload } from '../decorators/auth-user.decorator'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET || 'dev_secret',
      ignoreExpiration: false
    })
  }

  validate(payload: JwtPayload) {
    return {
      sub: String(payload.sub),
      email: payload.email,
      role: payload.role,
      superAdmin: !!payload.superAdmin
    }
  }
}
