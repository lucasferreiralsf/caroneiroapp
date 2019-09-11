import { Module } from '@nestjs/common';
import { ConfigService } from 'nestjs-config';
import { Prisma } from './prisma-client';
// import { PrismaService } from './prisma.service';

@Module({
  imports: [],
  providers: [
    // {
    //   provide: PrismaService,
    //   useFactory: (config: ConfigService) =>
    //     new Prisma({
    //       endpoint: `https://prisma.cluster.caroneiroapp.com.br/caroneiro/${config.get(
    //         'environment.env',
    //       )}`,
    //       secret: config.get('nestjs.PRISMA_SECRET'),
    //       debug: config.get('environment.env') === 'prod' ? false : true,
    //     }),
    //   inject: [ConfigService],
    // },
  ],
  exports: [],
})
export class PrismaModule {}
