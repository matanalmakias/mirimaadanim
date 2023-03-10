import { model } from "mongoose";
import { orderSchema } from "../../schemas/orders/order.js";
const Order = model("Order", orderSchema);

export { Order };
