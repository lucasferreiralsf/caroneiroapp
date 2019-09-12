import { Module } from '@nestjs/common';
import { HandlebarsAdapter, MailerModule } from '@nest-modules/mailer';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
// import { ConfigModule, ConfigService } from 'nestjs-config';
import * as path from 'path';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';

const ENV = process.env.NODE_ENV;
@Module({
  imports: [
    // ConfigModule.load(path.resolve(__dirname, '**/!(*.d).config.{ts,js}'), {
    //   modifyConfigName: name => name.replace('.config', ''),
    //   // path: path.resolve(
    //   //   __dirname,
    //   //   '..',
    //   //   // 'environments',
    //   //   !ENV ? 'default.env' : `${ENV}.env`,
    //   // ),
    //   path: path.resolve(
    //     'environments',
    //     !ENV ? 'default.env' : `${ENV}.env`,
    //   ),
    // }),
    ConfigModule,
    // MongooseModule.forRootAsync({
    //   useFactory: (configService: ConfigService) => configService.get('database'),
    //   inject: [ConfigService],
    // }),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => await configService.getFile('mailer'),
      inject: [ConfigService],
    }),
    // MailerModule.forRootAsync({
    //   useFactory: (configService: ConfigService) => ({
    //     transport: configService.get('MAILER_MODULE_TRANSPORT'),
    //   }),
    //   inject: [ConfigService],
    // }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
