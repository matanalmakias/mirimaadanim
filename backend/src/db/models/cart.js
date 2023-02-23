import { model } from "mongoose";
import { cartItemSchema } from "../schemas/cart.js";
const CartItem = model("CartItem", cartItemSchema);

export { CartItem };
