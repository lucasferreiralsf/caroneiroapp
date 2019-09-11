import { Query, Resolver, Args, Info } from '@nestjs/graphql';
import { User, Prisma } from '../prisma/prisma-client';
// import { PrismaService } from '../prisma/prisma.service';
import { prisma } from '../prisma/prisma.service';

@Resolver()
export class AuthResolver {
  // constructor(private readonly prisma: PrismaService) {}

  @Query('users')
  async getUsers(@Args() args, @Info() info): Promise<User[]> {
    return await prisma.users(args);
  }
}
