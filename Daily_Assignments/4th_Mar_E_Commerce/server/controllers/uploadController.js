import path from "path";
import cloudinary from "../config/cloudinary.js";

export const uploadImage = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "Image file is required" });
  }

  if (process.env.USE_CLOUDINARY === "true") {
    const uploadResult = await cloudinary.uploader.upload(req.file.path, {
      folder: "ecommerce",
    });
    return res.json({ imageUrl: uploadResult.secure_url });
  }

  return res.json({ imageUrl: `/uploads/${path.basename(req.file.path)}` });
};
