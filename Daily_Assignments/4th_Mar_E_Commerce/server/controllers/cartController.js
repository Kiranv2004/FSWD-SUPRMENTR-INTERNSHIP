import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

export const getCart = async (req, res) => {
  let cart = await Cart.findOne({ user: req.user._id }).populate("products.product");
  if (!cart) {
    cart = await Cart.create({ user: req.user._id, products: [] });
  }
  res.json(cart);
};

export const upsertCartItem = async (req, res) => {
  const { productId, quantity = 1, action = "add" } = req.body;

  const product = await Product.findById(productId);
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  const qty = Math.max(1, Number(quantity));
  let cart = await Cart.findOne({ user: req.user._id });
  if (!cart) {
    cart = await Cart.create({ user: req.user._id, products: [] });
  }

  const itemIndex = cart.products.findIndex((item) => String(item.product) === String(productId));

  if (action === "remove") {
    cart.products = cart.products.filter((item) => String(item.product) !== String(productId));
  } else if (itemIndex >= 0) {
    cart.products[itemIndex].quantity = qty;
  } else {
    cart.products.push({ product: productId, quantity: qty });
  }

  await cart.save();
  const populated = await cart.populate("products.product");
  res.json(populated);
};
