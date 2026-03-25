import express from "express";
import { body } from "express-validator";
import { loginUser, registerUser } from "../controllers/authController.js";
import asyncHandler from "../middleware/asyncHandler.js";
import { validate } from "../middleware/validateMiddleware.js";

const router = express.Router();

router.post(
  "/register",
  [
    body("name").trim().notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Valid email is required"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
  ],
  validate,
  asyncHandler(registerUser)
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Valid email is required"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  validate,
  asyncHandler(loginUser)
);

export default router;
