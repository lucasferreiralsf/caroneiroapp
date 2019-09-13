import {
  IsNotEmpty,
  IsString,
  IsDateString,
  IsNumber,
  Min,
  IsBoolean,
  IsInt,
  IsIn,
} from 'class-validator';
import { RecurrenceTypes } from '../../prisma/prisma-client';

export class UpdateTravelDto {
  @IsString()
  travelName?: string;

  @IsDateString()
  travelDate?: Date;

  @IsNumber()
  @Min(0)
  travelCost?: number;

  // @IsNumber()
  // travelOwner?: number;

  @IsNumber()
  passengers?: number[];

  @IsBoolean()
  isSharingCost?: boolean;

  @IsBoolean()
  isRecurrent?: boolean;

  @IsInt()
  @Min(1)
  recurrenceTimes?: number;

  @IsIn(['DAILY', 'WEEKLY', 'MONTHLY'])
  recurrenceType?: RecurrenceTypes;
}
