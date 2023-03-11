import { model } from "mongoose";
// Order Schema
import mongoose from "mongoose";
import { cartItemSchema } from "../../schemas/cart/cart.js";

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  items: [cartItemSchema],
  total: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Order = model("Order", orderSchema);

export { Order };
