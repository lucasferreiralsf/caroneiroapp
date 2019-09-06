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
import { AuthService, IAuth } from './auth.service';
import { IUser } from '../users/users.schema';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() payload: IAuth) {
    return await this.authService.login(payload);
  }

  @Post('register')
  async register(@Body() payload: IUser) {
    return await this.authService.register(payload);
  }

  @Get('validate/email/:emailToken')
  async validateEmailToken(@Param('emailToken') emailToken: string) {
    return await this.authService.validateEmailToken(emailToken);
  }

  @Get('validate/phone/:phoneToken')
  async validatePhoneToken(@Param() phoneToken: string) {
    return await this.authService.validatePhoneToken(phoneToken);
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
      res.status(200).json(token);
    } else {
      res.status(403).json({
        code: req.user.status.code,
        message: req.user.status.message,
        data: req.user.data,
      });
    }
  }
}
