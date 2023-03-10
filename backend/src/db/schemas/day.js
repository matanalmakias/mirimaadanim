import { Schema } from "mongoose";
import { productSchema } from "./products/product.js";

const daySchema = new Schema({
  name: { type: String, unique: true },
  products: [productSchema],
});

export { daySchema };
