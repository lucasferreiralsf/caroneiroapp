import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { MailerService } from '@nest-modules/mailer';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CUSTOM_ERROR_CODES } from '../config/custom-error-codes.config';
import { User } from '../prisma/prisma-client';

export interface IAuth {
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
      let user = await this.userService.findByEmail(profile.email);
      if (user) {
        if (!user.googleId) {
          await this.userService.update(user.email, { googleId: profile.sub });
        }
        // if (user.primaryPhoneNumber) {
        
        // } else {
        //   return {
        //     status: STATUSCODE.CREATED_NOT_PHONE_NUMBER,
        //     data: user,
        //   };
        // }
      } else {
        const use: any = {};
        use.email = profile.email;
        use.emailIsVerified = true;
        use.googleId = profile.sub;
        use.firstName = profile.given_name;
        use.lastName = profile.family_name;

        user = await this.userService.store(use);
        // return {
        //   status: STATUSCODE.CREATED_NOT_PHONE_NUMBER,
        //   data: userRegistered,
        // };
      }

      const payload = {
        userId: user.id,
        userEmail: user.email,
      };

      const token: string = this.jwtService.sign(payload, {
        expiresIn: 3600,
      });

      return {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        token,
      };
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

  async register(credentials: User): Promise<User> {
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

  async validateEmailToken(token: string) {
    try {
      const userByToken: any = this.jwtService.verify(token);
      const user = await this.userService.findByEmail(userByToken.email);
      if (user && !user.emailIsVerified) {
        if (user && token === user.emailToken) {
          user.emailIsVerified = true;
          user.id = undefined;
          return await this.userService.update(user.email, {
            emailIsVerified: true,
          });
        } else {
          throw {
            name: CUSTOM_ERROR_CODES.TOKEN_EXPIRED_ERROR.name,
            message:
              'Erro interno, não foi possível validar seu email. Foi enviado um novo token, tente novamente.',
          };
        }
      } else {
        throw {
          name: CUSTOM_ERROR_CODES.EMAIL_VALIDATED.name,
          message: CUSTOM_ERROR_CODES.EMAIL_VALIDATED.message,
        };
      }
    } catch (error) {
      switch (error.name) {
        case CUSTOM_ERROR_CODES.TOKEN_EXPIRED_ERROR.name:
          const user = await this.userService.findByEmail(
            (this.jwtService.decode(token) as any).email,
          );
          user.emailToken = undefined;
          user.password = undefined;
          this.sendEmailVerification(user);
          throw new HttpException(
            {
              status: HttpStatus.FORBIDDEN,
              ...CUSTOM_ERROR_CODES.TOKEN_EXPIRED_ERROR,
            },
            403,
          );

        default:
          throw new HttpException(
            {
              error,
            },
            403,
          );
      }
    }
  }

  // async validatePhoneToken(code) {
  //   try {
  //     // const userByToken: any = this.jwtService.decode(token.toString());
  //     var credential = firebase.auth.PhoneAuthProvider.credential(confirmationResult.verificationId, code);
  //     if (userByToken.email) {
  //       const user = await this.userService.findByEmail(userByToken.email);
  //       if (user) {
  //         user.emailIsVerified = true;
  //         return await this.userService.update(user);
  //       } else {
  //         throw new InternalServerErrorException(
  //           'Erro interno, não foi possível validar seu email. Foi enviado um novo token, tente novamente.',
  //         );
  //       }
  //     } else {
  //       this.sendEmailVerification(userByToken);
  //       throw new InternalServerErrorException(
  //         'Token inválido, foi enviado um novo token.',
  //       );
  //     }
  //   } catch (error) {
  //     throw new InternalServerErrorException(error.message);
  //   }
  // }

  // async sendPhoneVerificationCode(user: User) {
  //   const app: firebase.auth.RecaptchaVerifier = '123';
  //   const confirmationResult = await firebase.auth().signInWithPhoneNumber(phoneNumber, 123);
  //   confirmationResult.verificationId
  // }

  // validatePhoneUser(user: User): boolean {
  //   if(user.primaryPhoneNumberIsVerified) {
  //     this.sendPhoneVerificationCode(user);
  //     return false;
  //   } else {
  //     return true;
  //   }
  // }

  validateEmailUser(user: User): boolean {
    if (!user.emailIsVerified) {
      this.sendEmailVerification(user);
      return false;
    } else {
      return true;
    }
  }

  async resendEmailVerification(email: string) {
    const user = await this.userService.findByEmail(email);
    if (user.email === email) {
      this.sendEmailVerification(user);
      return user;
    } else {
      return 'error';
    }
  }

  async sendEmailVerification(user: User): Promise<void> {
    const payload = {
      id: user.id,
      name: user.firstName,
      email: user.email,
    };

    const token = this.jwtService.sign(payload, { expiresIn: '2h' });
    user.emailToken = token.toString();
    await this.userService.update(user.email, { emailToken: token });
    await this.mailerService.sendMail({
      to: user.email, // sender address
      from: 'no-reply@caroneiroapp.com.br', // list of receivers
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
