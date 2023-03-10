import { model } from "mongoose";
import { productSchema } from "../../schemas/products/product.js";
const Product = model("Product", productSchema);

export { Product };
