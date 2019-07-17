import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  Query,
} from '@nestjs/common';
import { TripsService } from './trips.service';
import { ITrip } from './trips.interface';
import { ObjectID } from 'bson';
import { AuthGuard } from '@nestjs/passport';

@Controller('trips')
export class TripsController {
  constructor(private readonly tripsService: TripsService) {}

  @Get()
  async index(@Query('page') page, @Query('limit') limit) {
    return await this.tripsService.findAll(page, limit);
  }

  @Post()
  // @UseGuards(AuthGuard())
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
