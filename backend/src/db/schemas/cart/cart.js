import { Schema } from "mongoose";

const cartItemSchema = new Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
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
  workers: {
    type: Array,
    required: false,
    default: [],
  },
  _id: false,
});

export { cartItemSchema };
