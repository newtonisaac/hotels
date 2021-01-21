import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IDestination } from '../interfaces/destination.interface';

@Schema()
export class Destination extends Document implements IDestination {

  @Prop()
  City: string;
  
  @Prop()
  CountryCode: string;
  
  @Prop()
  IATACode: string;
  
  @Prop()
  AccuLocationKey?: string;
}

export const DestinationSchema = SchemaFactory.createForClass(Destination);
