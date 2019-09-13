import { Injectable } from '@nestjs/common';
import {
  TravelCreateInput,
  Travel,
  TravelUpdateInput,
} from '../prisma/prisma-client';
import { prisma } from '../prisma/prisma.service';
import { GenericService } from '../shared/generics/generic-service.generic';
import { removeElementObject } from '../shared/helpers/remove-element-object';

@Injectable()
export class TravelsService extends GenericService<Travel> {
  async getAll(currentPage, perPage) {
    return await this.fetchAll(
      currentPage,
      perPage,
      prisma.travels,
      prisma.travelsConnection,
    );
  }

  async createTravel(travel: TravelCreateInput): Promise<Travel> {
    const travelReduced = removeElementObject(travel, ['travelOwner']);
    return await this.create(prisma.createTravel, {
      travelOwner: { connect: { id: travel.travelOwner}},
      ...travelReduced.objectReduced,
    });
  }

  async updateTravel(
    travelId: number,
    travel: TravelUpdateInput,
  ): Promise<Travel> {
    return await this.update(prisma.updateTravel, travelId, travel);
  }

  async deleteTravel(travelId: number): Promise<Travel> {
    return await this.delete(prisma.deleteTravel, travelId);
  }
}
