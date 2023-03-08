import { Router } from "express";
import { validateToken } from "../../middleware/user/validateToken.js";
import _ from "underscore";
import { isManager } from "../../middleware/roles/isManager.js";

import nodeEvents from "../../nodeEvents/nodeEvents.js";
import { Day } from "../../db/models/day.js";
import { Product } from "../../db/models/product.js";
const router = Router();

// <---------- Remove Product From Some Day ---------->
router.put(
  "/removeProduct/:productId/:dayName",
  validateToken,
  isManager,
  async (req, res) => {
    try {
      const { productId, dayName } = req.params;
      const foundDay = await Day.findOne({ name: dayName });
      const foundProduct = await Product.findOne({ _id: productId });
      if (!foundProduct) {
        return res.status(404).json({ message: "המוצר לא נמצא במערכת." });
      }
      if (
        !foundDay.products.some(
          (item) => item._id.toString() === foundProduct._id.toString()
        )
      ) {
        return res.json({ message: "המוצר לא נמצא ברשימה" });
      }
      foundDay.products.pull(foundProduct);
      await foundDay.save();
      res.json({ message: "המוצר הוסר בהצלחה מהרשימה." });
      return nodeEvents.emit("update");
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "ישנה שגיאה בהוספת המוצר." });
    }
  }
);

// <---------- Add Product to Some Day ---------->
router.put(
  "/addProduct/:productId/:dayName",
  validateToken,
  isManager,
  async (req, res) => {
    try {
      const { productId, dayName } = req.params;
      const foundDay = await Day.findOne({ name: dayName });
      const foundProduct = await Product.findOne({ _id: productId });

      if (!foundProduct) {
        return res.status(404).json({ message: "המוצר לא נמצא במערכת." });
      }

      if (
        foundDay.products.some(
          (item) => item._id.toString() === foundProduct._id.toString()
        )
      ) {
        return res.json({ message: "המוצר כבר נמצא ברשימה" });
      }

      foundDay.products.push(foundProduct);
      await foundDay.save();
      res.status(200).json({ message: "המוצר התווסף בהצלחה ליום ראשון." });

      return nodeEvents.emit("update");
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
