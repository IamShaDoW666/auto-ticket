"use server";

import { exec } from "child_process";
import fs from "fs";
import { z } from "zod";
import { BookingDataSchema } from "@/types";
import { formatDate } from "./lib/utils";

export const runTicket = (data: z.infer<typeof BookingDataSchema>) => {
  if (data.TRAVEL_DATE.includes("-")) {
    data.TRAVEL_DATE = formatDate(data.TRAVEL_DATE);
  }
  fs.writeFileSync(
    "./cypress/fixtures/passenger_data.json",
    JSON.stringify(data)
  );
  //   exec("npx cypress run --headed", (error, stdout, stderr) => {
  //     if (error) {
  //       console.error(`exec error: ${error}`);
  //       return;
  //     }
  //     console.log(`stdout: ${stdout}`);
  //     console.error(`stderr: ${stderr}`);
  //   });
};
