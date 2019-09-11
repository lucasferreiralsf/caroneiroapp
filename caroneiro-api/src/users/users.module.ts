import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersSchema } from './users.schema';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [
    // MongooseModule.forFeature([
    //   { name: 'Users', schema: UsersSchema },
    // ]),
    // PrismaModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
