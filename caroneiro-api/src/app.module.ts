import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TripsModule } from './trips/trips.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://mongo/caroneirodb', { useNewUrlParser: true }), TripsModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
