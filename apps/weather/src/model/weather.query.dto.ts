import { IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class WeatherQueryDto {
  @ApiProperty({ required: false })
  @IsOptional()
  countryCode?: string;
}