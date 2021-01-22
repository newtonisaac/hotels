import * as mongoose from 'mongoose'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IHotel, IHotelDistance, IAddress, IContact, IMedium } from '../interfaces/hotel.interface';

@Schema()
export class Hotel extends Document implements IHotel {
  @Prop()
  Type: string;

  @Prop()
  ExternalHotelId: string;
  
  @Prop()
  ChainCode: string;
  
  @Prop()
  DupeId: string;
  
  @Prop()
  Name: string;
  
  @Prop()
  Rating: string;
  
  @Prop()
  CityCode: string;
  
  @Prop()
  Latitude: number;
  
  @Prop()
  Longitude: number;
  
  @Prop({ type: mongoose.Schema.Types.Mixed })
  HotelDistance: IHotelDistance;

  @Prop({ type: mongoose.Schema.Types.Mixed })
  Address: IAddress;
  
  @Prop({ type: mongoose.Schema.Types.Mixed })
  Contact: IContact;

  Amenities: string[];
  @Prop({ type: mongoose.Schema.Types.Mixed })
  Media: IMedium[];

  @Prop()
  Description: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'destinations' })
  DestinationId: string;

  @Prop()
  AveragePrize?: number;
}

export const HotelSchema = SchemaFactory.createForClass(Hotel);
