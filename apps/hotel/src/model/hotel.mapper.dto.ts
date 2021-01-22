import { Injectable } from '@nestjs/common';
import { Hotel } from '@tui/domain/documents/hotel.document';
import { IMedium } from '@tui/domain/interfaces/hotel.interface';
import { HotelDto } from './hotel.dto';
import { ObjectId } from 'mongoose/lib/types'

@Injectable()
export class HotelMapperService {
  constructor() {}

  toDto() {
    return (doc: Hotel) => <HotelDto> {
      id: doc.id,
      Type: doc.Type,
      ExternalHotelId: doc.ExternalHotelId,
      ChainCode: doc.ChainCode,
      DupeId: doc.DupeId,
      Name: doc.Name,
      Rating: doc.Rating,
      CityCode: doc.CityCode,
      Latitude: doc.Latitude,
      Longitude: doc.Longitude,
      HotelDistance: { 
        Distance: doc.HotelDistance?.Distance,
        DistanceUnit: doc.HotelDistance?.DistanceUnit
      },
      Address: {
        Lines: doc.Address?.Lines,
        CityName: doc.Address?.CityName,
        CountryCode: doc.Address?.CountryCode,
        PostalCode: doc.Address?.PostalCode,    
      },
      Contact: {
        Phone: doc.Contact?.Phone,
        Fax: doc.Contact?.Fax,
      },
      Amenities: doc.Amenities,
      Media: doc.Media?.map(m => <IMedium>{
        Uri: m.Uri,
        Category: m.Category,    
      }),
      Description: doc.Description,
      DestinationId: doc.DestinationId,
      AveragePrize: doc.AveragePrize,
    };
  }

  todto() {
    return (dto: HotelDto) => <Hotel> {
      id: new ObjectId(dto.id),
      Type: dto.Type,
      ExternalHotelId: dto.ExternalHotelId,
      ChainCode: dto.ChainCode,
      DupeId: dto.DupeId,
      Name: dto.Name,
      Rating: dto.Rating,
      CityCode: dto.CityCode,
      Latitude: dto.Latitude,
      Longitude: dto.Longitude,
      HotelDistance: { 
        Distance: dto.HotelDistance?.Distance,
        DistanceUnit: dto.HotelDistance?.DistanceUnit
      },
      Address: {
        Lines: dto.Address?.Lines,
        CityName: dto.Address?.CityName,
        CountryCode: dto.Address?.CountryCode,
        PostalCode: dto.Address?.PostalCode,    
      },
      Contact: {
        Phone: dto.Contact?.Phone,
        Fax: dto.Contact?.Fax,
      },
      Amenities: dto.Amenities,
      Media: dto.Media?.map(m => <IMedium>{
        Uri: m.Uri,
        Category: m.Category,    
      }),
      Description: dto.Description,
      DestinationId: new ObjectId(dto.DestinationId)
    };
  }
}