import { Injectable } from '@nestjs/common';
import { User } from '../prisma/prisma-client';
import * as bcrypt from 'bcrypt';
import { GenericService } from '../shared/generics/generic-service.generic';
import {
  UsersWithTravelsAndPassengers,
  UsersWithTravelsPassengerPassword,
  AllUsersWithTravelsAndPassengers,
} from './users.fragment';
import { UserCreateDto } from './dto/user-create.dto';
import { UserUpdateDto } from './dto/user-update.dto';
import { removeElementObject } from '../shared/helpers/remove-element-object';
import { ConfigService } from '../config/config.service';
import * as path from 'path';

@Injectable()
export class UsersService extends GenericService<User> {
  constructor(private readonly configService: ConfigService) {
    super();
  }

  async storeUser(user: UserCreateDto) {
    if (user.password) {
      user.password = await bcrypt.hash(user.password, 12);
    }
    const userReduced = removeElementObject(user, [
      'ownerTravels',
      'travelsAsPassenger',
    ]);
    const userCreated = await this.create(
      'createUser',
      {
        ownerTravels: { connect: user.ownerTravels },
        travelsAsPassenger: { connect: user.travelsAsPassenger },
        ...userReduced.objectReduced,
      },
      UsersWithTravelsAndPassengers,
    );
    if (userCreated.password || userCreated.emailToken) {
      userCreated.password = undefined;
      userCreated.emailToken = undefined;
    }
    return userCreated;
  }

  async updateUser(
    field: { email: string } | { primaryPhoneNumber: string } | { id: string },
    user: UserUpdateDto,
  ) {
    const userReduced = removeElementObject(user, [
      'ownerTravels',
      'travelsAsPassenger',
    ]);
    const userUpdated = await this.update(
      'updateUser',
      field,
      {
        ownerTravels: { connect: user.ownerTravels },
        travelsAsPassenger: { connect: user.travelsAsPassenger },
        ...userReduced.objectReduced,
      },
      UsersWithTravelsAndPassengers,
    );
    userUpdated.emailToken = undefined;
    userUpdated.password = undefined;
    return userUpdated;
  }

  async uploadPhoto(picture, id: string) {
    const pathString = `${this.configService.get('HOST_API')}/${picture.path}`;
    return await this.updateUser({ id }, { picture: pathString.replace(/\\/g, '/') });
  }

  async findBy(
    field: { email: string } | { primaryPhoneNumber: string },
    withPassword: boolean = false,
  ) {
    return await this.fetchBy(
      'user',
      field,
      withPassword
        ? UsersWithTravelsPassengerPassword
        : UsersWithTravelsAndPassengers,
    );
  }

  async getAll(currentPage: string, perPage: string) {
    return await this.fetchAll(
      'users',
      currentPage,
      perPage,
      AllUsersWithTravelsAndPassengers,
    );
  }
}
