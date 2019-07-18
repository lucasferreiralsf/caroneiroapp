import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TripsModule } from './trips/trips.module';
import { AuthModule } from './auth/auth.module';
import { HandlebarsAdapter, MailerModule } from '@nest-modules/mailer';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://mongo/caroneirodb', {
      useNewUrlParser: true,
    }),
    TripsModule,
    AuthModule,
    MailerModule.forRoot({
      transport: 'smtp://lucasferreiralsf@hotmail.com:Santos09021992@smtp.office365.com',
      defaults: {
        from: '"CaroneiroAPP" <no-replay@caroneiroapp.com.br>',
      },
      template: {
        dir: __dirname + '/templates',
        adapter: new HandlebarsAdapter(), // or new PugAdapter()
        options: {
          strict: true,
        },
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
