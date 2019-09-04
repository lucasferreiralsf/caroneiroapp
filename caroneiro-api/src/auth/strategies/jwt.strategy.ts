import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { IUser } from '../../users/users.schema';
import { ConfigService } from 'nestjs-config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly authService: AuthService, private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('nestjs.SECRET_OR_PRIVATE_KEY'),
    });
  }

  async validate(payload: IUser) {
    const user = await this.authService.validateEmailUser(payload);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}