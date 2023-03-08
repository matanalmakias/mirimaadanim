import { model } from "mongoose";
import { daySchema } from "../schemas/day.js";
const Day = model("Day", daySchema);

export { Day };
