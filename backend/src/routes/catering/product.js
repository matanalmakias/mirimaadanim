import { Router } from "express";
import { validateToken } from "../../middleware/user/validateToken.js";
import { User } from "../../db/models/user.js";
import _ from "underscore";
import { Product } from "../../db/models/product.js";
import { Category } from "../../db/models/category.js";
import mongoose from "mongoose";
const router = Router();

// GET single ProductS
router.get("/:id", validateToken, async (req, res) => {
  const id = req.params.id;
  const user = await User.findOne({ _id: req.userId });
  const foundProduct = user.cart.some((item) => item.product.toString() === id);
  await Product.findOne({ _id: id })
    .then(async (product) => {
      const foundCategory = await Category.findOne({
        _id: mongoose.Types.ObjectId(product.category),
      });
      res.json({
        product: { ...product.toObject(), category: foundCategory.toObject() },
        isProductInCart: foundProduct,
      });
      console.log(foundCategory.name);
    })
    .catch((e) => res.status(500).json({ message: "Error", error: e }));
});
// GET All ProductS
router.get("/", async (req, res) => {
  try {
    const products = await Product.find({});
    const productsToSend = await Promise.all(
      products.map(async (item) => {
        const foundCategory = await Category.findOne({
          _id: mongoose.Types.ObjectId(item.category),
        });
        return {
          title: item.title,
          description: item.description,
          price: item.price,
          image: item.image,
          category: foundCategory.name,
          days: item.days,
          id: item._id,
        };
      })
    );
    res.json({
      product: productsToSend,
      message: `This is all the products of catering`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

export { router as productRouter };
