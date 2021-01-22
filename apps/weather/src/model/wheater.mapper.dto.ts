import { Injectable } from '@nestjs/common';
import { Weather } from '@tui/domain/documents/weather.document';
import { WeatherDto } from './weather.dto';
import { ObjectId } from 'mongoose/lib/types'

@Injectable()
export class WeatherMapperService {
  constructor() {}

  toDto() {
    return (doc: Weather) => <WeatherDto> {
      id: doc.id,
      DestinationId: doc.DestinationId,
      LocalObservationDateTime: doc.LocalObservationDateTime,
      WeatherText: doc.WeatherText,
      WeatherIcon: doc.WeatherIcon,
      HasPrecipitation: doc.HasPrecipitation,
      PrecipitationType: doc.PrecipitationType,
      IsDayTime: doc.IsDayTime,
      Temperature: {
        Imperial:{
          Value: doc.Temperature?.Imperial?.Value,
          Unit: doc.Temperature?.Imperial?.Unit,
          UnitType: doc.Temperature?.Imperial?.UnitType,
        },
        Metric:{
          Value: doc.Temperature?.Imperial?.Value,
          Unit: doc.Temperature?.Imperial?.Unit,
          UnitType: doc.Temperature?.Imperial?.UnitType,
        }
      } 
    };
  }

  toDoc() {
    return (dto: WeatherDto) => <Weather> {
      id: dto.id,
      DestinationId: new ObjectId(dto.DestinationId),
      LocalObservationDateTime: dto.LocalObservationDateTime,
      WeatherText: dto.WeatherText,
      WeatherIcon: dto.WeatherIcon,
      HasPrecipitation: dto.HasPrecipitation,
      PrecipitationType: dto.PrecipitationType,
      IsDayTime: dto.IsDayTime,
      Temperature: {
        Imperial:{
          Value: dto.Temperature?.Imperial?.Value,
          Unit: dto.Temperature?.Imperial?.Unit,
          UnitType: dto.Temperature?.Imperial?.UnitType,
        },
        Metric:{
          Value: dto.Temperature?.Imperial?.Value,
          Unit: dto.Temperature?.Imperial?.Unit,
          UnitType: dto.Temperature?.Imperial?.UnitType,
        }
      },
    };
  }
}