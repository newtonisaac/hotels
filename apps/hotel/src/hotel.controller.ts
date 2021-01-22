import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger'
import { HotelService } from './hotel.service';
import { HotelDto } from './model/hotel.dto';
import { HotelQueryDto } from './model/hotel.query.dto';

@Controller('/hotel')
@ApiTags('hotel')
export class HotelController {
  constructor(private readonly destinationService: HotelService) {}

  @Get()
  public async get(@Query() query: HotelQueryDto): Promise<HotelDto[]> {
    return await this.destinationService.get(query);
  }
}
