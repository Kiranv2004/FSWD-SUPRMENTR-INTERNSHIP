import express from "express";
import { uploadImage } from "../controllers/uploadController.js";
import { adminOnly, protect } from "../middleware/authMiddleware.js";
import asyncHandler from "../middleware/asyncHandler.js";
import { upload } from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.post("/image", protect, adminOnly, upload.single("image"), asyncHandler(uploadImage));

export default router;
