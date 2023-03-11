import { Router } from "express";
import { validateToken } from "../../middleware/user/validateToken.js";
import _, { pick, uniqueId } from "underscore";
import nodeEvents from "../../nodeEvents/nodeEvents.js";
import { Product } from "../../db/models/products/product.js";
import { User } from "../../db/models/user.js";
import { WeeklyOrder } from "../../db/models/orders/weeklyOrder.js";
import { isManager } from "../../middleware/roles/isManager.js";
const router = Router();

// <<--------------- Create A Order ------------------>>
router.post("/createOrder", validateToken, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.userId });
    if (!user.weeklyCart || user.weeklyCart.length === 0) {
      return res.json({ message: "הסל ריק" });
    }
    if (user.isComplete === false) {
      return res.json({ message: `מלא את פרטיך לפני שתוכל ליצור הזמנה` });
    }
    const totalPriceArr = user.weeklyCart.map((item) => item.totalPrice);
    const sumedTotalPrice = totalPriceArr.reduce((acc, val) => acc + val, 0);
    const pointsEarned = sumedTotalPrice / 2; // calculate the points earned
    user.points += pointsEarned; // add the points to the user's total points

    const order = new WeeklyOrder({
      user: user._id,
      items: user.weeklyCart,
      total: sumedTotalPrice,
      pointsEarned,
    });
    await order.save();
    user.weeklyOrders.push(order._id); // add the order to the user's list of weekly orders
    user.weeklyCart = []; // clear the weekly cart
    await user.save();
    res.json({ message: "ההזמנה בוצעה!", order });
    return nodeEvents.emit("update");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "שגיאה ביצירת הזמנה" });
  }
});

// <<------------ Delete All Weekly Orders ------------>>
router.delete("/deleteAll", validateToken, isManager, async (req, res) => {
  await WeeklyOrder.deleteMany({});
  res.json({ message: `כל המסמכים נמחקו` });
  return nodeEvents.emit("update");
});
// <<----------- Add Product To Weekly Cart SomeDays ------------>>
router.post("/addProduct/:productId", validateToken, async (req, res) => {
  const productId = req.params.productId;
  const user = await User.findOne({ _id: req.userId });
  const product = await Product.findOne({ _id: productId });
  const isProductInCart = user.weeklyCart?.some(
    (item) => item.product._id.toString() === productId
  );
  if (isProductInCart === true) {
    return res.json({ message: `המוצר כבר נמצא בסל הקניות השבועי` });
  }
  user.weeklyCart?.push({
    product: product._id,
    days: req.body.days,
    quantity: 1,
    totalPrice: product.price,
  });
  await user.save();
  res.json({ message: `המוצר התווסף בהצלחה.` });
  return nodeEvents.emit("update");
});

// <------------ Schudle Delivery Time For Each Day ------------>>
router.post("/schudleDelivery/:productId", validateToken, async (req, res) => {
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
});
// <<----------- Get DisCount Of Full Order Button -------------->>
router.post("/getDisFullOrder", validateToken, async (req, res) => {
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
});

// <------------ decrement Quantity of product -------------->
router.post("/decQuan/:productId", validateToken, async (req, res) => {
  try {
    const productId = req.params.productId;
    const user = await User.findOne({ _id: req.userId });
    const product = user.weeklyCart.find(
      (item) => item.product.toString() === productId
    );

    if (!product) {
      return res.json({ message: `המוצר לא קיים בסל` });
    }

    product.quantiy = product.quantiy - 1;

    await user.save();

    res.json({ message: `ירידת הכמות התבצעה.` });
    return nodeEvents.emit("update");
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "שגיאה פנימית של השרת" });
  }
});
// <------------ increment Quantity of product -------------->
router.post("/incQuan/:productId", validateToken, async (req, res) => {
  try {
    const productId = req.params.productId;
    const user = await User.findOne({ _id: req.userId });
    const product = user.weeklyCart.find(
      (item) => item.product.toString() === productId
    );

    if (!product) {
      return res.json({ message: `המוצר לא קיים בסל` });
    }

    product.quantiy = product.quantiy + 1;

    await user.save();

    res.json({ message: `תוספת הכמות התבצעה.` });
    return nodeEvents.emit("update");
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "שגיאה פנימית של השרת" });
  }
});

// <<----------- Edit Days In WeeklyCart Product ------------>>
router.post(
  "/EditDays/:productId/:dayName",
  validateToken,
  async (req, res) => {
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
  }
);

// <<----------- Remove Product From Weekly Cart SomeDays ------------>>
router.delete("/removeProduct/:productId", validateToken, async (req, res) => {
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
});

export { router as weeklyRouter };
