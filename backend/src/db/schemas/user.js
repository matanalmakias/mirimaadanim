import { Schema } from "mongoose";
import { cartItemSchema } from "./cart/cart.js";
import { dailyCartItemSchema } from "./cart/dailyCartItem.js";
import { weeklyCartItemSchema } from "./cart/weeklyCartItem.js";

const userSchema = new Schema({
  username: String,
  email: String,
  password: String,
  cart: [cartItemSchema] || [],
  dailyCart: [dailyCartItemSchema] || [],
  weeklyCart: [weeklyCartItemSchema] || [],
  weeklyOrders: { type: Array, required: false },
  workers: Array,
  roles: [
    {
      type: Schema.Types.ObjectId,
      ref: "Role",
    },
  ],
});

export { userSchema };
