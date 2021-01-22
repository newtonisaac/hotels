import { MaxLength, IsNotEmpty, IsString, IsDecimal, IsObject } from 'class-validator';
import { IHotelDistance, IAddress, IContact, IMedium } from '@tui/domain/interfaces/hotel.interface';

export class HotelDto {
  @IsString()
  id: string;
  @IsString()
  Type: string;
  @IsString()
  ExternalHotelId: string;
  @IsString()
  ChainCode: string;
  @IsString()
  DupeId: string;
  @IsString()
  Name: string;
  @IsString()
  Rating: string;
  @IsString()
  CityCode: string;
  @IsString()
  Latitude: number;
  @IsString()
  Longitude: number;
  @IsObject()
  HotelDistance: IHotelDistance;
  @IsObject()
  Address: IAddress;
  @IsObject()
  Contact: IContact;
  @IsObject()
  Amenities: string[];
  @IsObject()
  Media: IMedium[];
  @IsString()
  Description: string;
  @IsString()
  DestinationId: string;
  @IsDecimal()
  AveragePrize?: number;
}