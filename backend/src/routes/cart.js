import { Router } from "express";
import { validateToken } from "../middleware/user/validateToken.js";
import { User } from "../db/models/user.js";
import _ from "underscore";
import { Product } from "../db/models/product.js";
import { Order } from "../db/models/order.js";
import { mongoose } from "mongoose";
const router = Router();
// ---------- Decrement Product Quantity ----------
router.post(
  "/decQuantity/:productId",
  validateToken,
  async (req, res, next) => {
    const productId = req.params.productId;
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isProductExistOnCart = user.cart.some(
      (item) => item._id === productId
    );

    if (isProductExistOnCart) {
      const result = await User.updateOne(
        { _id: req.userId, "cart._id": productId },
        { $inc: { "cart.$.quantity": -1 } }
      );
      res.json({ message: `Cart decrement successfully` });
    } else {
      res.status(500).json({ message: `The product is not exist on cart` });
      next();
    }
  }
);
// ---------- Increment Product Quantity ----------
router.post(
  "/incQuantity/:productId",
  validateToken,
  async (req, res, next) => {
    const productId = req.params.productId;
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isProductExistOnCart = user.cart.some(
      (item) => item._id === productId
    );

    if (isProductExistOnCart) {
      const result = await User.updateOne(
        { _id: req.userId, "cart._id": productId },
        { $inc: { "cart.$.quantity": 1 } }
      );
      res.json({ message: `Cart increment successfully` });
    } else {
      res.status(500).json({ message: `The product is not exist on cart` });
      next();
    }
  }
);

// --------- Checkout ---------
router.post("/uploadCart", validateToken, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.userId });
    for (let product of user.cart) {
      const foundProduct = await Product.findOne({ _id: product }).populate(
        "category"
      );
      console.log(foundProduct);
    }
  } catch (error) {
    console.log(error);
  }
});

// --------- Remove From Cart ---------
router.delete("/deleteFromCart/:productId", validateToken, async (req, res) => {
  try {
    const productId = req.params.productId;
    const userId = req.userId;

    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const cart = user.cart || [];
    const foundIndex = cart.findIndex(
      (item) => item._id === productId.toString()
    );
    if (foundIndex === -1) {
      res.status(404).json({ message: "Product not found in cart" });
      return;
    }
    const foundProduct = user.cart.find((item) => item._id === productId);

    user.cart.pull(foundProduct);
    await user.save();

    res.json({ message: "Product deleted from cart" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// --------- Add To Cart ---------
router.post("/addToCart/:productId", validateToken, async (req, res) => {
  try {
    const productId = req.params.productId;
    const userId = req.userId;

    const product = await Product.findById(productId).populate("category");
    const user = await User.findById(userId);

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const cart = user.cart || [];
    const isProductAlreadyInCart = cart.some(
      (item) => item._id === productId.toString()
    );

    if (isProductAlreadyInCart) {
      res.json({ message: `This product is already in cart` });
    } else {
      cart.push({ _id: productId, quantity: 1 });
      user.cart = cart;
      await user.save();
      res.json({ message: `Product added to cart` });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export { router as cartRouter };
