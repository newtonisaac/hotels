import * as mongoose from 'mongoose'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IOffer, IRoom, IGuests, IPrice } from '../interfaces/offer.interface';

@Schema()
export class Offer extends Document implements IOffer {
  @Prop()
  ExternalId: string;
  
  @Prop()
  RateCode: string;
  
  @Prop({ type: mongoose.Schema.Types.Mixed })
  Room: IRoom;
  
  @Prop({ type: mongoose.Schema.Types.Mixed })
  Guests: IGuests;
  
  @Prop({ type: mongoose.Schema.Types.Mixed })
  Price: IPrice;
  
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'destinations' })
  DestinationId: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'hotels' })
  HotelId: string;
}

export const OfferSchema = SchemaFactory.createForClass(Offer);
