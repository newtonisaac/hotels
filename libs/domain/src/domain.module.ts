import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

//Documents
import { Destination, DestinationSchema } from './documents/destination.document';
import { Hotel, HotelSchema } from './documents/hotel.document';
import { Offer, OfferSchema } from './documents/offer.document';
import { Weather, WeatherSchema } from './documents/weather.document';

//Services
import { DestinationDataService } from './services/data/destination-data/destination-data.service';
import { HotelDataService } from './services/data/hotel-data/hotel-data.service';
import { OfferDataService } from './services/data/offer-data/offer-data.service';
import { WeatherDataService } from './services/data/weather-data/weather-data.service';



@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Destination.name, schema: DestinationSchema },
      { name: Hotel.name, schema: HotelSchema },
      { name: Offer.name, schema: OfferSchema },
      { name: Weather.name, schema: WeatherSchema },
    ])
  ],
  providers: [
    DestinationDataService,
    HotelDataService,
    OfferDataService,
    WeatherDataService
  ],
  exports: [
    DestinationDataService,
    HotelDataService,
    OfferDataService,
    WeatherDataService
  ],
})
export class DomainModule {}
