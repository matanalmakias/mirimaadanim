import { Router } from "express";
import { validateToken } from "../../middleware/user/validateToken.js";
import { User } from "../../db/models/user.js";
import _ from "underscore";
import { Product } from "../../db/models/products/product.js";
import { Category } from "../../db/models/products/category.js";
import mongoose from "mongoose";
const router = Router();

// GET single ProductS
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const product = await Product.findOne({ _id: id });
  return res.json(product);
});
// GET All ProductS
router.get("/", async (req, res) => {
  const products = await Product.find({});
  return res.json(products);
});

export { router as productRouter };
