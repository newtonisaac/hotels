import { Injectable } from '@nestjs/common';
import { WeatherDataService } from '@tui/domain/services/data/weather-data.service';
import { WeatherDto } from './model/weather.dto';
import { WeatherQueryDto } from './model/weather.query.dto';
import { WeatherMapperService } from './model/wheater.mapper.dto';
import { ObjectId } from 'mongoose/lib/types'

@Injectable()
export class WeatherService {
  
  constructor(
    private weatherDataService: WeatherDataService,
    private mapper: WeatherMapperService
  ) { }

  async get(query: WeatherQueryDto): Promise<WeatherDto[]> {
    const filter: any = {}
    query.destinationId ? filter.DestinationId = new ObjectId(query.destinationId) : undefined
    return (await this.weatherDataService.model.find(filter)).map(this.mapper.toDto());
  }
}
