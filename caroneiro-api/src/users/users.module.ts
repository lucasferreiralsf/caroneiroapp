import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { ConfigModule } from '../config/config.module';

@Module({
  imports: [
    // MongooseModule.forFeature([
    //   { name: 'Users', schema: UsersSchema },
    // ]),
    // PrismaModule,
    ConfigModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
