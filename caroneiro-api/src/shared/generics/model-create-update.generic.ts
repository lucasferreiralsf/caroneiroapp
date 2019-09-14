import {
  TravelCreateInput,
  UserCreateInput,
  TravelUpdateInput,
  UserUpdateInput,
} from '../../prisma/prisma-client';

export type ModelCreateInput = UserCreateInput | TravelCreateInput;

export type ModelUpdateInput = TravelUpdateInput | UserUpdateInput;
