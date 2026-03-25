import express from "express";
import { body } from "express-validator";
import { getUserProfile, toggleWishlist } from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";
import asyncHandler from "../middleware/asyncHandler.js";
import { validate } from "../middleware/validateMiddleware.js";

const router = express.Router();

router.get("/profile", protect, asyncHandler(getUserProfile));
router.post(
  "/wishlist",
  protect,
  [body("productId").notEmpty().withMessage("productId is required")],
  validate,
  asyncHandler(toggleWishlist)
);

export default router;
