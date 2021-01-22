import { IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class OfferQueryDto {
  @ApiProperty({ required: false })
  @IsOptional()
  countryCode?: string;
}