import { model } from "mongoose";
import { dailyOrderSchema } from "../schemas/dailyOrder.js";
const DailyOrder = model("DailyOrder", dailyOrderSchema);

export { DailyOrder };
