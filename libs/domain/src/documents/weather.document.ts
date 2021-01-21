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
  
  @Prop()
  HasPrecipitation: boolean;
  
  @Prop()
  PrecipitationType?: any;
  
  @Prop()
  IsDayTime: boolean;
  
  @Prop()
  Temperature: ITemperature;
}

export const WeatherSchema = SchemaFactory.createForClass(Weather);
