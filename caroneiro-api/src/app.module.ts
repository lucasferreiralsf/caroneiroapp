import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HandlebarsAdapter, MailerModule } from '@nest-modules/mailer';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        uri: config.get('MONGODB_URI'),
        useNewUrlParser: true,
        user: config.get('MONGODB_USER'),
        pass: config.get('MONGODB_PASS'),
      }),
      inject: [ConfigService],
    }),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        transport: config.get('MAILER_MODULE_TRANSPORT'),
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
      inject: [ConfigService],
    }),
    AuthModule,
    ConfigModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
