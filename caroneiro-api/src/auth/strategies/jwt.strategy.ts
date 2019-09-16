import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { ConfigService } from '../../config/config.service';
import { CUSTOM_HTTP_ERRORS } from '../../shared/exception-filters/custom-http-errors.filter';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('SECRET_OR_PRIVATE_KEY'),
      ignoreExpiration: false,
      passReqToCallback: true,
    });
  }

  async verify(request: Request, payload) {
    if (payload.email) {
      return { userId: payload.id, userEmail: payload.email };
    } else {
      throw new HttpException(
        { ...CUSTOM_HTTP_ERRORS.INVALID_CREDENTIALS },
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
