import { model } from "mongoose";
import { cartItemSchema } from "../schemas/cart.js";
const Cart = model("Cart", cartItemSchema);

export { Cart };
