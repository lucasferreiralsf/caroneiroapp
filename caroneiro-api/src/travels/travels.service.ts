import { Injectable } from '@nestjs/common';
import {
  TravelCreateInput,
  Travel,
  TravelUpdateInput,
} from '../prisma/prisma-client';
import { GenericService } from '../shared/generics/generic-service.generic';
import { removeElementObject } from '../shared/helpers/remove-element-object';
import { TravelsWithOwnerFragment } from './travels.fragments';
import { UpdateTravelDto } from './dto/update-travel.dto';
import { CreateTravelDto } from './dto/create-travel.dto';
import { RecurrenceTypes } from '../prisma/prisma-client';

@Injectable()
export class TravelsService extends GenericService<Travel> {
  async getAll(currentPage, perPage) {
    return await this.fetchAll(
      'travels',
      currentPage,
      perPage,
      TravelsWithOwnerFragment,
    );
  }

  async getById(id: string) {
    return await this.fetchBy('travel', { id }, TravelsWithOwnerFragment);
  }

  async createTravel(travel: CreateTravelDto): Promise<Travel> {
    const travelReduced = removeElementObject(travel, [
      'travelOwner',
      'passengers',
      'recurrenceType',
    ]);
    return await this.create(
      'createTravel',
      {
        travelOwner: { connect: { id: travel.travelOwner } },
        passengers: { connect: travel.passengers },
        recurrenceType: travel.recurrenceType ? travel.recurrenceType : 'DAILY',
        ...travelReduced.objectReduced,
      },
      TravelsWithOwnerFragment,
    );
  }

  async updateTravel(
    travelId: string,
    travel: UpdateTravelDto,
  ): Promise<Travel> {
    const travelReduced = removeElementObject(travel, [
      'travelOwner',
      'passengers',
      'recurrenceType',
    ]);
    return await this.update(
      'updateTravel',
      { id: travelId },
      {
        recurrenceType: travel.recurrenceType ? travel.recurrenceType : 'DAILY',
        passengers: { connect: travel.passengers },
        ...travelReduced.objectReduced,
      },
      TravelsWithOwnerFragment,
    );
  }

  async deleteTravel(id: string): Promise<Travel> {
    return await this.delete('deleteTravel', id);
  }
}
