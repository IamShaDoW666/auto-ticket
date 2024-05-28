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
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BookingDataSchema } from "@/types";
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
          GENDER: "Male",
          SEAT: "No Preference",
          FOOD: "No Food",
        },
      ],
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof BookingDataSchema>) {
    runTicket(values)
    console.log(values);
  }
  return (
    <main className="max-w-6xl mx-auto py-12">
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
          <FormField
            control={form.control}
            name="DESTINATION_STATION"
            render={({ field }) => (
              <FormItem>
                <FormLabel>DESTINATION_STATION</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
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
                <FormLabel>TATKAL</FormLabel>
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={(checked) => {
                      return checked
                        ? field.onChange(field.value = true)
                        : field.onChange(field.value = false);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="PREMIUM_TATKAL"
            render={({ field }) => (
              <FormItem>
                <FormLabel>PREMIUM_TATKAL</FormLabel>
                <FormControl>
                <Checkbox
                    checked={field.value}
                    onCheckedChange={(checked) => {
                      return checked
                        ? field.onChange(field.value = true)
                        : field.onChange(field.value = false);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="TRAIN_COACH"
            render={({ field }) => (
              <FormItem>
                <FormLabel>TRAIN_COACH</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
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
            name="TRAIN_NO"
            render={({ field }) => (
              <FormItem>
                <FormLabel>TRAIN_NO</FormLabel>
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
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </main>
  );
}
