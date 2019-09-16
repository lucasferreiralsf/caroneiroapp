import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { MailerService } from '@nest-modules/mailer';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import * as twilio from 'twilio';
import { JwtService } from '@nestjs/jwt';
import {
  CUSTOM_HTTP_ERRORS,
  CustomErrors,
} from '../shared/exception-filters/custom-http-errors.filter';
import { User } from '../prisma/prisma-client';
import { UserCreateDto } from '../users/dto/user-create.dto';
import { Auth } from './dto/login.dto';
import { IGoogleProfileJson, Provider, IToken } from './auth.config';
import { VerificationInstance } from 'twilio/lib/rest/verify/v2/service/verification';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    private readonly mailerService: MailerService,
  ) {}

  verifyJwt(jwt: string): boolean {
    const userFromJwt = this.jwtService.verify(jwt);
    if (userFromJwt.email) {
      return true;
    } else {
      return false;
    }
  }

  async login(credentials: Auth): Promise<IToken> {
    const user = await this.userService.findBy(
      { email: credentials.email },
      true,
    );

    if (!user) {
      throw new HttpException(
        { ...CUSTOM_HTTP_ERRORS.INVALID_CREDENTIALS },
        HttpStatus.UNAUTHORIZED,
      );
    }

    if (await !bcrypt.compare(credentials.password, user.password)) {
      throw new HttpException(
        { ...CUSTOM_HTTP_ERRORS.INVALID_CREDENTIALS },
        HttpStatus.UNAUTHORIZED,
      );
    }

    if (this.verifyEmailUser(user) && this.verifyPhoneUser(user)) {
      const payload = {
        id: user.id,
        userEmail: user.email,
      };

      const token = this.jwtService.sign(payload);
      return {
        userId: user.id,
        token,
        userEmail: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      };
    }
  }

  async validateOAuthLogin(
    profile: IGoogleProfileJson,
    provider: Provider,
  ): Promise<IToken> {
    if (provider === Provider.GOOGLE) {
      let user = await this.userService.findBy({ email: profile.email });
      if (user) {
        if (!user.googleId) {
          user = await this.userService.updateUser(
            { email: user.email },
            {
              googleId: profile.sub,
            },
          );
        }

        if (user.primaryPhoneNumber) {
          if (this.verifyPhoneUser(user)) {
            const payload = {
              userId: user.id,
              userEmail: user.email,
            };

            const token: string = this.jwtService.sign(payload, {
              expiresIn: 3600,
            });

            return {
              userId: user.id,
              firstName: user.firstName,
              lastName: user.lastName,
              userEmail: user.email,
              token,
            };
          }
        } else {
          throw new HttpException(
            { ...CUSTOM_HTTP_ERRORS.CREATED_NOT_PHONE_NUMBER },
            HttpStatus.OK,
          );
        }
      } else {
        const use: any = {};
        use.email = profile.email;
        use.emailIsVerified = true;
        use.googleId = profile.sub;
        use.firstName = profile.given_name;
        use.lastName = profile.family_name;
        use.picture = profile.picture;

        user = await this.userService.storeUser(use);
        throw new HttpException(
          { ...CUSTOM_HTTP_ERRORS.CREATED_NOT_PHONE_NUMBER },
          HttpStatus.OK,
        );
      }
    }
  }

  async register(credentials: UserCreateDto): Promise<User> {
    const userCreated = await this.userService.storeUser(credentials);
    if (!userCreated.emailIsVerified) {
      this.sendEmailVerification(userCreated);
    }
    if (!userCreated.primaryPhoneNumberIsVerified) {
      this.sendPhoneVerificationCode(userCreated.primaryPhoneNumber);
    }
    return userCreated;
  }

  async resendPhoneVerification(phone: string): Promise<User> {
    const user = await this.userService.findBy({ primaryPhoneNumber: phone });
    if (user.primaryPhoneNumber === phone) {
      this.sendPhoneVerificationCode(user.primaryPhoneNumber);
      return user;
    } else {
      throw new HttpException(
        CustomErrors.notFound(phone),
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async sendPhoneVerificationCode(
    phone: string,
  ): Promise<VerificationInstance> {
    const app = twilio(
      'AC773cb145735ffdeba44ce8cf7c05f949',
      '191fca18f9ebb4bc68b0c87850c6ec34',
    );
    return app.verify
      .services('VA37120edc4cad0c4d27e00fa31ca479a4')
      .verifications.create({
        to: `+55${phone}`,
        channel: 'sms',
      })
      .then(varification => {
        return varification;
      });
  }

  verifyPhoneUser(user: User): boolean {
    if (!user.primaryPhoneNumberIsVerified) {
      this.sendPhoneVerificationCode(user.primaryPhoneNumber);
      throw new HttpException(
        { ...CUSTOM_HTTP_ERRORS.PHONE_NOT_VALIDATED },
        HttpStatus.BAD_REQUEST,
      );
    } else {
      return true;
    }
  }

  async validatePhoneToken(phone: string, token: string) {
    const app = twilio(
      'AC773cb145735ffdeba44ce8cf7c05f949',
      '191fca18f9ebb4bc68b0c87850c6ec34',
    );
    return (
      app.verify
        .services('VA37120edc4cad0c4d27e00fa31ca479a4')
        .verificationChecks.create({ to: `+55${phone}`, code: token })
        // tslint:disable-next-line: variable-name
        .then(async verification_check => {
          if (verification_check.valid) {
            const user = await this.userService.updateUser(
              { primaryPhoneNumber: phone },
              {
                primaryPhoneNumberIsVerified: true,
              },
            );
            return user;
          } else {
            throw new HttpException(
              {
                ...CUSTOM_HTTP_ERRORS.TOKEN_INVALID,
              },
              HttpStatus.BAD_REQUEST,
            );
          }
        })
    );
  }

  verifyEmailUser(user: User): boolean {
    if (!user.emailIsVerified) {
      this.sendEmailVerification(user);
      throw new HttpException(
        { ...CUSTOM_HTTP_ERRORS.EMAIL_NOT_VALIDATED },
        HttpStatus.BAD_REQUEST,
      );
    } else {
      return true;
    }
  }

  async resendEmailVerification(email: string): Promise<User> {
    const user = await this.userService.findBy({ email });
    if (user.email === email) {
      this.sendEmailVerification(user);
      return user;
    } else {
      throw new HttpException(
        CustomErrors.notFound(email),
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async sendEmailVerification(user: User): Promise<void> {
    const payload = {
      id: user.id,
      email: user.email,
    };

    const token = this.jwtService.sign(payload, { expiresIn: '2h' });
    user.emailToken = token.toString();
    await this.userService.updateUser(
      { email: user.email },
      { emailToken: token },
    );
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

  async validateEmailToken(token: string) {
    const userByToken: any = this.jwtService.verify(token);
    if (userByToken.email) {
      const user = await this.userService.findBy(
        { email: userByToken.email },
        true,
      );
      if (user) {
        if (!user.emailIsVerified) {
          if (token === user.emailToken) {
            user.emailIsVerified = true;
            user.id = undefined;
            return await this.userService.updateUser(
              { email: user.email },
              {
                emailIsVerified: true,
              },
            );
          } else {
            throw new HttpException(
              {
                error: CUSTOM_HTTP_ERRORS.TOKEN_EXPIRED.error,
                message: 'Email token expired. We sent to you a new token.',
              },
              HttpStatus.BAD_REQUEST,
            );
          }
        } else {
          throw new HttpException(
            {
              ...CUSTOM_HTTP_ERRORS.EMAIL_ALREADY_VALIDATED,
            },
            HttpStatus.OK,
          );
        }
      } else {
        throw new HttpException(
          CustomErrors.notFound(userByToken.email),
          HttpStatus.NOT_FOUND,
        );
      }
    } else {
      throw new HttpException(
        {
          error: CUSTOM_HTTP_ERRORS.TOKEN_EXPIRED.error,
          message: 'Email token expired. We sent to you a new token.',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
