import { Router } from "express";
import { Category } from "../db/models/category.js";

const router = Router();

//GET all Categories
router.get("/", async (req, res) => {
  try {
    const categories = await Category.find({});
    console.log(categories);
  } catch (error) {
    console.log(error);
  }
});

export { router as categoryRouter };
