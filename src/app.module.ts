import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TripModule } from './trip/trip.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://mongo:27017/caroneiro'),
    TripModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
