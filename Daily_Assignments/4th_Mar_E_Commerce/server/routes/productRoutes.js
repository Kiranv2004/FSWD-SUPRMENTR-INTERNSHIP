import express from "express";
import { body } from "express-validator";
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
} from "../controllers/productController.js";
import { adminOnly, protect } from "../middleware/authMiddleware.js";
import asyncHandler from "../middleware/asyncHandler.js";
import { validate } from "../middleware/validateMiddleware.js";

const router = express.Router();

router.get("/", asyncHandler(getProducts));
router.get("/:id", asyncHandler(getProductById));

router.post(
  "/",
  protect,
  adminOnly,
  [
    body("name").notEmpty(),
    body("price").isFloat({ min: 0 }),
    body("description").notEmpty(),
    body("image").notEmpty(),
    body("category").notEmpty(),
    body("stock").isInt({ min: 0 }),
  ],
  validate,
  asyncHandler(createProduct)
);

router.put("/:id", protect, adminOnly, asyncHandler(updateProduct));
router.delete("/:id", protect, adminOnly, asyncHandler(deleteProduct));

export default router;
