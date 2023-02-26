import { Router } from "express";
import { validateToken } from "../../middleware/user/validateToken.js";
import { User } from "../../db/models/user.js";
import _ from "underscore";
import { Product } from "../../db/models/product.js";
import { Order } from "../../db/models/order.js";

const router = Router();

// GET single ProductS
router.get("/:id", validateToken, async (req, res) => {
  const id = req.params.id;
  const user = await User.findOne({ _id: req.userId });
  const foundProduct = user.cart.some((item) => item.product.toString() === id);
  await Product.findOne({ _id: id })
    .then((product) => {
      res.json({ product, isProductInCart: foundProduct });
    })
    .catch((e) => res.status(500).json({ message: "Error", error: e }));
});
// GET All ProductS
router.get("/", async (req, res) => {
  try {
    const products = await Product.find({});
    res.json({
      product: products,
      message: `This is all the products of catering`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

export { router as productRouter };
