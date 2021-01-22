import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger'
import { WeatherService } from './weather.service';
import { WeatherDto } from './model/weather.dto';
import { WeatherQueryDto } from './model/weather.query.dto';

@Controller('/Wheater')
@ApiTags('Wheater')
export class WheaterController {
  constructor(private readonly WheaterService: WeatherService) {}

  @Get()
  public async get(@Query() query: WeatherQueryDto): Promise<WeatherDto[]> {
    return await this.WheaterService.get(query);
  }
}
