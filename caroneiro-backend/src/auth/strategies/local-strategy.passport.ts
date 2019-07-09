import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { IJwtPayload } from '../interfaces/jwt-payload.interface';
import { Model, PassportLocalModel } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { IUser } from '../../user/interfaces/user.interface';
import { UserSchema } from '../../user/schemas/user.schema';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService,
                @InjectModel('User') private readonly userModel: PassportLocalModel<IUser>) {
        super({
            usernameField: 'email',
            passwordField: 'password',
        }, userModel.authenticate());
    }
}