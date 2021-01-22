import { Injectable } from '@nestjs/common';
import { Offer } from '@tui/domain/documents/offer.document';
import { OfferDto } from './offer.dto';
import { ObjectId } from 'mongoose/lib/types'

@Injectable()
export class OfferMapperService {
  constructor() {}

  toDto() {
    return (doc: Offer) => <OfferDto> {
      id: doc.id,
      ExternalId: doc.ExternalId,
      RateCode: doc.RateCode,
      Room: {
        Type:  doc.Room?.Type,
        Description: doc.Room?.Description,
      },
      Guests: {
        Adults: doc.Guests?.Adults 
      },
      Price: {
        Currency: doc.Price?.Currency,
        Base: doc.Price?.Base,
        Total: doc.Price?.Total,
      },
      DestinationId: doc.DestinationId,
      HotelId: doc.HotelId,
    };
  }

  toDoc() {
    return (dto: OfferDto) => <Offer> {
      id: dto.id,
      ExternalId: dto.ExternalId,
      RateCode: dto.RateCode,
      Room: {
        Type:  dto.Room?.Type,
        Description: dto.Room?.Description,
      },
      Guests: {
        Adults: dto.Guests?.Adults 
      },
      Price: {
        Currency: dto.Price?.Currency,
        Base: dto.Price?.Base,
        Total: dto.Price?.Total,
      },
      DestinationId: new ObjectId(dto.DestinationId),
      HotelId: new ObjectId(dto.HotelId),
    };
  }
}