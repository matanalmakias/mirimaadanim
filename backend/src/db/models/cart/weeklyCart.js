import { model } from "mongoose";
import { weeklyCartItemSchema } from "../schemas/weeklyCartItem.js";
const WeeklyCartItem = model("WeeklyCartItem", weeklyCartItemSchema);

export { WeeklyCartItem };
