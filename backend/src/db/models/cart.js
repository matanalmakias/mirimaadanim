import { model } from "mongoose";
import { cartSchema } from "../schemas/cart.js";
const Cart = model("Cart", cartSchema);

export { Cart };
