import { Injectable } from '@nestjs/common';
import { Prisma } from '../prisma/prisma-client';
import { ConfigService } from '../config/config.service';
import * as path from 'path';

const configService = new ConfigService(
  path.resolve('environments', `${process.env.NODE_ENV || 'default'}.env`),
);
export const prisma: Prisma = new Prisma({
  endpoint: `https://prisma.cluster.caroneiroapp.com.br/caroneiro/${
    process.env.NODE_ENV || 'default'
  }`,
  secret: configService.get('PRISMA_SECRET'),
  debug: process.env.NODE_ENV === 'prod' ? false : true,
});
