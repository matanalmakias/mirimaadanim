import { Schema } from "mongoose";
import { productSchema } from "../products/product.js";

const dailyCartItemSchema = new Schema({
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
});

export { dailyCartItemSchema };