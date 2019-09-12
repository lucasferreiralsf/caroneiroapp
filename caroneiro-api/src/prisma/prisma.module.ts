import { Module } from '@nestjs/common';
import { Prisma } from './prisma-client';
import { ConfigService } from '../config/config.service';
import { ConfigModule } from '../config/config.module';
// import { PrismaService } from './prisma.service';

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: Prisma,
      useValue: (configService: ConfigService): Prisma =>
        new Prisma({
          endpoint: `https://prisma.cluster.caroneiroapp.com.br/caroneiro/${process
            .env.NODE_ENV || 'default'}`,
          secret: configService.get('PRISMA_SECRET'),
          debug: process.env.NODE === 'prod' ? false : true,
        }),
      inject: [ConfigService],
    },
  ],
  exports: [Prisma],
})
export class PrismaModule {}
