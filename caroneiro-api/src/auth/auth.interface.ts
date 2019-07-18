import * as mongoose from 'mongoose';

export interface IAuth extends mongoose.Document {
  readonly email: string;
  readonly password: string;
}
