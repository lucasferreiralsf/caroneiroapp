import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { IUser } from '../../users/users.schema';
import { enviroment } from 'src/common/enviroment';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: enviroment.security.secretOrPrivateKey,
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