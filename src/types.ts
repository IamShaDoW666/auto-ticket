import * as z from "zod";

export const TrainCoachSchema = z.enum([
  "SL",
  "2A",
  "3A",
  "2S",
  "CC",
  "3E",
  "EC",
  "1A",
]);
export type TrainCoach = z.infer<typeof TrainCoachSchema>;

export const SeatSchema = z.enum([
  "Lower",
  "Middle",
  "Upper",
  "Side Lower",
  "Side Upper",
  "Window Side",
  "No Preference",
]);
export type Seats = z.infer<typeof SeatSchema>

export const GenderSchema = z.enum(["Male", "Female", "Transgender"])
export type Gender = z.infer<typeof GenderSchema>

export const FoodSchema = z.enum(["Veg", "Non Veg", "No Food"])
export type Food = z.infer<typeof FoodSchema>

export const PassengerDetailSchema = z.object({
  NAME: z.string().min(1, {
    message: "Enter a proper name"
  }),
  AGE: z.number().positive('Age must be a positive number'),
  GENDER: GenderSchema,
  SEAT: SeatSchema,
  FOOD: FoodSchema,
});
export type PassengerDetail = z.infer<typeof PassengerDetailSchema>;

export const BookingDataSchema = z.object({
  TRAIN_NO: z.string(),
  TRAIN_COACH: TrainCoachSchema,
  TRAVEL_DATE: z.string(),
  SOURCE_STATION: z.string(),
  BOARDING_STATION: z.null(),
  DESTINATION_STATION: z.string(),
  TATKAL: z.boolean(),
  PREMIUM_TATKAL: z.boolean(),
  UPI_ID_CONFIG: z.string().optional(),
  PASSENGER_DETAILS: z.array(PassengerDetailSchema).min(1, {
    message: "Atleast one passenger is required!"
  }),
});

export type BookingData = z.infer<typeof BookingDataSchema>;
