import { Schema } from "mongoose";
import { productSchema } from "./product.js";

const weeklyCartItemSchema = new Schema({
  days: { type: Array, required: true },
  product: productSchema,
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
  discount: {
    type: Number,
    required: false,
    default: 0,
    validate: {
      validator: function (value) {
        return value >= 0 && value <= 100;
      },
      message: "Discount percentage must be between 0 and 100",
    },
  },
  deliveryTime: { type: Date, required: false },
});

export { weeklyCartItemSchema };
