import { Document } from 'mongoose';

export enum RecurrenceTypeEnum {
  DAILY = 'daily',
  WEEKLY = 'weekly',
  MONTHLY = 'monthly',
}

export interface ITrip extends Document {
  tripName: string;
  tripDate: Date;
  tripCost: number;
  isSharingCost?: boolean;
  isRecurrent?: boolean;
  recurrenceTimes?: number;
  recurrenceType?: RecurrenceTypeEnum;
}
