import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import * as mongoose from 'mongoose';
import { MailerService } from '@nest-modules/mailer';
import { UsersService } from '../users/users.service';
import { IUser, UserModel } from '../users/users.schema';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

export interface IAuth extends mongoose.Document {
  readonly email: string;
  readonly password: string;
}

export enum Provider {
  GOOGLE = 'google',
  FACEBOOK = 'facebook',
  LOCAL = 'local',
}

export const STATUSCODE = {
  CREATED_NOT_PHONE_NUMBER: {
    code: 1,
    message: 'User created but he has no phone.',
  },
  CREATED_EMAIL_INVALID: {
    code: 2,
    message: 'User created but his email is invalid.',
  },
};

export interface IGoogleProfileJson {
  sub: string;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  locale: string;
  email: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    private readonly mailerService: MailerService,
  ) {}

  async login(
    credentials: IAuth,
  ): Promise<{ token: string } | { message: string }> {
    const user = await this.userService.findByEmail(credentials.email);

    if (!user) {
      throw new UnauthorizedException();
    }

    if (await !bcrypt.compare(credentials.password, user.password)) {
      throw new UnauthorizedException();
    }

    if (this.validateEmailUser(user)) {
      const payload = {
        id: user.id,
        name: user.firstName,
        email: user.email,
      };

      const token = this.jwtService.sign(payload);
      return { token };
    } else {
      return { message: 'Conta não verificada, email enviado novamente.' };
    }
  }

  async validateOAuthLogin(
    profile: IGoogleProfileJson,
    provider: Provider,
  ): Promise<string | any> {
    if (provider === Provider.GOOGLE) {
      const user = await this.userService.findByEmail(profile.email);
      if (user) {
        if (user.primaryPhoneNumber) {
          const payload = {
            userId: user._id,
            provider,
          };

          const jwt: string = this.jwtService.sign(payload, {
            expiresIn: 3600,
          });

          return { jwt };
        } else {
          return {
            status: STATUSCODE.CREATED_NOT_PHONE_NUMBER,
            data: user,
          };
        }
      } else {
        const use: any = {};
        use.email = profile.email;
        use.emailIsVerified = true;
        use.googleId = profile.sub;
        use.firstName = profile.given_name;
        use.lastName = profile.family_name;

        const userRegistered = await this.userService.store(use);
        return {
          status: 'created',
          data: userRegistered,
        };
      }
    }
    // try {
    //   // You can add some registration logic here,
    //   // to register the user using their thirdPartyId (in this case their googleId)
    //   // let user: IUser = await this.usersService.findOneByThirdPartyId(thirdPartyId, provider);

    //   // if (!user)
    //   // user = await this.usersService.registerOAuthUser(thirdPartyId, provider);

    //   const payload = {
    //     profile.sub,
    //     provider,
    //   };

    //   const jwt: string = this.jwtService.sign(payload, {
    //     expiresIn: 3600,
    //   });
    //   return jwt;
    // } catch (err) {
    //   throw new InternalServerErrorException('validateOAuthLogin', err.message);
    // }
  }

  async register(credentials: IUser): Promise<IUser> {
    try {
      const userCreated = await this.userService.store(credentials);
      if (!userCreated.emailIsVerified) {
        this.sendEmailVerification(userCreated);
      }
      return userCreated;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  validateEmailUser(user: IUser): boolean {
    if (!user.emailIsVerified) {
      this.sendEmailVerification(user);
      return false;
    } else {
      return true;
    }
  }

  sendEmailVerification(user: IUser) {
    const payload = {
      id: user.id,
      name: user.firstName,
      email: user.email,
    };

    const token = this.jwtService.sign(payload, { expiresIn: '2h' });
    this.mailerService.sendMail({
      to: user.email, // sender address
      from: 'lucasferreiralsf@hotmail.com', // list of receivers
      subject: 'Account Confirmation ✔', // Subject line
      template: 'account-confirm',
      // html: `<h1>Bem vindo, seu token é: ${token}</h1>`,
      context: {
        // Data to be sent to template engine.
        token,
        name: `${user.firstName} ${user.lastName}`,
      },
    });
  }
}
