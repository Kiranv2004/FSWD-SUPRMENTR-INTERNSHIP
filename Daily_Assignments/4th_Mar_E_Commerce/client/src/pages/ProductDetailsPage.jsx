import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { FaStar } from "react-icons/fa";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader.jsx";
import { useApp } from "../context/AppContext.jsx";
import { productService } from "../services/api.js";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const { updateCart } = useApp();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const { data } = await productService.details(id);
        setProduct(data);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  if (loading) return <Loader />;
  if (!product) return <p>Product not found.</p>;

  return (
    <>
      <Helmet>
        <title>{product.name} | ShopSphere</title>
      </Helmet>

      <section className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <img src={product.image} alt={product.name} className="w-full rounded-xl object-cover" />
        <div>
          <h1 className="mb-2 text-3xl font-bold">{product.name}</h1>
          <p className="mb-2 text-sm text-slate-500 dark:text-slate-300">{product.category}</p>
          <p className="mb-4 flex items-center gap-1">
            <FaStar className="text-amber-400" /> {product.rating?.toFixed(1)}
          </p>
          <p className="mb-4 text-slate-700 dark:text-slate-200">{product.description}</p>
          <p className="mb-4 text-2xl font-bold text-brand-600">₹{product.price}</p>

          <div className="mb-4 flex items-center gap-3">
            <label htmlFor="qty" className="text-sm font-medium">
              Qty
            </label>
            <input
              id="qty"
              type="number"
              min="1"
              max={product.stock}
              value={quantity}
              onChange={(event) => setQuantity(Number(event.target.value))}
              className="w-24 rounded border border-slate-300 bg-white px-2 py-1 dark:border-slate-600 dark:bg-slate-800"
            />
          </div>

          <button
            type="button"
            onClick={() => updateCart(product._id, quantity, "add")}
            className="rounded bg-brand-600 px-5 py-2 font-semibold text-white hover:bg-brand-500"
          >
            Add to Cart
          </button>
        </div>
      </section>
    </>
  );
};

export default ProductDetailsPage;
