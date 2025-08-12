import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from '../domain/dto/validateToken.dto'; 

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
      issuer: 'dnc_hotel',
      audience: 'users',
    });
  }

  async validate(payload: JwtPayload) {
    // This object will be attached to req.user in controllers
    return payload;
  }
}