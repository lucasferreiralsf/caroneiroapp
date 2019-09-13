import { PagedResponse } from './paged-response.generic';
import { InternalServerErrorException, BadRequestException } from '@nestjs/common';
import { ModelCreateInput, ModelUpdateInput } from './model-create-update.generic';

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

  protected async fetchAll(
    currentPage: any = '1',
    perPage: any = '10',
    getFn,
    countFn,
  ): Promise<PagedResponse<T>> {
    currentPage = Number(currentPage);
    perPage = Number(perPage);
    const skip = currentPage > 1 ? (currentPage - 1) * perPage : 0;

    const data = await getFn({
      skip,
      first: perPage,
    });

    const count = await countFn()
      .aggregate()
      .count();

    return this.paginateResponse(currentPage, perPage, count, data);
  }

  protected async fetchByEmail() {

  }

  protected async create(createFn: any, data: ModelCreateInput): Promise<T> {
    try {
      return await createFn(data);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  protected async update(updateFn: any, id: string | number, data: ModelUpdateInput): Promise<T> {
    try {
      return await updateFn({
        where: id,
        data,
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  protected async delete(deleteFn: any, id: string | number): Promise<T> {
    throw new BadRequestException();
  }
}
