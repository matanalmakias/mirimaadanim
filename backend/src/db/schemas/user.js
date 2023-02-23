import { Schema } from "mongoose";
import { cartItemSchema } from "./cart.js";

const userSchema = new Schema({
  username: String,
  email: String,
  password: String,
  cart: [cartItemSchema] || [],
  roles: [
    {
      type: Schema.Types.ObjectId,
      ref: "Role",
    },
  ],
});

export { userSchema };
