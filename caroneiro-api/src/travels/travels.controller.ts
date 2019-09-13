import { Controller, Get, Param, Query, Post, Body, Put, Delete } from '@nestjs/common';
import { TravelsService } from './travels.service';
import { TravelCreateInput } from '../prisma/prisma-client';

@Controller('travels')
export class TravelsController {
  constructor(private readonly travelService: TravelsService) {}

  @Get()
  async getAll(
    @Query('page') page?: number,
    @Query('perPage') perPage?: number,
  ) {
    return await this.travelService.getAll(page, perPage);
  }

  @Post()
  async create(@Body() data: TravelCreateInput) {
    return await this.travelService.createTravel(data);
  }

  @Put(':id')
  async update(@Body() data: TravelCreateInput, @Param() id) {
    return await this.travelService.updateTravel(id, data);
  }

  @Delete(':id')
  async delete(@Param() id) {
    return await this.travelService.deleteTravel(id);
  }
}
