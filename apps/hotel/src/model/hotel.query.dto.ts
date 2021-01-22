import { IsOptional, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum Sort {
  PRICE = 'AveragePrize',
  RATE = 'Rating'
}

export enum Sequence {
  ASC = 'ASC',
  DES = 'DES'
}

export class HotelQueryDto {
  @ApiProperty({ required: false })
  @IsOptional()
  id?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  destinationId?: string;

  @ApiProperty({ required: false, enum: Sort })
  @IsOptional()
  sort?: string;

  @ApiProperty({ required: false, enum: Sequence })
  @IsOptional()
  sequence?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  text?: string;
}

