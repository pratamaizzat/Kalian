import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { Request } from 'express'

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      ignoreExpiration: false,
      secretOrKey: process.env.SECRET_ACCESS_TOKEN,
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => {
          const access = req?.cookies['access']

          if (!access) {
            return null
          }

          return access
        },
      ]),
    })
  }
}
