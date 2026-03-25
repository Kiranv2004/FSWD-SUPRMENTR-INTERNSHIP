import Product from "../models/Product.js";

export const getProducts = async (req, res) => {
  const {
    page = 1,
    limit = 8,
    category,
    minPrice,
    maxPrice,
    rating,
    search,
    sort = "latest",
    featured,
  } = req.query;

  const query = {};

  if (category) query.category = category;
  if (featured === "true") query.featured = true;
  if (search) query.name = { $regex: search, $options: "i" };
  if (rating) query.rating = { $gte: Number(rating) };
  if (minPrice || maxPrice) {
    query.price = {};
    if (minPrice) query.price.$gte = Number(minPrice);
    if (maxPrice) query.price.$lte = Number(maxPrice);
  }

  const sortMap = {
    latest: { createdAt: -1 },
    priceAsc: { price: 1 },
    priceDesc: { price: -1 },
    ratingDesc: { rating: -1 },
    nameAsc: { name: 1 },
  };

  const skip = (Number(page) - 1) * Number(limit);
  const [products, total] = await Promise.all([
    Product.find(query).sort(sortMap[sort] || sortMap.latest).skip(skip).limit(Number(limit)),
    Product.countDocuments(query),
  ]);

  res.json({
    products,
    pagination: {
      page: Number(page),
      limit: Number(limit),
      total,
      pages: Math.ceil(total / Number(limit)),
    },
  });
};

export const getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }
  return res.json(product);
};

export const createProduct = async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).json(product);
};

export const updateProduct = async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  return res.json(product);
};

export const deleteProduct = async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }
  return res.json({ message: "Product deleted" });
};
