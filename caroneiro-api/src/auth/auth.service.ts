import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { IUser } from '../users/users.interface';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(credentials: IUser): Promise<{ token: string }> {
    const user = await this.userService.findByEmail(credentials.email);

    if (!user) {
      throw new UnauthorizedException();
    }

    if (await !bcrypt.compare(credentials.password, user.password)) {
      throw new UnauthorizedException();
    }

    const payload = {
      id: user.id,
      name: user.firstName,
      email: user.email,
    };

    const token = this.jwtService.sign(payload);
    return { token };
  }

  async register(credentials: IUser): Promise<IUser> {
    try {
      return await this.userService.store(credentials);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async validateUser(user: IUser): Promise<IUser> {
    try {
      return await this.userService.findByEmail(user.email);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
