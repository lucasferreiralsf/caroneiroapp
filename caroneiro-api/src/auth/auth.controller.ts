import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Req,
  Res,
  Param,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { UserCreateDto } from '../users/dto/user-create.dto';
import { Auth } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() payload: Auth) {
    return await this.authService.login(payload);
  }

  @Post('register')
  async register(@Body() payload: UserCreateDto) {
    return await this.authService.register(payload);
  }

  @Post('resend-token')
  async resendEmailToken(@Body() payload: { email?: string; phone?: string }) {
    if (payload.phone) {
      return await this.authService.resendPhoneVerification(payload.phone);
    } else {
      return await this.authService.resendEmailVerification(payload.email);
    }
  }

  @Get('validate/email/:emailToken')
  async validateEmailToken(@Param('emailToken') emailToken: string) {
    return await this.authService.validateEmailToken(emailToken);
  }

  @Get('validate/phone/:phone/:token')
  async validatePhoneToken(
    @Param('phone') phone: string,
    @Param('token') token: string,
  ) {
    return await this.authService.validatePhoneToken(phone, token);
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  googleLogin() {
    // initiates the Google OAuth2 login flow
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  googleLoginCallback(@Req() req, @Res() res: Response) {
    // handles the Google OAuth2 callback
    const token: string = req.user.token;
    if (token) {
      res.status(200).json(req.user);
    } else {
      res.status(403).json({
        code: req.user.status.code,
        message: req.user.status.message,
        data: req.user.data,
      });
    }
  }
}
