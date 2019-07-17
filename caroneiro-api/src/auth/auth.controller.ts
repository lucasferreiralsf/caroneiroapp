import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { IUser } from '../users/users.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() payload: IUser) {
    return await this.authService.login(payload);
  }

  @Post('register')
  async register(@Body() payload: IUser) {
    return await this.authService.register(payload);
  }
}
