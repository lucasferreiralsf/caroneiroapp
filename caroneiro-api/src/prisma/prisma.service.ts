import { Injectable } from '@nestjs/common';
import { Prisma } from '../prisma/prisma-client';
import configEnv from '../config/environment.config';
import nestjsConfig from '../config/nestjs.config';

export const prisma = new Prisma({
  endpoint: `https://prisma.cluster.caroneiroapp.com.br/caroneiro/${
    configEnv.env
  }`,
  secret: nestjsConfig.PRISMA_SECRET,
  debug: configEnv.env === 'prod' ? false : true,
});
