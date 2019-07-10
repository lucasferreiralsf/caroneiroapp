import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { InjectModel } from '@nestjs/mongoose';
import { PassportLocalModel } from 'mongoose';
import { debug } from 'console';
import { UserService } from '../user/user.service';
import { IUser } from '../user/interfaces/user.interface';
import { IRegistrationStatus } from './interfaces/registration-status.interface';
import { IJwtPayload } from './interfaces/jwt-payload.interface';
import { CreateUserDto } from '../user/dto/user-create.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    // @InjectModel('User') private readonly userModel: PassportLocalModel<IUser>,
  ) {}

  async register(user: IUser) {
    let status: IRegistrationStatus = {
      success: true,
      message: 'user register',
    };
    /* await this.userModel.register(
      new CreateUserDto({
        firstName: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      }),
      user.password,
      err => {
        if (err) {
          debug(err);
          status = { success: false, message: err };
        }
      },
    ); */
    return status;
  }

  createToken(user) {
    console.log('get the expiration');
    const expiresIn = 3600;
    console.log('sign the token');
    console.log(user);

    const accessToken = jwt.sign(
      {
        id: user.id,
        email: user.username,
        firstname: user.firstName,
        lastname: user.lastName,
      },
      'ILovePokemon',
      { expiresIn },
    );
    console.log('return the token');
    console.log(accessToken);
    return {
      expiresIn,
      accessToken,
    };
  }

  async validateUser(payload: IJwtPayload): Promise<any> {
    return await this.userService.findById(payload.id);
  }
}
