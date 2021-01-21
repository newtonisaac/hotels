import { Injectable } from '@nestjs/common';
import { DestinationSeederService } from './services/destination-seeder.service'
import { HotelSeederService } from './services/hotel-offer-seeder.service'
import { WeatherSeederService } from './services/weather-seeder.service'

@Injectable()
export class AppService {
  constructor(
    private destinationSeederService: DestinationSeederService,
    private hotelSeederService: HotelSeederService,
    private weatherSeederService: WeatherSeederService,
  ){ }

  async seed(){
    //await this.destinationSeederService.seed();
    //await this.hotelSeederService.seed();
    await this.weatherSeederService.seed();
  }
}
