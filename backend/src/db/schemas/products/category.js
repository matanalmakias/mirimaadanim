import { mongoose } from "mongoose";

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  image: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export { categorySchema };
