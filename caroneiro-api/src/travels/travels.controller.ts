import { Controller, Get, Param, Query, Post, Body, Put, Delete } from '@nestjs/common';
import { TravelsService } from './travels.service';
import { TravelCreateInput, TravelUpdateInput } from '../prisma/prisma-client';
import { UpdateTravelDto } from './dto/update-travel.dto';
import { CreateTravelDto } from './dto/create-travel.dto';

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

  @Get(':id')
  async getById(
    @Param('id') id: string,
  ) {
    return await this.travelService.getById(id);
  }

  @Post()
  async create(@Body() data: CreateTravelDto) {
    return await this.travelService.createTravel(data);
  }

  @Put(':id')
  async update(@Body() data: UpdateTravelDto, @Param('id') id) {
    return await this.travelService.updateTravel(id, data);
  }

  @Delete(':id')
  async delete(@Param() id) {
    return await this.travelService.deleteTravel(id);
  }
}
