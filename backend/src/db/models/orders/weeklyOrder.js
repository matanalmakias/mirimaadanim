import { model } from "mongoose";
import { Schema } from "mongoose";
import mongoose from "mongoose";

const weeklyOrderSchema = new Schema({
  items: [Object],
  user: { type: Schema.Types.ObjectId, ref: "User" }, // fixed
  total: Number,
  date: { type: Date, default: Date.now },
  pointsEarned: { type: Number, required: false, default: 0 },
});

const WeeklyOrder = model("WeeklyOrder", weeklyOrderSchema);

export { WeeklyOrder };
