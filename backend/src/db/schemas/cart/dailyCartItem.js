import { Schema } from "mongoose";
const dailyCartItemSchema = new Schema({
  product: { unique: false, type: Schema.Types.ObjectId, ref: "Product" },
  totalPrice: {
    type: Number,
    required: false,
    default: 1,
  },
  quantiy: { type: Number, default: 1, required: false },
});

export { dailyCartItemSchema };
