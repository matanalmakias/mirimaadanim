import { Router } from "express";
import { validateToken } from "../../middleware/user/validateToken.js";
import _, { pick } from "underscore";
import { isManager } from "../../middleware/roles/isManager.js";
import nodeEvents from "../../nodeEvents/nodeEvents.js";
import { Day } from "../../db/models/day.js";
import { Product } from "../../db/models/products/product.js";
import { User } from "../../db/models/user.js";
const router = Router();

// <------------ decrement Quantity of product -------------->
router.post("/decQuan/:productId", validateToken, async (req, res) => {
  try {
    const productId = req.params.productId;
    const user = await User.findOne({ _id: req.userId });
    const product = user.dailyCart.find(
      (item) => item.product._id.toString() === productId
    );
    if (!product) {
      return res.json({ message: `המוצר לא קיים בסל` });
    }
    product.quantity = product.quantity - 1;
    product.totalPrice = product.totalPrice - product.product.price;
    await user.save();
    res.json({ message: `ירידת הכמות התבצעה.` });
    return nodeEvents.emit("update");
  } catch (error) {
    console.log(error);
  }
});
// <------------ increment Quantity of product -------------->
router.post("/incQuan/:productId", validateToken, async (req, res) => {
  try {
    const productId = req.params.productId;
    const user = await User.findOne({ _id: req.userId });
    const product = user.dailyCart.find(
      (item) => item.product._id.toString() === productId
    );
    if (!product) {
      return res.json({ message: `המוצר לא קיים בסל` });
    }
    product.quantity = product.quantity + 1;
    product.totalPrice = product.quantity * product.product.price;
    await user.save();
    res.json({ message: `תוספת הכמות התבצעה.` });
    return nodeEvents.emit("update");
  } catch (error) {
    console.log(error);
  }
});
// <<----------- Edit Days In WeeklyCart Product ------------>>
router.post(
  "/EditDays/:productId/:dayName",
  validateToken,
  async (req, res) => {
    try {
      const { dayName, productId } = req.params;
      const user = await User.findOne({ _id: req.userId });
      const product = user.dailyCart.find(
        (item) => item.product._id.toString() === productId
      );
      const isDayAlreadySet = product.days.some((item) => item === dayName);
      if (isDayAlreadySet === true) {
        return res.json({ message: `היום שניסית להגדיר כבר קיים.` });
      }
      product.days.push(dayName);
      await user.save();
      res.json({ message: `הוספת היום התבצעה` });
      return nodeEvents.emit("update");
    } catch (error) {
      console.log(error);
    }
  }
);
// <<----------- Add Product To Weekly Cart SomeDays ------------>>
router.post("/addProduct/:productId", validateToken, async (req, res) => {
  try {
    const productId = req.params.productId;
    const user = await User.findOne({ _id: req.userId });
    const product = await Product.findOne({ _id: productId });
    const isProductInCart = user.dailyCart.some(
      (item) => item.product._id.toString() === productId
    );
    if (isProductInCart === true) {
      return res.json({ message: `המוצר כבר נמצא בסל הקניות השבועי` });
    }
    user.dailyCart.push({
      product,
      totalPrice: product.price,
    });
    await user.save();
    res.json({ message: `המוצר התווסף בהצלחה.` });
    return nodeEvents.emit("update");
  } catch (error) {
    console.log(error);
  }
});
// <<----------- Remove Product From Weekly Cart SomeDays ------------>>
router.delete("/removeProduct/:productId", validateToken, async (req, res) => {
  try {
    const productId = req.params.productId;
    const user = await User.findOne({ _id: req.userId });
    const product = await Product.findOne({ _id: productId });
    const isProductInCart = user.dailyCart.some(
      (item) => item.product._id.toString() === productId
    );
    if (isProductInCart === false) {
      return res.json({ message: `המוצר לא נמצא בסל הקניות השבועי` });
    }
    const foundProductInCart = user.dailyCart.find(
      (item) => item.product._id.toString() === productId
    );

    user.dailyCart.pull(foundProductInCart);
    await user.save();
    res.json({ message: `המוצר הוסר בהצלחה.` });
    return nodeEvents.emit("update");
  } catch (error) {
    console.log(error);
  }
});

export { router as daysRouter };
