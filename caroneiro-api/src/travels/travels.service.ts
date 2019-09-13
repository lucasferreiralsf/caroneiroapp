import { Injectable, InternalServerErrorException } from '@nestjs/common';
import {
  TravelCreateInput,
  Travel,
  TravelUpdateInput,
} from '../prisma/prisma-client';
import { prisma } from '../prisma/prisma.service';
import { PagedResponse } from '../shared/generics/paged-response';
import { GenericService } from '../shared/generics/generic-service';

@Injectable()
export class TravelsService extends GenericService<Travel> {

  async getAll(currentPage, perPage) {
    return await this.fetchAll(currentPage, perPage, prisma.travels, prisma.travelsConnection);
  }
  // async getAll(
  //   currentPage: number = 0,
  //   perPage: number = 10,
  // ): Promise<PagedResponse<Travel>> {
  //   const skip = currentPage > 0 ? (currentPage - 1) * perPage : 0;
  //   const data = await prisma.travels({
  //     skip,
  //     first: perPage,
  //   });

  //   const count = await prisma.travelsConnection().aggregate().count();
  //   return new PagedResponse(
  //     count,
  //     currentPage,
  //     perPage,
  //     data,
  //   );
  // }

  async createTravel(travel: TravelCreateInput): Promise<Travel> {
    try {
      return await prisma.createTravel(travel);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async updateTravel1(
    travelId: number,
    travel: TravelUpdateInput,
  ): Promise<Travel> {
    try {
      return await prisma.updateTravel({
        data: travel,
        where: { id: travelId },
      });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
