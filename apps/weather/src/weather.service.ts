import { Injectable } from '@nestjs/common';
import { WeatherDataService } from '@tui/domain/services/data/weather-data.service';
import { WeatherDto } from './model/weather.dto';
import { WeatherQueryDto } from './model/weather.query.dto';
import { WeatherMapperService } from './model/wheater.mapper.dto';

@Injectable()
export class WeatherService {
  
  constructor(
    private WheaterDataService: WeatherDataService,
    private mapper: WeatherMapperService
  ) { }

  async get(query: WeatherQueryDto): Promise<WeatherDto[]> {
    const filter: WeatherQueryDto = {}
    query.countryCode ? filter.countryCode = query.countryCode : undefined
    return (await this.WheaterDataService.model.find()).map(this.mapper.toDto());
  }
}
