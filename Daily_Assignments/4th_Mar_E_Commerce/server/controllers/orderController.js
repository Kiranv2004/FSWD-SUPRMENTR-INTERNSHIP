import Cart from "../models/Cart.js";
import Order from "../models/Order.js";

const calculateTotal = (products) => {
  return products.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
};

export const createOrder = async (req, res) => {
  const { shippingAddress, paymentMethod = "dummy" } = req.body;

  const cart = await Cart.findOne({ user: req.user._id }).populate("products.product");
  if (!cart || cart.products.length === 0) {
    return res.status(400).json({ message: "Cart is empty" });
  }

  const total = calculateTotal(cart.products);
  const items = cart.products.map((item) => ({
    product: item.product._id,
    name: item.product.name,
    image: item.product.image,
    price: item.product.price,
    quantity: item.quantity,
  }));

  // Dummy payment integration: mark as paid if payment method is dummy.
  const paymentStatus = paymentMethod === "dummy" ? "paid" : "pending";

  const order = await Order.create({
    user: req.user._id,
    items,
    total,
    status: paymentStatus === "paid" ? "processing" : "pending",
    paymentMethod,
    paymentStatus,
    shippingAddress,
  });

  cart.products = [];
  await cart.save();

  res.status(201).json(order);
};

export const getOrders = async (req, res) => {
  const query = req.user.role === "admin" ? {} : { user: req.user._id };
  const orders = await Order.find(query)
    .populate("user", "name email")
    .sort({ createdAt: -1 });

  res.json(orders);
};
