import { Controller, Get, Param, Query } from '@nestjs/common';
import { TravelsService } from './travels.service';

@Controller('travels')
export class TravelsController {
  constructor(private readonly travelService: TravelsService) {}

  @Get(':page?/:perPage?')
  async getAll(
    @Param('page') page?: number,
    @Param('perPage') perPage?: number,
  ) {
    return await this.travelService.getAll(page, perPage);
  }
}
