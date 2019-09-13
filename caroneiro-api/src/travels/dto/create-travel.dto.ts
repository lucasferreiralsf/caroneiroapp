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
import { RecurrenceTypes } from 'src/prisma/prisma-client';

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
