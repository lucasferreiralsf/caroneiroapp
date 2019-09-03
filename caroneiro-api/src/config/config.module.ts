import { Module } from '@nestjs/common';
import { ConfigService } from './config.service';

@Module({
  providers: [
    {
      provide: ConfigService,
      useValue: new ConfigService(`enviroments/${process.env.NODE_ENV || 'default'}.env`),
    },
  ],
  exports: [ConfigService],
})
export class ConfigModule {}
