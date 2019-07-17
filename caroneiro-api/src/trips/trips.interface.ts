import { ObjectID } from 'bson';
import * as mongoose from 'mongoose';

export enum RecurrenceTypeEnum {
  DAILY = 'daily',
  WEEKLY = 'weekly',
  MONTHLY = 'monthly',
}

export interface ITrip extends mongoose.Document {
  id?: ObjectID;
  tripName: string;
  tripDate: Date;
  tripCost: number;
  tripOwner: ObjectID;
  tripPassengers: [ObjectID];
  isSharingCost?: boolean;
  isRecurrent?: boolean;
  recurrenceTimes?: number;
  recurrenceType?: RecurrenceTypeEnum;
}
