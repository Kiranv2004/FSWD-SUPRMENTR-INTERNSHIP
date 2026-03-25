import User from "../models/User.js";

export const getUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id).select("-password").populate("wishlist");
  res.json(user);
};

export const toggleWishlist = async (req, res) => {
  const { productId } = req.body;
  const user = await User.findById(req.user._id);

  const exists = user.wishlist.some((id) => String(id) === String(productId));
  user.wishlist = exists
    ? user.wishlist.filter((id) => String(id) !== String(productId))
    : [...user.wishlist, productId];

  await user.save();
  const populated = await User.findById(req.user._id).select("-password").populate("wishlist");
  res.json(populated);
};
