import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { TripsService } from './trips.service';
import { ITrip } from './trips.interface';
import { ObjectID } from 'bson';

@Controller('trips')
export class TripsController {
  constructor(private readonly tripsService: TripsService) {}

  @Get()
  async index() {
    return await this.tripsService.findAll();
  }

  @Post()
  async create(@Body() trip: ITrip) {
    return await this.tripsService.create(trip);
  }

  @Put()
  async update(@Body() trip: ITrip) {
    return await this.tripsService.update(trip);
  }

  @Delete(':id')
  async delete(@Param() params) {
    return await this.tripsService.delete(params.id);
  }
}
