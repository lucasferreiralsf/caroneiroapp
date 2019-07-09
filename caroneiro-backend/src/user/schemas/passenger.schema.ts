import * as mongoose from 'mongoose';
import { UserSchema } from './user.schema';
import { TripSchema } from '../../trip/schemas/trip.schema';

export const PassengerSchema = new mongoose.Schema({
  userId: UserSchema,
  trips: [TripSchema],
});
