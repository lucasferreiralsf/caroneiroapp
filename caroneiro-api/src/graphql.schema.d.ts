
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
export enum MutationType {
    CREATED = "CREATED",
    UPDATED = "UPDATED",
    DELETED = "DELETED"
}

export enum RecurrenceTypes {
    DAILY = "DAILY",
    WEEKLY = "WEEKLY",
    MONTHLY = "MONTHLY"
}

export enum TripOrderByInput {
    id_ASC = "id_ASC",
    id_DESC = "id_DESC",
    travelName_ASC = "travelName_ASC",
    travelName_DESC = "travelName_DESC",
    travelDate_ASC = "travelDate_ASC",
    travelDate_DESC = "travelDate_DESC",
    travelCost_ASC = "travelCost_ASC",
    travelCost_DESC = "travelCost_DESC",
    isSharingCost_ASC = "isSharingCost_ASC",
    isSharingCost_DESC = "isSharingCost_DESC",
    isRecurrent_ASC = "isRecurrent_ASC",
    isRecurrent_DESC = "isRecurrent_DESC",
    recurrenceTimes_ASC = "recurrenceTimes_ASC",
    recurrenceTimes_DESC = "recurrenceTimes_DESC",
    recurrenceType_ASC = "recurrenceType_ASC",
    recurrenceType_DESC = "recurrenceType_DESC",
    createdAt_ASC = "createdAt_ASC",
    createdAt_DESC = "createdAt_DESC",
    updatedAt_ASC = "updatedAt_ASC",
    updatedAt_DESC = "updatedAt_DESC"
}

export enum UserOrderByInput {
    id_ASC = "id_ASC",
    id_DESC = "id_DESC",
    firstName_ASC = "firstName_ASC",
    firstName_DESC = "firstName_DESC",
    lastName_ASC = "lastName_ASC",
    lastName_DESC = "lastName_DESC",
    primaryPhoneNumber_ASC = "primaryPhoneNumber_ASC",
    primaryPhoneNumber_DESC = "primaryPhoneNumber_DESC",
    secondaryPhoneNumber_ASC = "secondaryPhoneNumber_ASC",
    secondaryPhoneNumber_DESC = "secondaryPhoneNumber_DESC",
    email_ASC = "email_ASC",
    email_DESC = "email_DESC",
    password_ASC = "password_ASC",
    password_DESC = "password_DESC",
    emailIsVerified_ASC = "emailIsVerified_ASC",
    emailIsVerified_DESC = "emailIsVerified_DESC",
    primaryPhoneNumberIsVerified_ASC = "primaryPhoneNumberIsVerified_ASC",
    primaryPhoneNumberIsVerified_DESC = "primaryPhoneNumberIsVerified_DESC",
    googleId_ASC = "googleId_ASC",
    googleId_DESC = "googleId_DESC",
    facebookId_ASC = "facebookId_ASC",
    facebookId_DESC = "facebookId_DESC",
    emailToken_ASC = "emailToken_ASC",
    emailToken_DESC = "emailToken_DESC",
    createdAt_ASC = "createdAt_ASC",
    createdAt_DESC = "createdAt_DESC",
    updatedAt_ASC = "updatedAt_ASC",
    updatedAt_DESC = "updatedAt_DESC"
}

export class TripCreateInput {
    id?: string;
    travelName: string;
    travelDate: DateTime;
    travelCost: number;
    travelOwner: UserCreateOneWithoutOwnerTripsInput;
    passengers?: UserCreateManyWithoutTripsAsPassengerInput;
    isSharingCost?: boolean;
    isRecurrent?: boolean;
    recurrenceTimes?: number;
    recurrenceType?: RecurrenceTypes;
}

export class TripCreateManyWithoutPassengersInput {
    create?: TripCreateWithoutPassengersInput[];
    connect?: TripWhereUniqueInput[];
}

export class TripCreateManyWithoutTravelOwnerInput {
    create?: TripCreateWithoutTravelOwnerInput[];
    connect?: TripWhereUniqueInput[];
}

export class TripCreateWithoutPassengersInput {
    id?: string;
    travelName: string;
    travelDate: DateTime;
    travelCost: number;
    travelOwner: UserCreateOneWithoutOwnerTripsInput;
    isSharingCost?: boolean;
    isRecurrent?: boolean;
    recurrenceTimes?: number;
    recurrenceType?: RecurrenceTypes;
}

export class TripCreateWithoutTravelOwnerInput {
    id?: string;
    travelName: string;
    travelDate: DateTime;
    travelCost: number;
    passengers?: UserCreateManyWithoutTripsAsPassengerInput;
    isSharingCost?: boolean;
    isRecurrent?: boolean;
    recurrenceTimes?: number;
    recurrenceType?: RecurrenceTypes;
}

export class TripScalarWhereInput {
    id?: string;
    id_not?: string;
    id_in?: string[];
    id_not_in?: string[];
    id_lt?: string;
    id_lte?: string;
    id_gt?: string;
    id_gte?: string;
    id_contains?: string;
    id_not_contains?: string;
    id_starts_with?: string;
    id_not_starts_with?: string;
    id_ends_with?: string;
    id_not_ends_with?: string;
    travelName?: string;
    travelName_not?: string;
    travelName_in?: string[];
    travelName_not_in?: string[];
    travelName_lt?: string;
    travelName_lte?: string;
    travelName_gt?: string;
    travelName_gte?: string;
    travelName_contains?: string;
    travelName_not_contains?: string;
    travelName_starts_with?: string;
    travelName_not_starts_with?: string;
    travelName_ends_with?: string;
    travelName_not_ends_with?: string;
    travelDate?: DateTime;
    travelDate_not?: DateTime;
    travelDate_in?: DateTime[];
    travelDate_not_in?: DateTime[];
    travelDate_lt?: DateTime;
    travelDate_lte?: DateTime;
    travelDate_gt?: DateTime;
    travelDate_gte?: DateTime;
    travelCost?: number;
    travelCost_not?: number;
    travelCost_in?: number[];
    travelCost_not_in?: number[];
    travelCost_lt?: number;
    travelCost_lte?: number;
    travelCost_gt?: number;
    travelCost_gte?: number;
    isSharingCost?: boolean;
    isSharingCost_not?: boolean;
    isRecurrent?: boolean;
    isRecurrent_not?: boolean;
    recurrenceTimes?: number;
    recurrenceTimes_not?: number;
    recurrenceTimes_in?: number[];
    recurrenceTimes_not_in?: number[];
    recurrenceTimes_lt?: number;
    recurrenceTimes_lte?: number;
    recurrenceTimes_gt?: number;
    recurrenceTimes_gte?: number;
    recurrenceType?: RecurrenceTypes;
    recurrenceType_not?: RecurrenceTypes;
    recurrenceType_in?: RecurrenceTypes[];
    recurrenceType_not_in?: RecurrenceTypes[];
    createdAt?: DateTime;
    createdAt_not?: DateTime;
    createdAt_in?: DateTime[];
    createdAt_not_in?: DateTime[];
    createdAt_lt?: DateTime;
    createdAt_lte?: DateTime;
    createdAt_gt?: DateTime;
    createdAt_gte?: DateTime;
    updatedAt?: DateTime;
    updatedAt_not?: DateTime;
    updatedAt_in?: DateTime[];
    updatedAt_not_in?: DateTime[];
    updatedAt_lt?: DateTime;
    updatedAt_lte?: DateTime;
    updatedAt_gt?: DateTime;
    updatedAt_gte?: DateTime;
    AND?: TripScalarWhereInput[];
    OR?: TripScalarWhereInput[];
    NOT?: TripScalarWhereInput[];
}

export class TripSubscriptionWhereInput {
    mutation_in?: MutationType[];
    updatedFields_contains?: string;
    updatedFields_contains_every?: string[];
    updatedFields_contains_some?: string[];
    node?: TripWhereInput;
    AND?: TripSubscriptionWhereInput[];
}

export class TripUpdateInput {
    travelName?: string;
    travelDate?: DateTime;
    travelCost?: number;
    travelOwner?: UserUpdateOneRequiredWithoutOwnerTripsInput;
    passengers?: UserUpdateManyWithoutTripsAsPassengerInput;
    isSharingCost?: boolean;
    isRecurrent?: boolean;
    recurrenceTimes?: number;
    recurrenceType?: RecurrenceTypes;
}

export class TripUpdateManyDataInput {
    travelName?: string;
    travelDate?: DateTime;
    travelCost?: number;
    isSharingCost?: boolean;
    isRecurrent?: boolean;
    recurrenceTimes?: number;
    recurrenceType?: RecurrenceTypes;
}

export class TripUpdateManyMutationInput {
    travelName?: string;
    travelDate?: DateTime;
    travelCost?: number;
    isSharingCost?: boolean;
    isRecurrent?: boolean;
    recurrenceTimes?: number;
    recurrenceType?: RecurrenceTypes;
}

export class TripUpdateManyWithoutPassengersInput {
    create?: TripCreateWithoutPassengersInput[];
    delete?: TripWhereUniqueInput[];
    connect?: TripWhereUniqueInput[];
    set?: TripWhereUniqueInput[];
    disconnect?: TripWhereUniqueInput[];
    update?: TripUpdateWithWhereUniqueWithoutPassengersInput[];
    upsert?: TripUpsertWithWhereUniqueWithoutPassengersInput[];
    deleteMany?: TripScalarWhereInput[];
    updateMany?: TripUpdateManyWithWhereNestedInput[];
}

export class TripUpdateManyWithoutTravelOwnerInput {
    create?: TripCreateWithoutTravelOwnerInput[];
    delete?: TripWhereUniqueInput[];
    connect?: TripWhereUniqueInput[];
    set?: TripWhereUniqueInput[];
    disconnect?: TripWhereUniqueInput[];
    update?: TripUpdateWithWhereUniqueWithoutTravelOwnerInput[];
    upsert?: TripUpsertWithWhereUniqueWithoutTravelOwnerInput[];
    deleteMany?: TripScalarWhereInput[];
    updateMany?: TripUpdateManyWithWhereNestedInput[];
}

export class TripUpdateManyWithWhereNestedInput {
    where: TripScalarWhereInput;
    data: TripUpdateManyDataInput;
}

export class TripUpdateWithoutPassengersDataInput {
    travelName?: string;
    travelDate?: DateTime;
    travelCost?: number;
    travelOwner?: UserUpdateOneRequiredWithoutOwnerTripsInput;
    isSharingCost?: boolean;
    isRecurrent?: boolean;
    recurrenceTimes?: number;
    recurrenceType?: RecurrenceTypes;
}

export class TripUpdateWithoutTravelOwnerDataInput {
    travelName?: string;
    travelDate?: DateTime;
    travelCost?: number;
    passengers?: UserUpdateManyWithoutTripsAsPassengerInput;
    isSharingCost?: boolean;
    isRecurrent?: boolean;
    recurrenceTimes?: number;
    recurrenceType?: RecurrenceTypes;
}

export class TripUpdateWithWhereUniqueWithoutPassengersInput {
    where: TripWhereUniqueInput;
    data: TripUpdateWithoutPassengersDataInput;
}

export class TripUpdateWithWhereUniqueWithoutTravelOwnerInput {
    where: TripWhereUniqueInput;
    data: TripUpdateWithoutTravelOwnerDataInput;
}

export class TripUpsertWithWhereUniqueWithoutPassengersInput {
    where: TripWhereUniqueInput;
    update: TripUpdateWithoutPassengersDataInput;
    create: TripCreateWithoutPassengersInput;
}

export class TripUpsertWithWhereUniqueWithoutTravelOwnerInput {
    where: TripWhereUniqueInput;
    update: TripUpdateWithoutTravelOwnerDataInput;
    create: TripCreateWithoutTravelOwnerInput;
}

export class TripWhereInput {
    id?: string;
    id_not?: string;
    id_in?: string[];
    id_not_in?: string[];
    id_lt?: string;
    id_lte?: string;
    id_gt?: string;
    id_gte?: string;
    id_contains?: string;
    id_not_contains?: string;
    id_starts_with?: string;
    id_not_starts_with?: string;
    id_ends_with?: string;
    id_not_ends_with?: string;
    travelName?: string;
    travelName_not?: string;
    travelName_in?: string[];
    travelName_not_in?: string[];
    travelName_lt?: string;
    travelName_lte?: string;
    travelName_gt?: string;
    travelName_gte?: string;
    travelName_contains?: string;
    travelName_not_contains?: string;
    travelName_starts_with?: string;
    travelName_not_starts_with?: string;
    travelName_ends_with?: string;
    travelName_not_ends_with?: string;
    travelDate?: DateTime;
    travelDate_not?: DateTime;
    travelDate_in?: DateTime[];
    travelDate_not_in?: DateTime[];
    travelDate_lt?: DateTime;
    travelDate_lte?: DateTime;
    travelDate_gt?: DateTime;
    travelDate_gte?: DateTime;
    travelCost?: number;
    travelCost_not?: number;
    travelCost_in?: number[];
    travelCost_not_in?: number[];
    travelCost_lt?: number;
    travelCost_lte?: number;
    travelCost_gt?: number;
    travelCost_gte?: number;
    travelOwner?: UserWhereInput;
    passengers_some?: UserWhereInput;
    isSharingCost?: boolean;
    isSharingCost_not?: boolean;
    isRecurrent?: boolean;
    isRecurrent_not?: boolean;
    recurrenceTimes?: number;
    recurrenceTimes_not?: number;
    recurrenceTimes_in?: number[];
    recurrenceTimes_not_in?: number[];
    recurrenceTimes_lt?: number;
    recurrenceTimes_lte?: number;
    recurrenceTimes_gt?: number;
    recurrenceTimes_gte?: number;
    recurrenceType?: RecurrenceTypes;
    recurrenceType_not?: RecurrenceTypes;
    recurrenceType_in?: RecurrenceTypes[];
    recurrenceType_not_in?: RecurrenceTypes[];
    createdAt?: DateTime;
    createdAt_not?: DateTime;
    createdAt_in?: DateTime[];
    createdAt_not_in?: DateTime[];
    createdAt_lt?: DateTime;
    createdAt_lte?: DateTime;
    createdAt_gt?: DateTime;
    createdAt_gte?: DateTime;
    updatedAt?: DateTime;
    updatedAt_not?: DateTime;
    updatedAt_in?: DateTime[];
    updatedAt_not_in?: DateTime[];
    updatedAt_lt?: DateTime;
    updatedAt_lte?: DateTime;
    updatedAt_gt?: DateTime;
    updatedAt_gte?: DateTime;
    AND?: TripWhereInput[];
}

export class TripWhereUniqueInput {
    id?: string;
}

export class UserCreateInput {
    id?: string;
    firstName: string;
    lastName: string;
    primaryPhoneNumber?: string;
    secondaryPhoneNumber?: string;
    email: string;
    password?: string;
    emailIsVerified?: boolean;
    primaryPhoneNumberIsVerified?: boolean;
    googleId?: string;
    facebookId?: string;
    ownerTrips?: TripCreateManyWithoutTravelOwnerInput;
    tripsAsPassenger?: TripCreateManyWithoutPassengersInput;
    emailToken?: string;
}

export class UserCreateManyWithoutTripsAsPassengerInput {
    create?: UserCreateWithoutTripsAsPassengerInput[];
    connect?: UserWhereUniqueInput[];
}

export class UserCreateOneWithoutOwnerTripsInput {
    create?: UserCreateWithoutOwnerTripsInput;
    connect?: UserWhereUniqueInput;
}

export class UserCreateWithoutOwnerTripsInput {
    id?: string;
    firstName: string;
    lastName: string;
    primaryPhoneNumber?: string;
    secondaryPhoneNumber?: string;
    email: string;
    password?: string;
    emailIsVerified?: boolean;
    primaryPhoneNumberIsVerified?: boolean;
    googleId?: string;
    facebookId?: string;
    tripsAsPassenger?: TripCreateManyWithoutPassengersInput;
    emailToken?: string;
}

export class UserCreateWithoutTripsAsPassengerInput {
    id?: string;
    firstName: string;
    lastName: string;
    primaryPhoneNumber?: string;
    secondaryPhoneNumber?: string;
    email: string;
    password?: string;
    emailIsVerified?: boolean;
    primaryPhoneNumberIsVerified?: boolean;
    googleId?: string;
    facebookId?: string;
    ownerTrips?: TripCreateManyWithoutTravelOwnerInput;
    emailToken?: string;
}

export class UserScalarWhereInput {
    id?: string;
    id_not?: string;
    id_in?: string[];
    id_not_in?: string[];
    id_lt?: string;
    id_lte?: string;
    id_gt?: string;
    id_gte?: string;
    id_contains?: string;
    id_not_contains?: string;
    id_starts_with?: string;
    id_not_starts_with?: string;
    id_ends_with?: string;
    id_not_ends_with?: string;
    firstName?: string;
    firstName_not?: string;
    firstName_in?: string[];
    firstName_not_in?: string[];
    firstName_lt?: string;
    firstName_lte?: string;
    firstName_gt?: string;
    firstName_gte?: string;
    firstName_contains?: string;
    firstName_not_contains?: string;
    firstName_starts_with?: string;
    firstName_not_starts_with?: string;
    firstName_ends_with?: string;
    firstName_not_ends_with?: string;
    lastName?: string;
    lastName_not?: string;
    lastName_in?: string[];
    lastName_not_in?: string[];
    lastName_lt?: string;
    lastName_lte?: string;
    lastName_gt?: string;
    lastName_gte?: string;
    lastName_contains?: string;
    lastName_not_contains?: string;
    lastName_starts_with?: string;
    lastName_not_starts_with?: string;
    lastName_ends_with?: string;
    lastName_not_ends_with?: string;
    primaryPhoneNumber?: string;
    primaryPhoneNumber_not?: string;
    primaryPhoneNumber_in?: string[];
    primaryPhoneNumber_not_in?: string[];
    primaryPhoneNumber_lt?: string;
    primaryPhoneNumber_lte?: string;
    primaryPhoneNumber_gt?: string;
    primaryPhoneNumber_gte?: string;
    primaryPhoneNumber_contains?: string;
    primaryPhoneNumber_not_contains?: string;
    primaryPhoneNumber_starts_with?: string;
    primaryPhoneNumber_not_starts_with?: string;
    primaryPhoneNumber_ends_with?: string;
    primaryPhoneNumber_not_ends_with?: string;
    secondaryPhoneNumber?: string;
    secondaryPhoneNumber_not?: string;
    secondaryPhoneNumber_in?: string[];
    secondaryPhoneNumber_not_in?: string[];
    secondaryPhoneNumber_lt?: string;
    secondaryPhoneNumber_lte?: string;
    secondaryPhoneNumber_gt?: string;
    secondaryPhoneNumber_gte?: string;
    secondaryPhoneNumber_contains?: string;
    secondaryPhoneNumber_not_contains?: string;
    secondaryPhoneNumber_starts_with?: string;
    secondaryPhoneNumber_not_starts_with?: string;
    secondaryPhoneNumber_ends_with?: string;
    secondaryPhoneNumber_not_ends_with?: string;
    email?: string;
    email_not?: string;
    email_in?: string[];
    email_not_in?: string[];
    email_lt?: string;
    email_lte?: string;
    email_gt?: string;
    email_gte?: string;
    email_contains?: string;
    email_not_contains?: string;
    email_starts_with?: string;
    email_not_starts_with?: string;
    email_ends_with?: string;
    email_not_ends_with?: string;
    password?: string;
    password_not?: string;
    password_in?: string[];
    password_not_in?: string[];
    password_lt?: string;
    password_lte?: string;
    password_gt?: string;
    password_gte?: string;
    password_contains?: string;
    password_not_contains?: string;
    password_starts_with?: string;
    password_not_starts_with?: string;
    password_ends_with?: string;
    password_not_ends_with?: string;
    emailIsVerified?: boolean;
    emailIsVerified_not?: boolean;
    primaryPhoneNumberIsVerified?: boolean;
    primaryPhoneNumberIsVerified_not?: boolean;
    googleId?: string;
    googleId_not?: string;
    googleId_in?: string[];
    googleId_not_in?: string[];
    googleId_lt?: string;
    googleId_lte?: string;
    googleId_gt?: string;
    googleId_gte?: string;
    googleId_contains?: string;
    googleId_not_contains?: string;
    googleId_starts_with?: string;
    googleId_not_starts_with?: string;
    googleId_ends_with?: string;
    googleId_not_ends_with?: string;
    facebookId?: string;
    facebookId_not?: string;
    facebookId_in?: string[];
    facebookId_not_in?: string[];
    facebookId_lt?: string;
    facebookId_lte?: string;
    facebookId_gt?: string;
    facebookId_gte?: string;
    facebookId_contains?: string;
    facebookId_not_contains?: string;
    facebookId_starts_with?: string;
    facebookId_not_starts_with?: string;
    facebookId_ends_with?: string;
    facebookId_not_ends_with?: string;
    emailToken?: string;
    emailToken_not?: string;
    emailToken_in?: string[];
    emailToken_not_in?: string[];
    emailToken_lt?: string;
    emailToken_lte?: string;
    emailToken_gt?: string;
    emailToken_gte?: string;
    emailToken_contains?: string;
    emailToken_not_contains?: string;
    emailToken_starts_with?: string;
    emailToken_not_starts_with?: string;
    emailToken_ends_with?: string;
    emailToken_not_ends_with?: string;
    createdAt?: DateTime;
    createdAt_not?: DateTime;
    createdAt_in?: DateTime[];
    createdAt_not_in?: DateTime[];
    createdAt_lt?: DateTime;
    createdAt_lte?: DateTime;
    createdAt_gt?: DateTime;
    createdAt_gte?: DateTime;
    updatedAt?: DateTime;
    updatedAt_not?: DateTime;
    updatedAt_in?: DateTime[];
    updatedAt_not_in?: DateTime[];
    updatedAt_lt?: DateTime;
    updatedAt_lte?: DateTime;
    updatedAt_gt?: DateTime;
    updatedAt_gte?: DateTime;
    AND?: UserScalarWhereInput[];
    OR?: UserScalarWhereInput[];
    NOT?: UserScalarWhereInput[];
}

export class UserSubscriptionWhereInput {
    mutation_in?: MutationType[];
    updatedFields_contains?: string;
    updatedFields_contains_every?: string[];
    updatedFields_contains_some?: string[];
    node?: UserWhereInput;
    AND?: UserSubscriptionWhereInput[];
}

export class UserUpdateInput {
    firstName?: string;
    lastName?: string;
    primaryPhoneNumber?: string;
    secondaryPhoneNumber?: string;
    email?: string;
    password?: string;
    emailIsVerified?: boolean;
    primaryPhoneNumberIsVerified?: boolean;
    googleId?: string;
    facebookId?: string;
    ownerTrips?: TripUpdateManyWithoutTravelOwnerInput;
    tripsAsPassenger?: TripUpdateManyWithoutPassengersInput;
    emailToken?: string;
}

export class UserUpdateManyDataInput {
    firstName?: string;
    lastName?: string;
    primaryPhoneNumber?: string;
    secondaryPhoneNumber?: string;
    email?: string;
    password?: string;
    emailIsVerified?: boolean;
    primaryPhoneNumberIsVerified?: boolean;
    googleId?: string;
    facebookId?: string;
    emailToken?: string;
}

export class UserUpdateManyMutationInput {
    firstName?: string;
    lastName?: string;
    primaryPhoneNumber?: string;
    secondaryPhoneNumber?: string;
    email?: string;
    password?: string;
    emailIsVerified?: boolean;
    primaryPhoneNumberIsVerified?: boolean;
    googleId?: string;
    facebookId?: string;
    emailToken?: string;
}

export class UserUpdateManyWithoutTripsAsPassengerInput {
    create?: UserCreateWithoutTripsAsPassengerInput[];
    delete?: UserWhereUniqueInput[];
    connect?: UserWhereUniqueInput[];
    set?: UserWhereUniqueInput[];
    disconnect?: UserWhereUniqueInput[];
    update?: UserUpdateWithWhereUniqueWithoutTripsAsPassengerInput[];
    upsert?: UserUpsertWithWhereUniqueWithoutTripsAsPassengerInput[];
    deleteMany?: UserScalarWhereInput[];
    updateMany?: UserUpdateManyWithWhereNestedInput[];
}

export class UserUpdateManyWithWhereNestedInput {
    where: UserScalarWhereInput;
    data: UserUpdateManyDataInput;
}

export class UserUpdateOneRequiredWithoutOwnerTripsInput {
    create?: UserCreateWithoutOwnerTripsInput;
    update?: UserUpdateWithoutOwnerTripsDataInput;
    upsert?: UserUpsertWithoutOwnerTripsInput;
    connect?: UserWhereUniqueInput;
}

export class UserUpdateWithoutOwnerTripsDataInput {
    firstName?: string;
    lastName?: string;
    primaryPhoneNumber?: string;
    secondaryPhoneNumber?: string;
    email?: string;
    password?: string;
    emailIsVerified?: boolean;
    primaryPhoneNumberIsVerified?: boolean;
    googleId?: string;
    facebookId?: string;
    tripsAsPassenger?: TripUpdateManyWithoutPassengersInput;
    emailToken?: string;
}

export class UserUpdateWithoutTripsAsPassengerDataInput {
    firstName?: string;
    lastName?: string;
    primaryPhoneNumber?: string;
    secondaryPhoneNumber?: string;
    email?: string;
    password?: string;
    emailIsVerified?: boolean;
    primaryPhoneNumberIsVerified?: boolean;
    googleId?: string;
    facebookId?: string;
    ownerTrips?: TripUpdateManyWithoutTravelOwnerInput;
    emailToken?: string;
}

export class UserUpdateWithWhereUniqueWithoutTripsAsPassengerInput {
    where: UserWhereUniqueInput;
    data: UserUpdateWithoutTripsAsPassengerDataInput;
}

export class UserUpsertWithoutOwnerTripsInput {
    update: UserUpdateWithoutOwnerTripsDataInput;
    create: UserCreateWithoutOwnerTripsInput;
}

export class UserUpsertWithWhereUniqueWithoutTripsAsPassengerInput {
    where: UserWhereUniqueInput;
    update: UserUpdateWithoutTripsAsPassengerDataInput;
    create: UserCreateWithoutTripsAsPassengerInput;
}

export class UserWhereInput {
    id?: string;
    id_not?: string;
    id_in?: string[];
    id_not_in?: string[];
    id_lt?: string;
    id_lte?: string;
    id_gt?: string;
    id_gte?: string;
    id_contains?: string;
    id_not_contains?: string;
    id_starts_with?: string;
    id_not_starts_with?: string;
    id_ends_with?: string;
    id_not_ends_with?: string;
    firstName?: string;
    firstName_not?: string;
    firstName_in?: string[];
    firstName_not_in?: string[];
    firstName_lt?: string;
    firstName_lte?: string;
    firstName_gt?: string;
    firstName_gte?: string;
    firstName_contains?: string;
    firstName_not_contains?: string;
    firstName_starts_with?: string;
    firstName_not_starts_with?: string;
    firstName_ends_with?: string;
    firstName_not_ends_with?: string;
    lastName?: string;
    lastName_not?: string;
    lastName_in?: string[];
    lastName_not_in?: string[];
    lastName_lt?: string;
    lastName_lte?: string;
    lastName_gt?: string;
    lastName_gte?: string;
    lastName_contains?: string;
    lastName_not_contains?: string;
    lastName_starts_with?: string;
    lastName_not_starts_with?: string;
    lastName_ends_with?: string;
    lastName_not_ends_with?: string;
    primaryPhoneNumber?: string;
    primaryPhoneNumber_not?: string;
    primaryPhoneNumber_in?: string[];
    primaryPhoneNumber_not_in?: string[];
    primaryPhoneNumber_lt?: string;
    primaryPhoneNumber_lte?: string;
    primaryPhoneNumber_gt?: string;
    primaryPhoneNumber_gte?: string;
    primaryPhoneNumber_contains?: string;
    primaryPhoneNumber_not_contains?: string;
    primaryPhoneNumber_starts_with?: string;
    primaryPhoneNumber_not_starts_with?: string;
    primaryPhoneNumber_ends_with?: string;
    primaryPhoneNumber_not_ends_with?: string;
    secondaryPhoneNumber?: string;
    secondaryPhoneNumber_not?: string;
    secondaryPhoneNumber_in?: string[];
    secondaryPhoneNumber_not_in?: string[];
    secondaryPhoneNumber_lt?: string;
    secondaryPhoneNumber_lte?: string;
    secondaryPhoneNumber_gt?: string;
    secondaryPhoneNumber_gte?: string;
    secondaryPhoneNumber_contains?: string;
    secondaryPhoneNumber_not_contains?: string;
    secondaryPhoneNumber_starts_with?: string;
    secondaryPhoneNumber_not_starts_with?: string;
    secondaryPhoneNumber_ends_with?: string;
    secondaryPhoneNumber_not_ends_with?: string;
    email?: string;
    email_not?: string;
    email_in?: string[];
    email_not_in?: string[];
    email_lt?: string;
    email_lte?: string;
    email_gt?: string;
    email_gte?: string;
    email_contains?: string;
    email_not_contains?: string;
    email_starts_with?: string;
    email_not_starts_with?: string;
    email_ends_with?: string;
    email_not_ends_with?: string;
    password?: string;
    password_not?: string;
    password_in?: string[];
    password_not_in?: string[];
    password_lt?: string;
    password_lte?: string;
    password_gt?: string;
    password_gte?: string;
    password_contains?: string;
    password_not_contains?: string;
    password_starts_with?: string;
    password_not_starts_with?: string;
    password_ends_with?: string;
    password_not_ends_with?: string;
    emailIsVerified?: boolean;
    emailIsVerified_not?: boolean;
    primaryPhoneNumberIsVerified?: boolean;
    primaryPhoneNumberIsVerified_not?: boolean;
    googleId?: string;
    googleId_not?: string;
    googleId_in?: string[];
    googleId_not_in?: string[];
    googleId_lt?: string;
    googleId_lte?: string;
    googleId_gt?: string;
    googleId_gte?: string;
    googleId_contains?: string;
    googleId_not_contains?: string;
    googleId_starts_with?: string;
    googleId_not_starts_with?: string;
    googleId_ends_with?: string;
    googleId_not_ends_with?: string;
    facebookId?: string;
    facebookId_not?: string;
    facebookId_in?: string[];
    facebookId_not_in?: string[];
    facebookId_lt?: string;
    facebookId_lte?: string;
    facebookId_gt?: string;
    facebookId_gte?: string;
    facebookId_contains?: string;
    facebookId_not_contains?: string;
    facebookId_starts_with?: string;
    facebookId_not_starts_with?: string;
    facebookId_ends_with?: string;
    facebookId_not_ends_with?: string;
    ownerTrips_some?: TripWhereInput;
    tripsAsPassenger_some?: TripWhereInput;
    emailToken?: string;
    emailToken_not?: string;
    emailToken_in?: string[];
    emailToken_not_in?: string[];
    emailToken_lt?: string;
    emailToken_lte?: string;
    emailToken_gt?: string;
    emailToken_gte?: string;
    emailToken_contains?: string;
    emailToken_not_contains?: string;
    emailToken_starts_with?: string;
    emailToken_not_starts_with?: string;
    emailToken_ends_with?: string;
    emailToken_not_ends_with?: string;
    createdAt?: DateTime;
    createdAt_not?: DateTime;
    createdAt_in?: DateTime[];
    createdAt_not_in?: DateTime[];
    createdAt_lt?: DateTime;
    createdAt_lte?: DateTime;
    createdAt_gt?: DateTime;
    createdAt_gte?: DateTime;
    updatedAt?: DateTime;
    updatedAt_not?: DateTime;
    updatedAt_in?: DateTime[];
    updatedAt_not_in?: DateTime[];
    updatedAt_lt?: DateTime;
    updatedAt_lte?: DateTime;
    updatedAt_gt?: DateTime;
    updatedAt_gte?: DateTime;
    AND?: UserWhereInput[];
}

export class UserWhereUniqueInput {
    id?: string;
    primaryPhoneNumber?: string;
    email?: string;
    googleId?: string;
    facebookId?: string;
}

export interface Node {
    id: string;
}

export class AggregateTrip {
    count: number;
}

export class AggregateUser {
    count: number;
}

export class BatchPayload {
    count: Long;
}

export abstract class IMutation {
    abstract createTrip(data: TripCreateInput): Trip | Promise<Trip>;
    abstract updateTrip(data: TripUpdateInput, where: TripWhereUniqueInput): Trip | Promise<Trip>;
    abstract updateManyTrips(data: TripUpdateManyMutationInput, where?: TripWhereInput): BatchPayload | Promise<BatchPayload>;
    abstract upsertTrip(where: TripWhereUniqueInput, create: TripCreateInput, update: TripUpdateInput): Trip | Promise<Trip>;
    abstract deleteTrip(where: TripWhereUniqueInput): Trip | Promise<Trip>;
    abstract deleteManyTrips(where?: TripWhereInput): BatchPayload | Promise<BatchPayload>;
    abstract createUser(data: UserCreateInput): User | Promise<User>;
    abstract updateUser(data: UserUpdateInput, where: UserWhereUniqueInput): User | Promise<User>;
    abstract updateManyUsers(data: UserUpdateManyMutationInput, where?: UserWhereInput): BatchPayload | Promise<BatchPayload>;
    abstract upsertUser(where: UserWhereUniqueInput, create: UserCreateInput, update: UserUpdateInput): User | Promise<User>;
    abstract deleteUser(where: UserWhereUniqueInput): User | Promise<User>;
    abstract deleteManyUsers(where?: UserWhereInput): BatchPayload | Promise<BatchPayload>;
}

export class PageInfo {
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    startCursor?: string;
    endCursor?: string;
}

export abstract class IQuery {
    abstract trip(where: TripWhereUniqueInput): Trip | Promise<Trip>;
    abstract trips(where?: TripWhereInput, orderBy?: TripOrderByInput, skip?: number, after?: string, before?: string, first?: number, last?: number): Trip[] | Promise<Trip[]>;
    abstract tripsConnection(where?: TripWhereInput, orderBy?: TripOrderByInput, skip?: number, after?: string, before?: string, first?: number, last?: number): TripConnection | Promise<TripConnection>;
    abstract user(where: UserWhereUniqueInput): User | Promise<User>;
    abstract users(where?: UserWhereInput, orderBy?: UserOrderByInput, skip?: number, after?: string, before?: string, first?: number, last?: number): User[] | Promise<User[]>;
    abstract usersConnection(where?: UserWhereInput, orderBy?: UserOrderByInput, skip?: number, after?: string, before?: string, first?: number, last?: number): UserConnection | Promise<UserConnection>;
    abstract node(id: string): Node | Promise<Node>;
}

export abstract class ISubscription {
    abstract trip(where?: TripSubscriptionWhereInput): TripSubscriptionPayload | Promise<TripSubscriptionPayload>;
    abstract user(where?: UserSubscriptionWhereInput): UserSubscriptionPayload | Promise<UserSubscriptionPayload>;
}

export class Trip {
    id: string;
    travelName: string;
    travelDate: DateTime;
    travelCost: number;
    travelOwner: User;
    passengers?: User[];
    isSharingCost?: boolean;
    isRecurrent?: boolean;
    recurrenceTimes?: number;
    recurrenceType?: RecurrenceTypes;
    createdAt: DateTime;
    updatedAt: DateTime;
}

export class TripConnection {
    pageInfo: PageInfo;
    edges: TripEdge[];
    aggregate: AggregateTrip;
}

export class TripEdge {
    node: Trip;
    cursor: string;
}

export class TripPreviousValues {
    id: string;
    travelName: string;
    travelDate: DateTime;
    travelCost: number;
    isSharingCost?: boolean;
    isRecurrent?: boolean;
    recurrenceTimes?: number;
    recurrenceType?: RecurrenceTypes;
    createdAt: DateTime;
    updatedAt: DateTime;
}

export class TripSubscriptionPayload {
    mutation: MutationType;
    node?: Trip;
    updatedFields?: string[];
    previousValues?: TripPreviousValues;
}

export class User {
    id: string;
    firstName: string;
    lastName: string;
    primaryPhoneNumber?: string;
    secondaryPhoneNumber?: string;
    email: string;
    password?: string;
    emailIsVerified?: boolean;
    primaryPhoneNumberIsVerified?: boolean;
    googleId?: string;
    facebookId?: string;
    ownerTrips?: Trip[];
    tripsAsPassenger?: Trip[];
    emailToken?: string;
    createdAt: DateTime;
    updatedAt: DateTime;
}

export class UserConnection {
    pageInfo: PageInfo;
    edges: UserEdge[];
    aggregate: AggregateUser;
}

export class UserEdge {
    node: User;
    cursor: string;
}

export class UserPreviousValues {
    id: string;
    firstName: string;
    lastName: string;
    primaryPhoneNumber?: string;
    secondaryPhoneNumber?: string;
    email: string;
    password?: string;
    emailIsVerified?: boolean;
    primaryPhoneNumberIsVerified?: boolean;
    googleId?: string;
    facebookId?: string;
    emailToken?: string;
    createdAt: DateTime;
    updatedAt: DateTime;
}

export class UserSubscriptionPayload {
    mutation: MutationType;
    node?: User;
    updatedFields?: string[];
    previousValues?: UserPreviousValues;
}

export type DateTime = any;
export type Long = any;
