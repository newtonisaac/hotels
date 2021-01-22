import { Injectable } from '@nestjs/common';
import { OfferDataService } from '@tui/domain/services/data/offer-data.service';
import { OfferDto } from './model/offer.dto';
import { OfferQueryDto, Sort, Sequence } from './model/offer.query.dto';
import { OfferMapperService } from './model/offer.mapper.dto';
import { ObjectId } from 'mongoose/lib/types'

@Injectable()
export class OfferService {
  
  constructor(
    private offerDataService: OfferDataService,
    private mapper: OfferMapperService
  ) { }

  async get(query: OfferQueryDto): Promise<OfferDto[]> {
    const filter: any = {}
    query.destinationId ? filter.DestinationId = new ObjectId(query.destinationId) : undefined
    query.hotelId ? filter.HotelId = new ObjectId(query.hotelId) : undefined
    query.text ? filter['Room.Description'] = { $regex : `.*${query.text}.*`} : undefined
    
    const sort: any = {}
    query.sort ? sort[query.sort.toString()] = (query.sequence == Sequence.DES ? -1 : 1 ) : undefined
    
    return (await this.offerDataService.model.find(filter).sort(sort)).map(this.mapper.toDto());
  }
}
