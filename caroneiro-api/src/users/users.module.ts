import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TripsOwnerController } from './trips-owner/trips-owner.controller';
import { PassengersController } from './passengers/passengers.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersSchema } from './user.schema';
import { PassengersSchema } from './passengers/passengers.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Users', schema: UsersSchema },
      { name: 'Passengers', schema: PassengersSchema },
    ]),
  ],
  controllers: [UsersController, TripsOwnerController, PassengersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
