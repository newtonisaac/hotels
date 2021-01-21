import { Injectable } from '@nestjs/common';
import { DestinationDataService } from '@tui/domain/services/data/destination-data.service';
import { Destination } from '@tui/domain/documents/destination.document';
import { DestinationDto } from './model/destination.dto';
import { DestinationQueryDto } from './model/destination.query.dto';
import { DestinationMapperService } from './model/destination.mapper.dto';

@Injectable()
export class DestinationService {
  
  constructor(
    private destinationDataService: DestinationDataService,
    private mapper: DestinationMapperService
  ) { }

  async get(query: DestinationQueryDto): Promise<DestinationDto[]> {
    const filter: DestinationQueryDto = {}
    query.countryCode ? filter.countryCode = query.countryCode : undefined
    return (await this.destinationDataService.model.find()).map(this.mapper.toDto());
  }
}
