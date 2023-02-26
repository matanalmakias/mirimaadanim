import { Router } from "express";
import { validateToken } from "../../middleware/user/validateToken.js";
import { User } from "../../db/models/user.js";
import _ from "underscore";
import { Product } from "../../db/models/product.js";
import { Order } from "../../db/models/order.js";
import { CartItem } from "../../db/models/cart.js";
import { mongoose } from "mongoose";
const router = Router();

router.get("/isProductInCart/:productId", validateToken, async (req, res) => {
  const productId = req.params.productId;
  const user = await User.findOne({ _id: req.userId });
  const cart = user.cart;
  const foundProduct = cart.some(
    (item) => item.product.toString() === productId
  );
  res.json({ message: foundProduct });
});

export { router as isQuestionsRouter };
