import { IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum Sort {
  Price = 'Price.Total'
}

export enum Sequence {
  ASC = 'ASC',
  DES = 'DES'
}

export class OfferQueryDto {
  
  @ApiProperty({ required: false })
  @IsOptional()
  destinationId?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  hotelId?: string;

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