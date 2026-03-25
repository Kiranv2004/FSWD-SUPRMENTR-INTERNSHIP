import express from "express";
import { createOrder, getOrders } from "../controllers/orderController.js";
import { protect } from "../middleware/authMiddleware.js";
import asyncHandler from "../middleware/asyncHandler.js";

const router = express.Router();

router.post("/", protect, asyncHandler(createOrder));
router.get("/", protect, asyncHandler(getOrders));

export default router;
