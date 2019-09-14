import {
  IsNotEmpty,
  IsString,
  IsDateString,
  IsNumber,
  Min,
  IsBoolean,
  IsInt,
  IsIn,
  IsOptional,
  ValidateIf,
  IsArray,
} from 'class-validator';
import { RecurrenceTypes } from '../../prisma/prisma-client';

export class CreateTravelDto {
  @IsNotEmpty()
  @IsString()
  travelName: string;

  @IsNotEmpty()
  @IsDateString()
  travelDate: Date;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  travelCost: number;

  @IsNotEmpty()
  @IsNumber()
  travelOwner: number;

  @IsOptional()
  @IsArray()
  passengers?: number[];

  @IsOptional()
  @IsBoolean()
  isSharingCost?: boolean;

  @IsOptional()
  @IsBoolean()
  isRecurrent?: boolean;

  @ValidateIf(o => o.isRecurrent === true)
  @IsInt()
  @Min(1)
  recurrenceTimes?: number;

  @ValidateIf(o => o.isRecurrent === true)
  @IsIn(['DAILY', 'WEEKLY', 'MONTHLY'])
  recurrenceType?: RecurrenceTypes;
}
