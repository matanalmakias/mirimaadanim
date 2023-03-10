import { model } from "mongoose";
import { categorySchema } from "../../schemas/products/category.js";
const Category = model("Category", categorySchema);

export { Category };
