import { Injectable, Logger } from '@nestjs/common';
import { DestinationDataService } from '@tui/domain/services/data/destination-data.service';
import { WeatherDataService } from '@tui/domain/services/data/weather-data.service';
import { AccuweatherIntegrationService } from '@tui/integration/accueweather/accuweather-integration.service';
import { IWeather, ITemperature } from '@tui/domain/interfaces/weather.interface';

@Injectable()
export class WeatherSeederService {
  constructor(
      private destinationDataService: DestinationDataService,
      private weatherDataService: WeatherDataService,
      private accuweatherIntegrationService: AccuweatherIntegrationService
  ){ }

  async seed(){
    try {
        Logger.log('Seeding weather data...')
        
        await this.populate()
        
        Logger.log('Seeding weather data complete')
    } catch (error) {
        Logger.error('Error seeding weather data', error, WeatherSeederService.name)
    }
  }

  async populate(){
    const destinations = await this.destinationDataService.model.find()
    for (const destination of destinations) {
      const accuWeather = await this.accuweatherIntegrationService.getCurrentWeatherByLocationKey(destination.AccuLocationKey).toPromise();
      const weather: IWeather = {
        DestinationId: destination.id,
        LocalObservationDateTime: accuWeather.LocalObservationDateTime,
        WeatherText: accuWeather.WeatherText,
        WeatherIcon: accuWeather.WeatherIcon,
        HasPrecipitation: accuWeather.HasPrecipitation,
        PrecipitationType: accuWeather.PrecipitationType,
        IsDayTime: accuWeather.IsDayTime,
        Temperature: {
          Imperial:{
            Value: accuWeather.Temperature?.Imperial?.Value,
            Unit: accuWeather.Temperature?.Imperial?.Unit,
            UnitType: accuWeather.Temperature?.Imperial?.UnitType,
          },
          Metric:{
            Value: accuWeather.Temperature?.Imperial?.Value,
            Unit: accuWeather.Temperature?.Imperial?.Unit,
            UnitType: accuWeather.Temperature?.Imperial?.UnitType,
          }
        }
      }
      await this.weatherDataService.model.findOneAndUpdate({ DestinationId: weather.DestinationId }, weather, { upsert: true })
    }
  }
 
}
