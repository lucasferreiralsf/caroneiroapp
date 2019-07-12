import * as mongoose from 'mongoose';
import { ObjectID } from 'bson';

export interface IPassenger extends mongoose.Document {
  id?: ObjectID;
  userId: ObjectID;
  tripId: ObjectID;
  passengerIsConfirmed?: boolean;
}
