import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, PaginateModel, PaginateResult } from 'mongoose';
import { ITrip } from './trips.interface';
import { ObjectID } from 'bson';

@Injectable()
export class TripsService {
  constructor(
    @InjectModel('Trips') private readonly tripSchema: PaginateModel<ITrip>,
  ) {}

  async findAll(
    page: number = 1,
    limit: number = 10,
  ): Promise<PaginateResult<ITrip>> {
    try {
      const options = {
        populate: [
          // Your foreign key fields to populate
          'tripOwner',
          'tripPassengers.passenger',
        ],
        lean: true,
        leanWithId: true,
        page: Number(page),
        limit: Number(limit),
      };
      return await this.tripSchema.paginate(null, options);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async create(trip: ITrip): Promise<ITrip> {
    try {
      return await this.tripSchema.create(trip);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async update(trip: ITrip): Promise<ITrip> {
    try {
      return await this.tripSchema.findByIdAndUpdate({ _id: trip.id }, trip, {
        new: true,
      });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async delete(tripId: ObjectID): Promise<ITrip> {
    try {
      return await this.tripSchema.findByIdAndDelete({ _id: tripId });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
