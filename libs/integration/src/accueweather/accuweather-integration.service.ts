import { Injectable, Inject, HttpService } from '@nestjs/common';
import { INTEGRATION_CONFIG } from '../integration.constants';
import { IntegrationOptions } from '../integration.options';
import { AccuweatherLocation } from './interfaces/location.interface';
import { AccuweatherWeather } from './interfaces/weather.interface';
import { Observable, pipe } from 'rxjs';
import { take, map, tap } from 'rxjs/operators';

const Amadeus = require('amadeus');

@Injectable()
export class AccuweatherIntegrationService {
  
  private api_url: string;
  private api_key: string;

  constructor(
    @Inject(INTEGRATION_CONFIG) private readonly integrationOptions: IntegrationOptions,
    private httpService: HttpService
  ) {
    this.api_url = this.integrationOptions.accuweather.api_url
    this.api_key = this.integrationOptions.accuweather.api_key
  }

  getLocationByTextAndCountryCode(text: string, countryCode: string): Observable<AccuweatherLocation> {
    return this.httpService.get(`${this.api_url}/locations/v1/cities/${countryCode}/search`,{ 
      params: {
        apikey: this.api_key,
        q: text
      }   
    }).pipe(take(1))
      .pipe(
      map(r => r.data.length ? r.data[0]: undefined)
    );
  }

  getCurrentWeatherByLocationKey(locationKey: string): Observable<AccuweatherWeather> {
    return this.httpService.get(`${this.api_url}/currentconditions/v1/${locationKey}`,{ 
      params: {
        apikey: this.api_key
      }
    }).pipe(take(1))
      .pipe(
      map(r => r.data.length ? r.data[0]: undefined)
    );
  }
}