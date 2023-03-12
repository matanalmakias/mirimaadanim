import { model } from "mongoose";
import mongoose from "mongoose";

export const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  category: {
    type: String,
    required: false,
  },
  image: { type: String, required: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});
const Product = model("Product", productSchema);

export { Product };
