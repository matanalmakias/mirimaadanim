import { model } from "mongoose";
import { Schema } from "mongoose";
import { cartItemSchema } from "../schemas/cart/cart.js";
import { dailyCartItemSchema } from "../schemas/cart/dailyCartItem.js";
import mongoose from "mongoose";
import { weeklyCartItemSchema } from "../schemas/cart/weeklyCartItem.js";

const addressSchema = new Schema({
  _id: false,
  city: { type: String, required: false, unique: false },
  street: { type: String, required: false, unique: false },
  houseNumber: { type: Number, required: false, unique: false },
  floor: { type: Number, required: false, unique: false },
});
const userSchema = new Schema({
  isComplete: { type: Boolean, required: false, default: false, unique: false },
  phoneNumber: { type: Number, required: true, unique: true },
  name: { type: String, required: false, unique: false },
  address: addressSchema,
  verficationCode: { type: Number, required: false, unique: true },
  cart: [cartItemSchema] || [],
  dailyCart: [dailyCartItemSchema] || [],
  weeklyCart: [weeklyCartItemSchema] || [], // fixed
  weeklyOrders: [{ type: mongoose.Types.ObjectId, ref: "WeeklyOrder" }],
  dailyOrders: [{ type: mongoose.Types.ObjectId, ref: "DailyOrder" }],
  points: { type: Number, required: false, unique: false, default: 0 },
  workers: Array,
  roles: [
    {
      type: Schema.Types.ObjectId,
      ref: "Role",
    },
  ],
});

const User = model("User", userSchema);

export { User };
