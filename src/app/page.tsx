"use client";
import { runTicket } from "@/actions";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { FieldArrayWithId, useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  BookingDataSchema,
  Food,
  FoodSchema,
  Gender,
  Seats,
  SeatSchema,
} from "@/types";
import { Checkbox } from "@/components/ui/checkbox";


export default function Home() {
  const form = useForm<z.infer<typeof BookingDataSchema>>({
    resolver: zodResolver(BookingDataSchema),
    defaultValues: {
      TRAIN_NO: "16306",
      TRAIN_COACH: "2S",
      TRAVEL_DATE: "29/05/2024",
      SOURCE_STATION: "TLY",
      BOARDING_STATION: null,
      DESTINATION_STATION: "AWY",
      TATKAL: false,
      PREMIUM_TATKAL: false,
      UPI_ID_CONFIG: "",
      PASSENGER_DETAILS: [
        {
          NAME: "Pramodan P",
          AGE: 50,
          SEAT: "Window Side",
          FOOD: "Non Veg",
          GENDER: "Male",
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    rules: {
      minLength: 1,
    },
    control: form.control,
    name: "PASSENGER_DETAILS",
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof BookingDataSchema>) {
    runTicket(values);
    console.log(values);
  }

  return (
    <main className="max-w-6xl mx-auto py-12 px-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="SOURCE_STATION"
            render={({ field }) => (
              <FormItem>
                <FormLabel>SOURCE STATION</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* <FormField
            control={form.control}
            name="SOURCE_STATION"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>SOURCE STATION</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "w-[200px] justify-between",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value
                          ? 
                          `${
                              STATIONS.find(
                                (station) => station.code === field.value
                              )?.name
                            } (${
                              STATIONS.find(
                                (station) => station.code === field.value
                              )?.code
                            })`
                          : "Select Station"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput placeholder="Search station..." />
                      <CommandEmpty>No Station found.</CommandEmpty>
                      <CommandGroup>
                        <CommandList >
                          {STATIONS.map((station, idx) => (
                            <CommandItem
                              key={idx}
                              className="flex gap-x-4"
                              value={station.code}
                              onSelect={() => {
                                form.setValue("SOURCE_STATION", station.code);
                              }}
                            >
                              {station.name}
                              <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              station.code === field.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                            </CommandItem>
                          ))}
                        </CommandList>
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>

                <FormMessage />
              </FormItem>
            )}
          /> */}
          <FormField
            control={form.control}
            name="DESTINATION_STATION"
            render={({ field }) => (
              <FormItem>
                <FormLabel>DESTINATION STATION</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="TRAIN_NO"
            render={({ field }) => (
              <FormItem>
                <FormLabel>TRAIN NO</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="TRAVEL_DATE"
            render={({ field }) => (
              <FormItem>
                <FormLabel>TRAVEL DATE</FormLabel>
                <FormControl>
                  <Input type="date" placeholder="shadcn" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="TATKAL"
            render={({ field }) => (
              <FormItem>
                <div className="flex gap-x-4 items-center">
                  <FormLabel>TATKAL</FormLabel>
                  <FormControl>
                    <Checkbox
                      className="w-5 h-5 rounded-lg"
                      checked={field.value}
                      onCheckedChange={(checked) => {
                        return checked
                          ? field.onChange((field.value = true))
                          : field.onChange((field.value = false));
                      }}
                    />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="PREMIUM_TATKAL"
            render={({ field }) => (
              <FormItem>
                <div className="flex gap-x-4 items-center">
                  <FormLabel>PREMIUM TATKAL</FormLabel>
                  <FormControl>
                    <Checkbox
                      className="w-5 h-5 rounded-lg"
                      checked={field.value}
                      onCheckedChange={(checked) => {
                        return checked
                          ? field.onChange((field.value = true))
                          : field.onChange((field.value = false));
                      }}
                    />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="TRAIN_COACH"
            render={({ field }) => (
              <FormItem>
                <FormLabel>TRAIN COACH</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a Coach" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="SL">SL</SelectItem>
                    <SelectItem value="2A">2A</SelectItem>
                    <SelectItem value="3A">3A</SelectItem>
                    <SelectItem value="3E">3E</SelectItem>
                    <SelectItem value="1A">1A</SelectItem>
                    <SelectItem value="CC">CC</SelectItem>
                    <SelectItem value="EC">EC</SelectItem>
                    <SelectItem value="2S">2S</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="UPI_ID_CONFIG"
            render={({ field }) => (
              <FormItem>
                <FormLabel>UPI ID</FormLabel>
                <FormControl>
                  <Input placeholder="test@example" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="button"
            variant="secondary"
            onClick={() =>
              append({
                NAME: "",
                AGE: 0,
                FOOD: "No Food",
                GENDER: "Male",
                SEAT: "No Preference",
              })
            }
          >
            Add Passenger
          </Button>
          {fields.map((passenger, index) => (
            <div
              className="md:flex gap-x-4 justify-between w-full"
              key={passenger.id}
            >
              <div className="grid grid-cols-1 md:grid-cols-3 w-full gap-4">
                <div className="w-full flex flex-col gap-y-4">
                  <Input
                    {...form.register(`PASSENGER_DETAILS.${index}.NAME`)}
                    placeholder="Name"
                  />
                  {form.formState.errors?.PASSENGER_DETAILS?.[index]?.NAME && (
                    <p className="bg-destructive/75 p-2 rounded text-destructive-foreground shadow">
                      {
                        form.formState.errors.PASSENGER_DETAILS[index].NAME
                          ?.message
                      }
                    </p>
                  )}
                </div>
                <div className="w-full flex flex-col gap-y-4">
                  <Input
                    {...form.register(`PASSENGER_DETAILS.${index}.AGE`, {
                      valueAsNumber: true,
                    })}
                    placeholder="Age"
                    type="number"
                  />
                  {form.formState.errors?.PASSENGER_DETAILS?.[index]?.AGE && (
                    <p className="bg-destructive/75 p-2 rounded text-destructive-foreground shadow">
                      {
                        form.formState.errors.PASSENGER_DETAILS[index].AGE
                          .message
                      }
                    </p>
                  )}
                </div>
                <div className="w-full flex flex-col gap-y-4">
                  <Select
                    defaultValue={passenger.GENDER}
                    onValueChange={(val: Gender) =>
                      form.setValue(`PASSENGER_DETAILS.${index}.GENDER`, val)
                    }
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Gender" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                      <SelectItem value="Transgender">Transgender</SelectItem>
                    </SelectContent>
                  </Select>

                  {form.formState.errors?.PASSENGER_DETAILS?.[index]
                    ?.GENDER && (
                    <p className="bg-destructive/75 p-2 rounded text-destructive-foreground shadow">
                      {
                        form.formState.errors.PASSENGER_DETAILS[index].GENDER
                          .message
                      }
                    </p>
                  )}
                </div>
                <div className="w-full flex flex-col gap-y-4">
                  <Select
                    defaultValue={passenger.FOOD}
                    onValueChange={(val: Food) =>
                      form.setValue(`PASSENGER_DETAILS.${index}.FOOD`, val)
                    }
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Food" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {FoodSchema.options.map((food, idx) => (
                        <SelectItem value={food}>{food}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {form.formState.errors?.PASSENGER_DETAILS?.[index]?.FOOD && (
                    <p className="bg-destructive/75 p-2 rounded text-destructive-foreground shadow">
                      {
                        form.formState.errors.PASSENGER_DETAILS[index].FOOD
                          .message
                      }
                    </p>
                  )}
                </div>
                <div className="w-full flex flex-col gap-y-4">
                  <Select
                    defaultValue={passenger.SEAT}
                    onValueChange={(val: Seats) =>
                      form.setValue(`PASSENGER_DETAILS.${index}.SEAT`, val)
                    }
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seat" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {SeatSchema.options.map((seat, idx) => (
                        <SelectItem key={idx} value={seat}>
                          {seat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {form.formState.errors?.PASSENGER_DETAILS?.[index]
                    ?.GENDER && (
                    <p className="bg-destructive/75 p-2 rounded text-destructive-foreground shadow">
                      {
                        form.formState.errors.PASSENGER_DETAILS[index].GENDER
                          .message
                      }
                    </p>
                  )}
                </div>
              </div>
              <div className="flex justify-between gap-x-2">
                {fields.length > 1 && (
                  <Button
                    variant="destructive"
                    type="button"
                    onClick={() => remove(index)}
                  >
                    Remove
                  </Button>
                )}
              </div>
            </div>
          ))}

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </main>
  );
}
