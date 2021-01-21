import { Injectable, Inject } from '@nestjs/common';
import { INTEGRATION_CONFIG } from '../integration.constants';
import { IntegrationOptions } from '../integration.options';
import { AmadeusHotelOffer } from './interfaces/hotel-offer.interface';

const Amadeus = require('amadeus');

@Injectable()
export class AmadeusIntegrationService {
  
  private client: any;

  constructor(
    @Inject(INTEGRATION_CONFIG) private readonly integrationOptions: IntegrationOptions
  ) {
    this.client = new Amadeus({
        clientId: this.integrationOptions.amadeus.api_key,
        clientSecret: this.integrationOptions.amadeus.api_secret
    }).client
  }

  async getHotelOffersByCityCode(cityCode: string): Promise<AmadeusHotelOffer[]>{
    return (await this.client.get('/v2/shopping/hotel-offers', {
        cityCode,
        radius: 300 
    }))?.result?.data
  }
}