import express from "express";
import { body } from "express-validator";
import { getCart, upsertCartItem } from "../controllers/cartController.js";
import { protect } from "../middleware/authMiddleware.js";
import asyncHandler from "../middleware/asyncHandler.js";
import { validate } from "../middleware/validateMiddleware.js";

const router = express.Router();

router.get("/", protect, asyncHandler(getCart));
router.post(
  "/",
  protect,
  [
    body("productId").notEmpty().withMessage("productId is required"),
    body("quantity").optional().isInt({ min: 1 }),
    body("action").optional().isIn(["add", "remove"]),
  ],
  validate,
  asyncHandler(upsertCartItem)
);

export default router;
