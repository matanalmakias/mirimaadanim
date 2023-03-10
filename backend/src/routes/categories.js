import { Router } from "express";
import { Category } from "../db/models/products/category.js";

const router = Router();

//GET all Categories
router.get("/", async (req, res) => {
  try {
    const categories = await Category.find({});
    res.json(categories);
  } catch (error) {
    console.log(error);
  }
});

export { router as categoryRouter };
