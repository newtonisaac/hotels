import { Module, Logger } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config'
import configuration from './configuration'
import { IntegrationModule } from '@tui/integration/integration.module'
import { DomainModule } from '@tui/domain'
import { join } from 'path'

import { DestinationSeederService } from './services/destination-seeder.service'
import { HotelSeederService } from './services/hotel-offer-seeder.service'
import { WeatherSeederService } from './services/weather-seeder.service'

@Module({
  imports: [
    ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: process.env.NODE_ENV == 'dev' ? join(__dirname,'../../../apps/seeder/env/.env.' + process.env.NODE_ENV) : join(__dirname,'../env.' + process.env.NODE_ENV),
			load: [configuration],
    }),
    MongooseModule.forRootAsync({
			imports: [ConfigModule],
			useFactory: async (configService: ConfigService) => ({
        uri: configService.get('mongo').connection,
        authSource: 'admin'
      }),
			inject: [ConfigService],
		}),
		IntegrationModule.forRootAsync({
			imports: [ConfigModule],
			useFactory: async (configService: ConfigService) => ({
        amadeus: { api_key: configService.get('amadeus').api_key, api_secret: configService.get('amadeus').api_secret },
        accuweather: { api_key: configService.get('accuweather').api_key, api_url: configService.get('accuweather').api_url },
      }),
			inject: [ConfigService],
    }),
    DomainModule
  ],
  providers: [
    Logger,
    AppService,
    DestinationSeederService,
    HotelSeederService,
    WeatherSeederService,
  ],
})
export class AppModule {}
