import { model } from "mongoose";
import { dailyCartItemSchema } from "../schemas/dailyCartItem.js";
const DailyCartItem = model("DailyCartItem", dailyCartItemSchema);

export { DailyCartItem };
