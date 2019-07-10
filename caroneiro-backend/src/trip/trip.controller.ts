import { Controller, Body, Get, Post, Param } from '@nestjs/common';
import { TripService } from './trip.service';
import { CreateTripDto } from './dto/trip.dto';
import { ITrip } from '../trip/interfaces/trip.interface';

@Controller('trips')
export class TripController {
    constructor(private readonly tripService: TripService) { }

    @Post()
    async create(@Body() createTripDto: ITrip) {
        return await this.tripService.create(createTripDto);
    }

    @Get()
    async findAll(@Param('page') page: number, @Param('perPage') perPage: number): Promise<ITrip[]> {
        return await this.tripService.findAll(/* page, perPage */);
    }
}
