import { memo } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaHeart, FaRegHeart, FaStar } from "react-icons/fa";
import { useApp } from "../context/AppContext.jsx";

const slugify = (text) => text.toLowerCase().replace(/[^a-z0-9]+/g, "-");

const ProductCard = ({ product }) => {
  const { updateCart, wishlist, toggleWishlist } = useApp();
  const liked = wishlist.some((item) => String(item._id || item) === String(product._id));

  return (
    <motion.article
      whileHover={{ y: -6 }}
      className="rounded-xl border border-slate-200 bg-white shadow-sm transition dark:border-slate-700 dark:bg-slate-800"
    >
      <Link to={`/product/${product._id}/${slugify(product.name)}`}>
        <img
          src={product.image}
          alt={product.name}
          className="h-44 w-full rounded-t-xl object-cover"
          loading="lazy"
        />
      </Link>
      <div className="space-y-2 p-4">
        <div className="flex items-start justify-between gap-2">
          <Link to={`/product/${product._id}/${slugify(product.name)}`} className="font-semibold hover:text-brand-600">
            {product.name}
          </Link>
          <button type="button" onClick={() => toggleWishlist(product._id)}>
            {liked ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
          </button>
        </div>
        <p className="text-sm text-slate-500 dark:text-slate-300">{product.category}</p>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-brand-600">₹{product.price}</span>
          <span className="flex items-center gap-1 text-sm">
            <FaStar className="text-amber-400" /> {product.rating?.toFixed(1)}
          </span>
        </div>
        <button
          type="button"
          onClick={() => updateCart(product._id, 1, "add")}
          className="w-full rounded bg-brand-600 px-3 py-2 text-sm font-semibold text-white hover:bg-brand-500"
        >
          Add to Cart
        </button>
      </div>
    </motion.article>
  );
};

export default memo(ProductCard);
