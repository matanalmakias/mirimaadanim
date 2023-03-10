import { model } from "mongoose";
import { weeklyOrderSchema } from "../../schemas/orders/WeeklyOrder.js";
const WeeklyOrder = model("WeeklyOrder", weeklyOrderSchema);

export { WeeklyOrder };
