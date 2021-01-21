import * as mongoose from 'mongoose'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IWeather, ITemperature } from '../interfaces/weather.interface';

@Schema()
export class Weather extends Document implements IWeather {
  @Prop()
  LocalObservationDateTime: Date;
  
  @Prop()
  WeatherText: string;
  
  @Prop()
  WeatherIcon: number;
  
  @Prop()
  HasPrecipitation: boolean;
  
  @Prop({ type: mongoose.Schema.Types.Mixed })
  PrecipitationType?: any;
  
  @Prop()
  IsDayTime: boolean;
  
  @Prop({ type: mongoose.Schema.Types.Mixed })
  Temperature: ITemperature;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'destinations' })
  DestinationId: string;
}

export const WeatherSchema = SchemaFactory.createForClass(Weather);
