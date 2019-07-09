import { Document, PassportLocalDocument } from 'mongoose';

export interface IUser extends PassportLocalDocument {
  readonly firstName: string;
  readonly lastName: string;
  readonly primaryPhoneNumber: number;
  readonly secondaryPhoneNumber?: number;
  readonly email: string;
  readonly password: string;
  readonly emailIsVerified?: boolean;
  readonly primaryPhoneNumberIsVerified?: boolean;
  readonly googleId?: string;
  readonly facebookId?: string;
}
