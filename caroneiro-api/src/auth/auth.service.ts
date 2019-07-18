import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { IUser } from '../users/users.interface';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { MailerService } from '@nest-modules/mailer';
import { IAuth } from './auth.interface';

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

    if (this.validateUser(user)) {
      const payload = {
        id: user.id,
        name: user.firstName,
        email: user.email,
      };

      const token = this.jwtService.sign(payload);
      return { token };
    } else {
      return {message: 'Conta não verificada, email enviado novamente.'};
    }
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

  validateUser(user: IUser): boolean {
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
