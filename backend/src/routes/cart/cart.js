import { Router } from "express";
import { validateToken } from "../../middleware/user/validateToken.js";
import { User } from "../../db/models/user.js";
import _ from "underscore";
import { Product } from "../../db/models/products/product.js";
import { Order } from "../../db/models/orders/order.js";
import { Category } from "../../db/models/products/category.js";
const router = Router();
import nodeEvents from "../../nodeEvents/nodeEvents.js";
import { v4 } from "uuid";

// <------- Delete worker permanently FOREVER --------->>
router.delete(
  "/deleteWorkerPermanently/:workerId",
  validateToken,
  async (req, res) => {
    try {
      const workerId = req.params.workerId;
      const user = await User.findOne({ _id: req.userId });

      // Check if the worker exists in the user's workers array
      const foundWorker = user.workers.find((item) => item.id === workerId);
      if (!foundWorker) {
        res.status(404).json({ message: "העובד לא נמצא במערכת" });

        return nodeEvents.emit("update");
      }

      // Remove the worker from the workers array
      user.workers.pull(foundWorker);
      await user.save();

      // Return a success message
      res.json({ message: "עובד זה נמחק בהצלחה." });
      return nodeEvents.emit("update");
    } catch (error) {
      console.error(error);
      // Return an error message
      res.status(500).json({ message: "Internal server error" });
    }
  }
);
// <------- Sign a worker to Cart Item in user.cart ------->
router.post(
  "/signWorker/:workerId/:productId",
  validateToken,
  async (req, res) => {
    try {
      const workerId = req.params.workerId;
      const productId = req.params.productId;
      const user = await User.findOne({ _id: req.userId });
      const worker = await user.workers.find((item) => item.id === workerId);
      let foundProduct = user.cart.find(
        (item) => item.product.toString() === productId
      );
      if (!foundProduct.workers) {
        foundProduct.workers = [];
      }
      const isWorkerAlreadyInCartItem = foundProduct.workers.some(
        (worker) => worker.id === workerId
      );

      if (isWorkerAlreadyInCartItem === false) {
        if (foundProduct.quantity === foundProduct.workers.length) {
          res.json({ message: `עליך להוסיף כמות בשביל להוסיף עוד עובדים .` });
          return nodeEvents.emit("update");
        }
        foundProduct.workers.push(worker);
        // mark the modified field 'workers' in the foundProduct document
        foundProduct.markModified("workers");
        await user.save();
        res.status(200).json({ message: "העובד התווסף בהצלחה" });
        return nodeEvents.emit("update");
      } else {
        foundProduct.workers.pull(worker);
        foundProduct.markModified("workers");
        await user.save();
        res.json({ message: `העובד הוסר בהצלחה` });
        return nodeEvents.emit("update");
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Something went wrong" });
    }
  }
);

// -------- Add a worker to workers list in user.workers ----------
router.post("/addWorker", validateToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    const foundWorker = user.workers.find(
      (item) => item.name === req.body.name
    );
    if (foundWorker !== undefined) {
      return await res.json({
        message: "השם ששלחת קיים במערכת, אנא בחר שם אחר",
      });
    } else if (req.body.name === null) {
      return await res.json({
        message: `השם ששלחת לא תקין, הקלד שם ושלח שוב.`,
      });
    }
    user.workers = [...user.workers, { id: v4(), name: req.body.name }];
    await user.save();
    await res.json({ message: "העובד התווסף בהצלחה!" });
    return nodeEvents.emit("update");
  } catch (error) {
    console.log(error);
  }
});

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
// router.get("/", validateToken, async (req, res) => {
//   try {
//     const user = await User.findOne({ _id: req.userId });
//     let products = [];
//     const promises = user.cart.map(async (item) => {
//       const foundProduct = await Product.findOne({ _id: item.product });
//       const foundCategory = await Category.findOne({
//         _id: foundProduct.category,
//       });
//       const newproduct = {
//         _id: item.product,
//         title: foundProduct.title,
//         description: foundProduct.description,
//         category: foundCategory.name,
//         price: foundProduct.price,
//         quantity: item.quantity,
//       };
//       return newproduct;
//     });

//     products = await Promise.all(promises);

//     res.json(products);
//   } catch (error) {
//     console.log(error);
//   }
// });

// ---------- Create Package ----------
router.post("/createOrderPackage", validateToken, async (req, res, next) => {
  try {
    const user = await User.findById(req.userId).populate("cart.product");
    let cart = user.cart;

    if (cart.length === 0) {
      return res.json({ message: `סל הקניות שלך ריק!` });
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

    return nodeEvents.emit("update");
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
    const product = await Product.findOne({ _id: productId });
    const foundProductInCart = user.cart.find(
      (item) => item.product.toString() === productId
    );
    if (foundProductInCart.quantity === foundProductInCart.workers.length) {
      await res.json({
        message: `עליך להסיר שמות עובדים בשביל להוריד מהכמות של המוצר`,
      });
      return nodeEvents.emit("update");
    }

    if (!user) {
      return res.status(404).json({ message: "המשתמש לא קיים במערכת" });
    }

    const totalPrice = foundProductInCart.totalPrice - product.price;

    if (!user) {
      return res.status(404).json({ message: "המשתמש לא קיים במערכת" });
    }
    const isProductExistOnCart = user.cart.some(
      (item) => item.product.toString() === productId
    );
    if (isProductExistOnCart) {
      if (foundProductInCart.quantity === 1) {
        user.cart.pull(foundProductInCart);
        await user.save();
        return nodeEvents.emit("update");
      }

      await User.findOneAndUpdate(
        { _id: req.userId },
        {
          $inc: { "cart.$[elem].quantity": -1 },
          $set: { "cart.$[elem].totalPrice": totalPrice },
        },
        {
          new: true,
          arrayFilters: [{ "elem.product": productId }],
        }
      );

      res.json({ message: `הורדת כמות המוצר התבצעה בהצלחה` });

      return nodeEvents.emit("update");
    } else {
      res.status(500).json({ message: `המוצר אינו נמצא בסל הקניות` });
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
    const foundProduct = await Product.findOne({ _id: productId });
    const foundProductInCart = user.cart.find(
      (item) => item.product.toString() === productId
    );

    const totalPrice = foundProduct.price * (foundProductInCart.quantity + 1);
    if (!user) {
      return res.status(404).json({ message: "המשתמש לא קיים במערכת" });
    }
    const isProductExistOnCart = user.cart.some(
      (item) => item.product.toString() === productId
    );
    if (isProductExistOnCart) {
      await User.findOneAndUpdate(
        { _id: req.userId },
        {
          $inc: { "cart.$[elem].quantity": 1 },
          $set: { "cart.$[elem].totalPrice": totalPrice },
        },
        {
          new: true,
          arrayFilters: [{ "elem.product": productId }],
        }
      );

      res.json({ message: `הוספת כמות המוצר התבצעה בהצלחה` });

      return nodeEvents.emit("update");
    } else {
      res.status(500).json({ message: `המוצר אינו נמצא בסל הקניות` });
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
      res.status(404).json({ message: "המשתמש לא קיים במערכת" });
      return;
    }

    const cart = user.cart || [];
    const foundIndex = cart.findIndex(
      (item) => item.product.toString() === productId
    );

    if (foundIndex === -1) {
      res.status(404).json({ message: "המוצר אינו נמצא בסל הקניות" });
      return;
    }
    const foundProduct = user.cart.find(
      (item) => item.product.toString() === productId
    );
    user.cart.pull(foundProduct);
    await user.save();

    res.json({ message: "המוצר נמחק מסל הקניות בהצלחה" });
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
      res.status(404).json({ message: "המשתמש לא קיים במערכת" });
      return;
    }

    const cart = user.cart || [];
    const isProductAlreadyInCart = cart.some(
      (item) => item.product.toString() === productId
    );
    if (isProductAlreadyInCart) {
      res.json({ message: `המוצר הזה כבר נמצא בסל הקניות` });
    } else {
      const cartItem = new CartItem({
        product: productId,
        quantity: 1,
        totalPrice: product?.price,
      });
      cart.push(cartItem);
      user.cart = cart;
      await user.save();
      res.json({ message: `המוצר התווסף לסל בהצלחה` });
      return nodeEvents.emit("update");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export { router as cartRouter };
