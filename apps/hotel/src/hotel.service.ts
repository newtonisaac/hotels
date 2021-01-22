import { Injectable } from '@nestjs/common';
import { HotelDataService } from '@tui/domain/services/data/hotel-data.service';
import { HotelDto } from './model/hotel.dto';
import { HotelQueryDto } from './model/hotel.query.dto';
import { HotelMapperService } from './model/hotel.mapper.dto';

@Injectable()
export class HotelService {
  
  constructor(
    private destinationDataService: HotelDataService,
    private mapper: HotelMapperService
  ) { }

  async get(query: HotelQueryDto): Promise<HotelDto[]> {
    const filter: HotelQueryDto = {}
    query.countryCode ? filter.countryCode = query.countryCode : undefined
    return (await this.destinationDataService.model.find()).map(this.mapper.toDto());
  }
}
