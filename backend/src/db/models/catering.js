import { model } from "mongoose";
import { cateringSchema } from "../schemas/catering.js";
const Catering = model("Catering", cateringSchema);

export { Catering };
