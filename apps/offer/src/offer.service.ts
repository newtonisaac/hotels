import { Injectable } from '@nestjs/common';
import { OfferDataService } from '@tui/domain/services/data/offer-data.service';
import { OfferDto } from './model/offer.dto';
import { OfferQueryDto } from './model/offer.query.dto';
import { OfferMapperService } from './model/offer.mapper.dto';

@Injectable()
export class OfferService {
  
  constructor(
    private destinationDataService: OfferDataService,
    private mapper: OfferMapperService
  ) { }

  async get(query: OfferQueryDto): Promise<OfferDto[]> {
    const filter: OfferQueryDto = {}
    query.countryCode ? filter.countryCode = query.countryCode : undefined
    return (await this.destinationDataService.model.find()).map(this.mapper.toDto());
  }
}
