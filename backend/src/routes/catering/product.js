import { Router } from "express";
import { validateToken } from "../../middleware/user/validateToken.js";
import { User } from "../../db/models/user.js";
import _ from "underscore";
import { Product } from "../../db/models/product.js";
import { Order } from "../../db/models/order.js";

const router = Router();

// GET single ProductS
router.get("/:id", (req, res) => {
  const id = req.params.id;
  Product.findOne({ _id: id })
    .then((products) => {
      res.json(products);
    })
    .catch((e) => res.status(500).json({ message: "Error", error: e }));
});
// GET All ProductS
router.get("/", async (req, res) => {
  try {
    const Products = await Product.find({});
    res.send(products);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

// --------- Add To Cart ---------
router.post("/addToCart/:productId", validateToken, async (req, res) => {
  try {
    const productId = req.params.productId;
    const userId = req.userId;

    const product = await Product.findOne({ _id: productId });
    const user = await User.findOne({ _id: userId });

    if (!userId) {
      res.status(400).json({ message: "Invalid user ID" });
      return;
    }
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    if (!user.cart) {
      user.cart = [];
    }
    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }

    const isProductAlreadyInCart = user.cart.some(
      (item) => item._id === productId
    );
    if (isProductAlreadyInCart) {
      res.json({ message: `This product is already in cart` });
    } else {
      user.cart.push(product);
      await user.save();
      res.json({ message: `Product added to cart` });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// --------- Remove From Cart ---------
router.delete("/deleteFromCart/:productId", validateToken, async (req, res) => {
  try {
    const productId = req.params.productId;
    const userId = req.userId;

    const user = await User.findOne({ _id: userId });
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const foundProduct = user.cart.find((item) => item.id === productId);
    if (!foundProduct) {
      res.status(404).json({ message: "Product not found in cart" });
      return;
    }

    user.cart.pull(foundProduct);
    await user.save();

    res.json({ message: "Product deleted from cart" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// --------- Checkout ---------
router.post("/checkout", validateToken, async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findOne({ _id: userId }).populate("cart.product");

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    if (user.cart.length === 0) {
      res.status(400).json({ message: "Cart is empty" });
      return;
    }

    const order = new Order({
      user: user._id,
      items: user.cart.map((cartItem) => ({
        product: cartItem.product._id,
        name: cartItem.product.title,
        quantity: cartItem.quantity,
        price: cartItem.product.price,
      })),
      total: user.cart.reduce(
        (acc, cartItem) => acc + cartItem.product.price * cartItem.quantity,
        0
      ),
    });

    await order.save();
    user.cart = [];
    await user.save();

    res.status(200).json({ message: "Order created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export { router as productRouter };
