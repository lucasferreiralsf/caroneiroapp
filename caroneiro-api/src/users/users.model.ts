import * as mongoose from 'mongoose';
import { ObjectID } from 'bson';

export class UserModel extends mongoose.Model {
  id?: ObjectID;
  firstName: string;
  lastName: string;
  primaryPhoneNumber: number;
  secondaryPhoneNumber?: number;
  email: string;
  password: string;
  ownerTrips?: [ObjectID];
  tripsAsPassenger?: [ObjectID];
  emailIsVerified?: boolean;
  primaryPhoneNumberIsVerified?: boolean;
  googleId?: string;
  facebookId?: string;
  passengerId?: ObjectID;
  fullName?: () => string;
}
