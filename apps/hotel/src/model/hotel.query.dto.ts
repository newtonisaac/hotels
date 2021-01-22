import { IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class HotelQueryDto {
  @ApiProperty({ required: false })
  @IsOptional()
  countryCode?: string;
}