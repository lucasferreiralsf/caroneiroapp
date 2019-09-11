import { Injectable } from '@nestjs/common';
import { Prisma } from '../prisma/prisma-client';
import configEnv from '../config/environment.config';

export const prisma: Prisma = new Prisma({
  endpoint: `https://prisma.cluster.caroneiroapp.com.br/caroneiro/${
    configEnv.env
  }`,
  secret: configEnv.PRISMA_SECRET,
  debug: configEnv.env === 'prod' ? false : true,
});
