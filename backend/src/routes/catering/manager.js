import { Router } from "express";
import _ from "underscore";
import { Product } from "../../db/models/product.js";
const router = Router();
import { validateToken } from "../../middleware/user/validateToken.js";
import { isManager } from "../../middleware/roles/isManager.js";
import shortid from "shortid";
import { mongoose } from "mongoose";

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
  async (req, res) => {
    try {
      const body = _.pick(
        req.body,
        "title",
        "description",
        "price",
        "category"
      );

      const newProduct = new Product({
        name: "Product name",
        description: "Product description",
        price: 9.99,
        category: "category_id",
      });

      const savedProduct = await newProduct.save();

      const product = await Product.findById(savedProduct._id).select(
        "id title description price category"
      );

      res.status(201).json({
        message: "Product item created successfully",
        product,
      });
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
        res.status(200).json({ message: "Product updated" });
      } else {
        // The product was not found
        res.status(404).json({ message: "Product not found" });
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
        res.status(200).json({ message: "Product deleted" });
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
