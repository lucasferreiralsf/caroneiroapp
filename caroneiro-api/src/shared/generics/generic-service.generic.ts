import { PagedResponse } from './paged-response.generic';
import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import {
  ModelCreateInput,
  ModelUpdateInput,
} from './model-create-update.generic';
import { prisma } from '../../prisma/prisma.service';

export class GenericService<T> {
  private paginateResponse(
    currentPage: number,
    perPage: number,
    count: number,
    data: T[],
  ): PagedResponse<T> {
    return new PagedResponse(count, currentPage, perPage, data);
  }

  protected async fetchAll(
    resource: string,
    currentPage: any = '1',
    perPage: any = '10',
    fragment?: string,
  ): Promise<PagedResponse<T>> {
    currentPage = Number(currentPage);
    perPage = Number(perPage);
    const skip = currentPage > 1 ? (currentPage - 1) * perPage : 0;

    const data = fragment
      ? await prisma[resource]({
          skip,
          first: perPage,
        }).$fragment(fragment)
      : await prisma[resource]({
          skip,
          first: perPage,
        });

    const count = await prisma[`${resource}Connection`]()
      .aggregate()
      .count();

    return this.paginateResponse(currentPage, perPage, count, data);
  }

  protected async fetchBy(resource: string, fetchField: {}, fragment?: string) {
    try {
      const fetch = fragment
        ? await prisma[resource](fetchField).$fragment(fragment)
        : await prisma[resource](fetchField);
      if (fetch) {
        return fetch;
      } else {
        throw new NotFoundException(
          `The resource ${Object.values(fetchField)} not found.`,
          'Not found.',
        );
      }
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  protected async create(
    resource: string,
    data: ModelCreateInput,
    fragment?: string,
  ): Promise<T> {
    try {
      return fragment
        ? await prisma[resource](data).$fragment(fragment)
        : await prisma[resource](data);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  protected async update(
    resource: any,
    field: {},
    updatedData: ModelUpdateInput,
    fragment?: string,
  ): Promise<T> {
    try {
      return fragment
        ? await prisma[resource]({
            where: field,
            data: updatedData,
          }).$fragment(fragment)
        : await prisma[resource]({
            where: field,
            data: updatedData,
          });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  protected async delete(resource: any, field: {}): Promise<T> {
    try {
      return await prisma[resource](field);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
