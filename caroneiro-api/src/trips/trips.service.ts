import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ITrip } from './trips.interface';
import { ObjectID } from 'bson';

@Injectable()
export class TripsService {
  constructor(@InjectModel('Trips') private readonly tripSchema: Model<ITrip>) {}

  async findAll(): Promise<ITrip[]> {
    try {
      return await this.tripSchema.find();
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
