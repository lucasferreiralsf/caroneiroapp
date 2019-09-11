import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { User, UserCreateInput, UserUpdateInput, Prisma } from '../prisma/prisma-client';
// import { PrismaService } from '../prisma/prisma.service';
import { prisma } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  // constructor(private readonly prisma: PrismaService) {}

  async store(user: UserCreateInput): Promise<User> {
    try {
      const userCreated = await prisma.createUser(user);
      userCreated.password = undefined;
      userCreated.emailToken = undefined;
      return userCreated;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
  
  async update(user: UserUpdateInput): Promise<User> {
    try {
      const userUpdated = await prisma.updateUser({
        where: { email: user.email },
        data: user,
      });
      userUpdated.emailToken = undefined;
      userUpdated.password = undefined;
      return userUpdated;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findByEmail(email: string): Promise<User> {
    try {
      return await prisma.user({ email });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
