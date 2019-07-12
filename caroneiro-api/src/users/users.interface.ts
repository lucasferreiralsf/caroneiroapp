import * as mongoose from 'mongoose';
import { ObjectID } from 'bson';

export interface IUser extends mongoose.Document {
  readonly id?: ObjectID;
  readonly firstName: string;
  readonly lastName: string;
  readonly primaryPhoneNumber: number;
  readonly secondaryPhoneNumber?: number;
  readonly email: string;
  password: string;
  readonly emailIsVerified?: boolean;
  readonly primaryPhoneNumberIsVerified?: boolean;
  readonly googleId?: string;
  readonly facebookId?: string;
  readonly passengerId?: ObjectID;
}
