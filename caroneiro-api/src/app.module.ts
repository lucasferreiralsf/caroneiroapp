import { Module } from '@nestjs/common';
import { MailerModule } from '@nest-modules/mailer';
import { MulterModule } from '@nestjs/platform-express';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { TravelsModule } from './travels/travels.module';

@Module({
  imports: [
    ConfigModule,
    // MongooseModule.forRootAsync({
    //   useFactory: (configService: ConfigService) => configService.get('database'),
    //   inject: [ConfigService],
    // }),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) =>
        await configService.getFile('mailer'),
      inject: [ConfigService],
    }),
    MulterModule.register({
      dest: '/upload',
      limits: {
        fileSize: 2097152,
      },
    }),
    AuthModule,
    TravelsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
