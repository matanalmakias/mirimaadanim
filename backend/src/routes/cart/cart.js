import { Router } from "express";
import { validateToken } from "../../middleware/user/validateToken.js";
import { User } from "../../db/models/user.js";
import _ from "underscore";
import { Product } from "../../db/models/product.js";
import { Order } from "../../db/models/order.js";
import { Category } from "../../db/models/category.js";
import { CartItem } from "../../db/models/cart.js";
import { mongoose } from "mongoose";
const router = Router();
import nodeEvents from "../../nodeEvents/nodeEvents.js";

// <------- Get Single Cart Product -------->
router.get("/:productId", validateToken, async (req, res) => {
  try {
    const productId = req.params.productId;
    const user = await User.findOne({
      _id: req.userId,
      "cart.product": productId,
    });

    res.json(user.cart[0]);
  } catch (error) {
    console.log(error);
  }
});
// <------- Get All Cart Products -------->
router.get("/", validateToken, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.userId });
    let products = [];
    const promises = user.cart.map(async (item) => {
      const foundProduct = await Product.findOne({ _id: item.product });
      const foundCategory = await Category.findOne({
        _id: foundProduct.category,
      });
      const newproduct = {
        _id: item.product,
        title: foundProduct.title,
        description: foundProduct.description,
        category: foundCategory.name,
        price: foundProduct.price,
        quantity: item.quantity,
      };
      return newproduct;
    });

    products = await Promise.all(promises);

    res.json(products);
  } catch (error) {
    console.log(error);
  }
});

// ---------- Create Package ----------
router.post("/createOrderPackage", validateToken, async (req, res, next) => {
  try {
    const user = await User.findById(req.userId).populate("cart.product");
    let cart = user.cart;

    if (cart.length === 0) {
      return res.json({ message: `Cart is empty!` });
    }

    let totalPrice = 0;

    for (let i = 0; i < cart.length; i++) {
      const item = cart[i].product;

      const quantity = cart[i].quantity;
      const price = item.price;
      totalPrice += quantity * price;
    }

    const order = new Order({
      user: user._id,
      items: cart,
      total: totalPrice,
    });

    user.cart = [];

    await user.save();
    await order.save();
    res.json({ order: order, totalPrice });
    console.log(user);
  } catch (err) {
    console.error(err);
  }
});

// <---------- Decrement Product Quantity ---------->
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
      (item) => item.product.toString() === productId
    );
    if (isProductExistOnCart) {
      await User.findOneAndUpdate(
        { _id: req.userId, "cart.product": productId },
        { $inc: { "cart.$.quantity": -1 } },
        { new: true }
      );
      res.json({ message: `Cart decrement successfully` });

      return nodeEvents.emit("update");
    } else {
      res.status(500).json({ message: `The product is not exist on cart` });
      next();
    }
  }
);

// <---------- Increment Product Quantity ---------->
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
      (item) => item.product.toString() === productId
    );
    if (isProductExistOnCart) {
      await User.findOneAndUpdate(
        { _id: req.userId, "cart.product": productId },
        { $inc: { "cart.$.quantity": 1 } },
        { new: true }
      );
      res.json({ message: `Cart increment successfully` });

      return nodeEvents.emit("update");
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
      const foundProduct = await Product.findOne({ _id: product });
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
      (item) => item.product.toString() === productId
    );

    if (foundIndex === -1) {
      res.status(404).json({ message: "Product not found in cart" });
      return;
    }
    const foundProduct = user.cart.find(
      (item) => item.product.toString() === productId
    );
    user.cart.pull(foundProduct);
    await user.save();

    res.json({ message: "Product deleted from cart" });
    return nodeEvents.emit("update");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// --------- Add To Cart ---------
router.post("/addToCart/:productId", validateToken, async (req, res) => {
  try {
    const productId = req.params.productId.toString();
    const userId = req.userId;

    const product = await Product.findById(productId);
    const user = await User.findById(userId);

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const cart = user.cart || [];
    const isProductAlreadyInCart = cart.some(
      (item) => item.product.toString() === productId
    );
    if (isProductAlreadyInCart) {
      res.json({ message: `This product is already in cart` });
    } else {
      const cartItem = new CartItem({ product: productId, quantity: 1 });
      cart.push(cartItem);
      user.cart = cart;
      await user.save();
      res.json({ message: `Product added to cart` });
      return nodeEvents.emit("update");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export { router as cartRouter };
