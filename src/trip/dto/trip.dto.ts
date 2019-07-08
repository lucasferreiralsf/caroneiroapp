import { RecurrenceTypeEnum } from "../interfaces/trip.interface";

export class CreateTripDto {
    readonly tripName: string;
    readonly tripDate: Date;
    readonly tripCost: number;
    readonly isSharingCost?: boolean;
    readonly isRecurrent?: boolean;
    readonly recurrenceTimes?: number;
    readonly recurrenceType?: RecurrenceTypeEnum;
}