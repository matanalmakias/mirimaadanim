import { model } from "mongoose";
import { categorySchema } from "../schemas/category.js";
const Category = model("Catering", categorySchema);

export { Category };
