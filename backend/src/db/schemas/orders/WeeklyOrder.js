import mongoose from "mongoose";
import shortid from "shortid";
import { weeklyCartItemSchema } from "../cart/weeklyCartItem.js";

const customAlphabet = "0123456789abcdef"; // this custom alphabet has 16 characters

if (customAlphabet.length !== 16) {
  throw new Error("Custom alphabet for shortid must be 16 unique characters.");
}

const weeklyOrderSchema = new mongoose.Schema({
  id: {
    type: String,
    required: false,
    unique: true,
    default: shortid.generate,
  },
  user: { type: mongoose.Types.ObjectId, required: false, unique: false },
  items: [weeklyCartItemSchema],
  total: { type: Number },
});

// create a unique index for the "items.product._id" field
weeklyOrderSchema.index({ "items.product._id": 1 });

export { weeklyOrderSchema };
