import { Document } from 'mongoose';
import { ObjectID } from 'bson';

export enum RecurrenceTypeEnum {
  DAILY = 'daily',
  WEEKLY = 'weekly',
  MONTHLY = 'monthly',
}

export interface ITrip extends Document {
  id?: ObjectID;
  tripName: string;
  tripDate: Date;
  tripCost: number;
  isSharingCost?: boolean;
  isRecurrent?: boolean;
  recurrenceTimes?: number;
  recurrenceType?: RecurrenceTypeEnum;
}
