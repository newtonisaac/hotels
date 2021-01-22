import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger'
import { OfferService } from './offer.service';
import { OfferDto } from './model/offer.dto';
import { OfferQueryDto } from './model/offer.query.dto';

@Controller('/offer')
@ApiTags('offer')
export class DestinationController {
  constructor(private readonly destinationService: OfferService) {}

  @Get()
  public async get(@Query() query: OfferQueryDto): Promise<OfferDto[]> {
    return await this.destinationService.get(query);
  }
}
