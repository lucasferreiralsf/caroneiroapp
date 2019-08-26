import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';
import { Provider, AuthService } from '../auth.service';
import { enviroment } from 'src/common/enviroment';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private authService: AuthService) {
    super({
      clientID: enviroment.security.googleClientId,
      clientSecret: enviroment.security.googleClientSecret,
      callbackURL: 'http://localhost:3000/auth/google/callback',
      personFields: [
        'addresses',
        'birthdays',
        'phoneNumbers',
        'names',
        'photos',
      ],
      passReqToCallback: true,
      scope: [
        'profile',
        'https://www.googleapis.com/auth/user.birthday.read',
        'https://www.googleapis.com/auth/user.phonenumbers.read',
        'https://www.googleapis.com/auth/user.addresses.read',
        'email',
      ],
    });
  }

  async validate(
    request: any,
    accessToken: string,
    refreshToken: string,
    profile,
    done: Function,
  ) {
    try {
      console.log(profile);
      // console.log('REQ: ', request);

      const jwt: {} = await this.authService.validateOAuthLogin(
        profile._json,
        Provider.GOOGLE,
      );

      const user = {
        jwt,
      };

      done(null, user);
    } catch (err) {
      // console.log(err)
      done(err, false);
    }
  }
}
