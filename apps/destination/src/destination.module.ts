import { Module } from '@nestjs/common';
import { DestinationController } from './destination.controller';
import { DestinationService } from './destination.service';
import { DestinationsModule } from './destinations/destinations.module';

@Module({
  imports: [DestinationsModule],
  controllers: [DestinationController],
  providers: [DestinationService],
})
export class DestinationModule {}
