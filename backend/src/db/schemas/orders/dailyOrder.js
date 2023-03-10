// Order Schema
import mongoose from "mongoose";
import { dailyCartItemSchema } from "../cart/dailyCartItem.js";

const dailyOrderSchema = new mongoose.Schema({
  id: {
    type: String,
    unique: true,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  items: [dailyCartItemSchema],
  total: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
export { dailyOrderSchema };
