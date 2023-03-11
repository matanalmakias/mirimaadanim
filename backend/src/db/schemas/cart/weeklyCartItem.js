import { Schema } from "mongoose";
const weeklyCartItemSchema = new Schema({
  days: { type: Array, required: false },
  product: { unique: false, type: Schema.Types.ObjectId, ref: "Product" },
  totalPrice: {
    type: Number,
    required: false,
    default: 1,
  },
  quantiy: { type: Number, default: 1, required: false },
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
