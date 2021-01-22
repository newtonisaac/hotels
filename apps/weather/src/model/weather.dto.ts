import { IsBoolean, IsString, IsDate, IsNumber, IsObject } from 'class-validator';
import { ITemperature } from '@tui/domain/interfaces/weather.interface';

export class WeatherDto {
  @IsString()
  id: string;
  @IsString()
  City: string;
  @IsDate()
  LocalObservationDateTime: Date;
  @IsString()
  WeatherText: string;
  @IsNumber()
  WeatherIcon: number;
  @IsBoolean()
  HasPrecipitation: boolean;
  @IsString()
  PrecipitationType?: string;
  @IsBoolean()
  IsDayTime: boolean;
  @IsObject()
  Temperature: ITemperature;
  @IsString()
  DestinationId: string;
}