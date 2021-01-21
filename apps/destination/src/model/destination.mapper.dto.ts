import { Injectable } from '@nestjs/common';
import { Destination } from '@tui/domain/documents/destination.document';
import { DestinationDto } from './destination.dto';

@Injectable()
export class DestinationMapperService {
  constructor() {}

  toDto() {
    return (doc: Destination) => <DestinationDto> {
      City: doc.City,
      CountryCode: doc.CountryCode,
      IATACode: doc.IATACode,
      AccuLocationKey: doc.AccuLocationKey, 
    };
  }

  toDoc() {
    return (dto: DestinationDto) => <Destination> {
      City: dto.City,
      CountryCode: dto.CountryCode,
      IATACode: dto.IATACode,
      AccuLocationKey: dto.AccuLocationKey,
    };
  }
}