import { PagedResponse } from './paged-response';
import { prisma } from '../../prisma/prisma.service';
import { Prisma } from '../../prisma/prisma-client';
import { InternalServerErrorException } from '@nestjs/common';

export class GenericService<T> {
  // getFn: any;
  // countFn: any;
  // currentPage: any;
  // perPage: any;

  // constructor(currentPage, perPage, getFn, countFn) {
  //   this.getFn = getFn;
  //   this.countFn = countFn;
  //   this.currentPage = currentPage;
  //   this.perPage = perPage;
  // }

  private paginateResponse(
    currentPage: number,
    perPage: number,
    count: number,
    data: T[],
  ): PagedResponse<T> {
    return new PagedResponse(count, currentPage, perPage, data);
  }

  async fetchAll(
    currentPage = 0,
    perPage = 10,
    getFn,
    countFn,
  ): Promise<PagedResponse<T>> {
    const skip = currentPage > 0 ? (currentPage - 1) * perPage : 0;

    const data = await getFn({
      skip,
      first: perPage,
    });

    const count = await countFn()
      .aggregate()
      .count();

    return this.paginateResponse(currentPage, perPage, count, data);
  }

  async create(createFn): Promise<T> {
    try {
      return await createFn();
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
  update() {}
  delete() {}
}
