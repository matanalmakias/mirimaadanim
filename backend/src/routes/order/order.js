import { Router } from "express";
import { validateToken } from "../../middleware/user/validateToken.js";
import { User } from "../../db/models/user.js";
import _ from "underscore";
import { Product } from "../../db/models/products/product.js";
import { Order } from "../../db/models/orders/order.js";
import { Category } from "../../db/models/products/category.js";
import { CartItem } from "../../db/models/cart/cart.js";
import { mongoose } from "mongoose";
const router = Router();
import nodeEvents from "../../nodeEvents/nodeEvents.js";

// <------- Get Single Order Product --------->
router.get("/:orderId", validateToken, async (req, res) => {
  try {
    const orderId = req.params.orderId; // <-- Extract orderId from request params
    const order = await Order.findById(orderId); // <-- Find by _id using findById
    res.json(order);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error"); // <-- Send error response
  }
});

// <------- Get All Order Products --------->
router.get("/", validateToken, async (req, res) => {
  try {
    const orders = await Order.find(); // <-- Remove unnecessary object
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error"); // <-- Send error response
  }
});
export { router as orderRouter };
