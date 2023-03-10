import { Router } from "express";
import _ from "underscore";
import { Product } from "../../db/models/products/product.js";
import { Category } from "../../db/models/products/category.js";
const router = Router();
import { validateToken } from "../../middleware/user/validateToken.js";
import { isManager } from "../../middleware/roles/isManager.js";
import nodeEvents from "../../nodeEvents/nodeEvents.js";
import multer from "multer";

// Set up multer storage options
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// -------- Give Discount ---------

// -------- DELETE All Products --------
router.delete(
  "/product/deleteAll",
  validateToken,
  isManager,
  async (req, res) => {
    try {
      await Product.deleteMany({});
      res.json({ message: `All Products are deleted!` });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ error: "Unable to delete all Products" });
    }
  }
);

// -------- CREATE Product --------
router.post(
  "/product/createProduct",
  validateToken,
  isManager,
  upload.single("image"),
  async (req, res) => {
    try {
      let body = _.pick(req.body, "title", "description", "price", "category");

      // Check if a file was uploaded
      if (req.file) {
        let image = req.file.path;
        image = image.replace(/\\/g, "/");
        body.image = image.replace("public/", "");
      }

      // // Check if the category already exists
      let category = await Category.findOne({ name: body.category });

      if (!category) {
        //   //   // If the category does not exist, create a new category
        category = new Category({
          name: body.category,
        });

        await category.save();
      }

      // // // Create a new product with the specified category
      const newProduct = new Product({
        title: body.title,
        description: body.description,
        price: body.price,
        category: category.name,
        image: body.image,
      });

      const savedProduct = await newProduct.save();

      const product = await Product.findById(savedProduct._id)
        .populate("category", "name")
        .select("id title description price category image");

      res.status(201).json({
        message: "Product item created successfully",
        product,
      });
      return nodeEvents.emit("update");
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Unable to create Product item" });
    }
  }
);

// -------- Edit Product --------
router.post(
  "/product/editProduct/:productId",
  validateToken,
  isManager,
  async (req, res) => {
    try {
      const body = _.pick(
        req.body,
        "title",
        "description",
        "price",
        "category"
      );

      const productId = req.params.productId;
      const product = await Product.findOneAndUpdate(
        { _id: productId },
        {
          title: body.title,
          description: body.description,
          price: body.price,
          category: body.category,
        }
      );
      if (product) {
        // The product was updated successfully
        res.status(200).json({ message: "המוצר עודכן בהצלחה." });
        return nodeEvents.emit("update");
      } else {
        // The product was not found
        res.status(404).json({ message: "המוצר אינו נמצא." });
      }
    } catch (error) {
      // An error occurred during the update process
      console.log(error);
      res.status(500).json({ message: "Server error" });
    }
  }
);

// -------- Delete Product --------
router.delete(
  "/product/deleteProduct/:productId",
  validateToken,
  isManager,
  async (req, res) => {
    try {
      const productId = req.params.productId;
      const product = await Product.deleteOne({ _id: productId });
      if (product.deletedCount === 1) {
        // The product was deleted successfully
        res.status(200).json({ message: " המוצר נמחק." });
        return nodeEvents.emit("update");
      } else {
        // The product was not found
        res.status(404).json({ message: "Product not found" });
      }
    } catch (error) {
      // An error occurred during the deletion process
      console.log(error);
      res.status(500).json({ message: "Server error" });
    }
  }
);

export { router as managerRouter };
