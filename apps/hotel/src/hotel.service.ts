import { Injectable } from '@nestjs/common';
import { HotelDataService } from '@tui/domain/services/data/hotel-data.service';
import { HotelDto } from './model/hotel.dto';
import { HotelQueryDto, Sequence } from './model/hotel.query.dto';
import { HotelMapperService } from './model/hotel.mapper.dto';
import { ObjectId } from 'mongoose/lib/types'

@Injectable()
export class HotelService {
  
  constructor(
    private hotelDataService: HotelDataService,
    private mapper: HotelMapperService
  ) { }

  async get(query: HotelQueryDto): Promise<HotelDto[]> {
    const filter: any = {}
    query.id ? filter.id = new ObjectId(query.id) : undefined
    query.destinationId ? filter.DestinationId = new ObjectId(query.destinationId) : undefined
    query.text ? filter.$or = [{ Name: { $regex : `.*${query.text}.*`} }, { Description: { $regex : `.*${query.text}.*`}  }] : undefined
    
    const sort: any = {}
    query.sort ? sort[query.sort.toString()] = (query.sequence == Sequence.DES ? -1 : 1 )  : undefined
    
    return (await this.hotelDataService.model.find(filter).sort(sort)).map(this.mapper.toDto());
  }
}
