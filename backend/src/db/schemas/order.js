import { Schema } from "mongoose";

const orderItemSchema = new Schema({
  product: { type: String, ref: "Product", required: true },
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
});

const orderSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    items: { type: [orderItemSchema], required: true },
    total: { type: Number, required: true },
  },
  { timestamps: true }
);
export { orderSchema };
