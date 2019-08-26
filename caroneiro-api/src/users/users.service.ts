import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUser } from './users.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('Users') private readonly userSchema: Model<IUser>,
  ) {}

  async store(user: IUser): Promise<IUser> {
    try {
      const userCreated = await this.userSchema.create(user);
      userCreated.password = undefined;
      return userCreated;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findByEmail(email: string): Promise<IUser> {
    try {
      return await this.userSchema.findOne({ email }).select('+password');
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
