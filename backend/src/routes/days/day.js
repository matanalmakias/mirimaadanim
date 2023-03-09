import { Router } from "express";
import { validateToken } from "../../middleware/user/validateToken.js";
import _, { pick } from "underscore";
import { isManager } from "../../middleware/roles/isManager.js";

import nodeEvents from "../../nodeEvents/nodeEvents.js";
import { Day } from "../../db/models/day.js";
import { Product } from "../../db/models/product.js";
import { User } from "../../db/models/user.js";
const router = Router();

// <<--------- Remove Product From Daily Cart ---------->>
router.delete("/addToCart/:productId", validateToken, async (req, res) => {
  try {
    const productId = req.params.productId;
    const product = await Product.findOne({ _id: productId });
    const user = await User.findOne({ _id: req.userId });
    const isProductInCart = user.dailyCart.some(
      (item) => item._id.toString() === productId
    );
    if (isProductInCart === false) {
      return res.json({ message: `המוצר לא נמצא בסל הקניות` });
    }
    user.dailyCart.pull(product);
    await user.save();
    res.json({ message: `המוצר התווסף בהצלחה.` });
    return nodeEvents.emit("update");
  } catch (error) {
    console.log(error);
  }
});
// <<--------- Add Product To Daily Cart ---------->>
router.post("/addToCart/:productId", validateToken, async (req, res) => {
  try {
    const productId = req.params.productId;
    const product = await Product.findOne({ _id: productId });
    const user = await User.findOne({ _id: req.userId });
    const isProductInCart = user.dailyCart.some(
      (item) => item._id.toString() === productId
    );
    if (isProductInCart === true) {
      return res.json({ message: `המוצר כבר נמצא בסל הקניות` });
    }
    user.dailyCart.push(product);
    await user.save();
    res.json({ message: `המוצר התווסף בהצלחה.` });
    return nodeEvents.emit("update");
  } catch (error) {
    console.log(error);
  }
});
// <---------- Remove Product From Some Day ---------->
router.put(
  "/removeProduct/:productId",
  validateToken,
  isManager,
  async (req, res) => {
    try {
      const { productId } = req.params;
      const dayNames = req.body;
      const foundProduct = await Product.findOne({ _id: productId });
      if (!foundProduct) {
        return res.status(404).json({ message: "המוצר לא נמצא במערכת." });
      }

      // Remove product from each day's products array
      for (let dayName of dayNames) {
        const foundDay = await Day.findOne({ name: dayName });

        if (!foundDay) {
          return res
            .status(404)
            .json({ message: `היום ${dayName} לא נמצא במערכת.` });
        }

        foundDay.products = foundDay.products.filter(
          (item) => item._id.toString() !== foundProduct._id.toString()
        );

        await foundDay.save();
      }

      // Remove day names from product's days array
      foundProduct.days = foundProduct.days.filter(
        (dayName) => !dayNames.includes(dayName)
      );

      await foundProduct.save();
      res.json({ message: "המוצר הוסר בהצלחה מהרשימה." });
      return nodeEvents.emit("update");
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "ישנה שגיאה בהסרת המוצר." });
    }
  }
);

// <---------- Add Product to Some Day ---------->
router.put(
  "/addProduct/:productId",
  validateToken,
  isManager,
  async (req, res) => {
    try {
      const { productId } = req.params;
      const { days } = req.body;
      const foundProduct = await Product.findOne({ _id: productId });

      if (!foundProduct) {
        return res.status(404).json({ message: "המוצר לא נמצא במערכת." });
      }

      for (let day of days) {
        const foundDay = await Day.findOne({ name: day });

        if (!foundDay) {
          return res
            .status(404)
            .json({ message: `היום ${day} לא נמצא במערכת.` });
        }

        if (
          foundDay.products.some(
            (item) => item._id.toString() === foundProduct._id.toString()
          )
        ) {
          return res.json({ message: `המוצר כבר נמצא ביום ${day}` });
        }

        foundProduct.days = [...foundProduct.days, day];
        foundDay.products.push(foundProduct);
        await foundDay.save();
        await foundProduct.save();
        nodeEvents.emit("update");
      }

      res.status(200).json({ message: "המוצר התווסף בהצלחה לימים שנבחרו." });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "ישנה שגיאה בהוספת המוצר." });
    }
  }
);

// <--------- Get Products from Some Day --------->
router.get("/:dayName", async (req, res) => {
  const dayName = req.params.dayName;
  const foundDay = await Day.findOne({ name: dayName });
  if (!foundDay) {
    return res.json({ message: `היום שביקשת אינו נמצא במערכת.` });
  }
  return res.json(foundDay.products);
});

export { router as daysRouter };
