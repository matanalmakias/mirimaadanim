import { Schema } from "mongoose";
const weeklyCartItemSchema = new Schema({
  _id: false,
  dates: { type: Array },
  product: { type: Schema.Types.ObjectId, ref: "Product" },
  totalPrice: {
    type: Number,
    default: 1,
  },
  quantiy: { type: Number, default: 1 },
  discount: {
    type: Number,
    default: 0,
    validate: {
      validator: function (value) {
        return value >= 0 && value <= 100;
      },
      message: "Discount percentage must be between 0 and 100",
    },
  },
  deliveryTime: Object,
});

export { weeklyCartItemSchema };
