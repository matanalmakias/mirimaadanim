import { Schema } from "mongoose";

const dailyCartItemSchema = new Schema({
  quantity: {
    type: Number,
    required: true,
    default: 1,
  },
  totalPrice: {
    type: Number,
    required: false,
    default: 1,
  },
});

export { dailyCartItemSchema };
