import { IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class DestinationQueryDto {
  @ApiProperty({ required: false })
  @IsOptional()
  countryCode?: string;
}