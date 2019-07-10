import * as mongoose from 'mongoose';
import { IUser } from './user.interface';
import { ITrip } from '../../trip/interfaces/trip.interface';
import { ObjectID } from 'bson';

export interface IPassenger extends mongoose.PassportLocalDocument {
  readonly userId: IUser;
  // readonly trips: [ITrip];
  readonly trips: [ObjectID];
}
