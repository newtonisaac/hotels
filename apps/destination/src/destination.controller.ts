import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger'
import { DestinationService } from './destination.service';
import { DestinationDto } from './model/destination.dto';
import { DestinationQueryDto } from './model/destination.query.dto';

@Controller('/destination')
@ApiTags('destination')
export class DestinationController {
  constructor(private readonly destinationService: DestinationService) {}

  @Get()
  public async get(@Query() query: DestinationQueryDto): Promise<DestinationDto[]> {
    return await this.destinationService.get(query);
  }
}
