import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ITrip } from './interfaces/trip.interface';
import { CreateTripDto } from './dto/trip.dto';

@Injectable()
export class TripService {
    constructor(@InjectModel('Trip') private readonly tripModel: Model<ITrip>) { }

    async create(createTripDto: CreateTripDto): Promise<ITrip> {
        const createdCat = new this.tripModel(createTripDto);
        return await createdCat.save();
    }

    async findAll(page: number = 1, perPage: number = 10): Promise<ITrip[]> {
        return await this.tripModel.find().limit(perPage).skip(perPage * page).exec();
    }
}
