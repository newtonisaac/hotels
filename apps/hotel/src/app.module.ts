import { Module, Logger } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HotelController } from './hotel.controller';
import { HotelService } from './hotel.service';
import { HotelMapperService } from './model/hotel.mapper.dto';
import { ConfigModule, ConfigService } from '@nestjs/config'
import configuration from './configuration'
import { DomainModule } from '@tui/domain'
import { join } from 'path'

@Module({
  imports: [
    ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: process.env.NODE_ENV == 'dev' ? join(__dirname,'../../../apps/hotel/env/.env.' + process.env.NODE_ENV) : join(__dirname,'../env.' + process.env.NODE_ENV),
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
    DomainModule
  ],
  controllers: [HotelController],
  providers: [
    Logger,
    HotelService,
    HotelMapperService
  ],
})
export class AppModule {}
