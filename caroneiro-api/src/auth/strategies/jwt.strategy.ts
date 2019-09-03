import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { IUser } from '../../users/users.schema';
import { ConfigService } from 'src/config/config.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly authService: AuthService, private readonly config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get('SECRET_OR_PRIVATE_KEY'),
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