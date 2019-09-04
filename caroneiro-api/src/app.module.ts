import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HandlebarsAdapter, MailerModule } from '@nest-modules/mailer';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from 'nestjs-config';
import * as path from 'path';

const ENV = process.env.NODE_ENV;
@Module({
  imports: [
    ConfigModule.load(path.resolve(__dirname, '**/!(*.d).config.{ts,js}'), {
      modifyConfigName: name => name.replace('.config', ''),
      // path: path.resolve(
      //   __dirname,
      //   '..',
      //   'environments',
      //   !ENV ? '.env' : `.env.${ENV}`,
      // ),
      path: path.resolve(process.cwd(), 'environments', !ENV ? '.env' : `.env.${ENV}`)
    }),
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => configService.get('database'),
      inject: [ConfigService],
    }),
    MailerModule.forRootAsync({
      useFactory: (configService: ConfigService) => configService.get('mailer'),
      inject: [ConfigService],
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
