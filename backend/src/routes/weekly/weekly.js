import { Router } from "express";
import { validateToken } from "../../middleware/user/validateToken.js";
import _, { pick } from "underscore";
import { isManager } from "../../middleware/roles/isManager.js";
import stripe from ('stripe')('YOUR_SECRET_API_KEY');

import nodeEvents from "../../nodeEvents/nodeEvents.js";
import { Day } from "../../db/models/day.js";
import { Product } from "../../db/models/product.js";
import { User } from "../../db/models/user.js";
const router = Router();

// <------------ Schudle Delivery Time For Each Day ------------>>
router.post("/schudleDelivery/:productId", validateToken, async (req, res) => {
  try {
    const productId = req.params.productId;
    const date = req.body.date;
    const deliveryTime = req.params.deliveryTime;
    const user = await User.findOne({ _id: req.userId });
    const product = user.weeklyCart.find(
      (item) => item.product._id.toString() === productId
    );
    product.deliveryTime = date;
    await user.save();
    res.json({ message: `המשלוח תוזמן` });

    return nodeEvents.emit("update");
  } catch (error) {
    console.log(error);
  }
});
// <<----------- Get DisCount Of Full Order Button -------------->>
router.post("/getDisFullOrder", validateToken, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.userId });
    user.weeklyCart = user.weeklyCart.map((item) => {
      let discount = 0;
      if (item.days.length >= 2 && item.days.length < 3) {
        discount = 2.5;
      } else if (item.days.length >= 3 && item.days.length < 4) {
        discount = 5;
      } else if (item.days.length >= 4 && item.days.length < 5) {
        discount = 7.5;
      } else if (item.days.length >= 5 && item.days.length < 6) {
        discount = 10;
      } else if (item.days.length >= 6) {
        discount = 12.5;
      }
      return {
        ...item,
        discount,
        totalPrice: item.totalPrice * (1 - discount / 100),
      };
    });

    await user.save();
    res.status(200).json({ message: "Discount applied successfully" });

    return nodeEvents.emit("update");
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// <------------ decrement Quantity of product -------------->
router.post("/decQuan/:productId", validateToken, async (req, res) => {
  try {
    const productId = req.params.productId;
    const user = await User.findOne({ _id: req.userId });
    const product = user.weeklyCart.find(
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
    const product = user.weeklyCart.find(
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
      const product = user.weeklyCart.find(
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
router.post(
  "/addProductToWeekly/:productId",
  validateToken,
  async (req, res) => {
    try {
      const productId = req.params.productId;
      const user = await User.findOne({ _id: req.userId });
      const product = await Product.findOne({ _id: productId });
      const isProductInCart = user.weeklyCart.some(
        (item) => item.product._id.toString() === productId
      );
      if (isProductInCart === true) {
        return res.json({ message: `המוצר כבר נמצא בסל הקניות השבועי` });
      }
      user.weeklyCart.push({
        product,
        days: req.body.days,
        totalPrice: product.price,
      });
      await user.save();
      res.json({ message: `המוצר התווסף בהצלחה.` });
      return nodeEvents.emit("update");
    } catch (error) {
      console.log(error);
    }
  }
);
// <<----------- Remove Product From Weekly Cart SomeDays ------------>>
router.delete(
  "/removeProductToWeekly/:productId",
  validateToken,
  async (req, res) => {
    try {
      const productId = req.params.productId;
      const user = await User.findOne({ _id: req.userId });
      const product = await Product.findOne({ _id: productId });
      const isProductInCart = user.weeklyCart.some(
        (item) => item.product._id.toString() === productId
      );
      if (isProductInCart === false) {
        return res.json({ message: `המוצר לא נמצא בסל הקניות השבועי` });
      }
      const foundProductInCart = user.weeklyCart.find(
        (item) => item.product._id.toString() === productId
      );

      user.weeklyCart.pull(foundProductInCart);
      await user.save();
      res.json({ message: `המוצר הוסר בהצלחה.` });
      return nodeEvents.emit("update");
    } catch (error) {
      console.log(error);
    }
  }
);

export { router as weeklyRouter };
