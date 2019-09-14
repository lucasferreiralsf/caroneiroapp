import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { AuthService } from '../auth.service';
// import { ConfigService } from 'nestjs-config';
import { User } from '../../prisma/prisma-client';
import { ConfigService } from '../../config/config.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('SECRET_OR_PRIVATE_KEY'),

    });
  }

  async validate(payload: User) {
    const user = await this.authService.validateEmailUser(payload);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
