import * as z from "zod";

export const PassengerDetailSchema = z.object({
  NAME: z.string(),
  AGE: z.number(),
  GENDER: z.string(),
  SEAT: z.string(),
  FOOD: z.string(),
});
export type PassengerDetail = z.infer<typeof PassengerDetailSchema>;

export const BookingDataSchema = z.object({
  TRAIN_NO: z.string(),
  TRAIN_COACH: z.string(),
  TRAVEL_DATE: z.string(),
  SOURCE_STATION: z.string(),
  BOARDING_STATION: z.null(),
  DESTINATION_STATION: z.string(),
  TATKAL: z.boolean(),
  PREMIUM_TATKAL: z.boolean(),
  UPI_ID_CONFIG: z.string(),
  PASSENGER_DETAILS: z.array(PassengerDetailSchema),
});
export type BookingData = z.infer<typeof BookingDataSchema>;
