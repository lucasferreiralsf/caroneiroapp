import { Controller, Get, Param, Query } from '@nestjs/common';

@Controller('travels')
export class TravelsController {

  @Get()
  async getAll(@Query('page') page?: number, @Query('perPage') perPage?: number) {
    return await this.getAll(page, perPage);
  }
}
