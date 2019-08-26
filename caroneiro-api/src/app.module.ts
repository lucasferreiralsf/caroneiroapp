import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HandlebarsAdapter, MailerModule } from '@nest-modules/mailer';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://mongo/caroneiroapp_dev', {
      useNewUrlParser: true,
    }),
    MailerModule.forRoot({
      transport:
        'smtp://lucasferreiralsf@hotmail.com:Santos09021992@smtp.office365.com',
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
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
