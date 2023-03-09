import { Schema } from "mongoose";
import { cartItemSchema } from "./cart.js";
import { dailyCartItemSchema } from "./dailyCartItem.js";
import { weeklyCartItemSchema } from "./weeklyCartItem.js";

const userSchema = new Schema({
  username: String,
  email: String,
  password: String,
  cart: [cartItemSchema] || [],
  dailyCart: [dailyCartItemSchema] || [],
  weeklyCart: [weeklyCartItemSchema] || [],

  workers: Array,
  roles: [
    {
      type: Schema.Types.ObjectId,
      ref: "Role",
    },
  ],
});

export { userSchema };
