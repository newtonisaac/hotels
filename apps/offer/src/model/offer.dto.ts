import { MaxLength, IsNotEmpty, IsString, IsObject } from 'class-validator';
import { IRoom, IGuests, IPrice } from '@tui/domain/interfaces/offer.interface';

export class OfferDto {
  @IsString()
  id: string;
  
  @IsString()
  @IsNotEmpty()
  ExternalId: string;
  
  @IsString()
  @IsNotEmpty()
  RateCode: string;
  
  @IsObject()
  Room: IRoom;
  
  @IsObject()
  Guests: IGuests;
  
  @IsObject()
  Price: IPrice;
  
  @IsString()
  DestinationId: string;
  
  @IsString()
  HotelId: string;
}