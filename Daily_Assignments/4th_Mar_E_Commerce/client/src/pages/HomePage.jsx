import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard.jsx";
import SkeletonCard from "../components/SkeletonCard.jsx";
import { productService } from "../services/api.js";

const HomePage = () => {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFeatured = async () => {
      try {
        const { data } = await productService.list({ featured: true, limit: 4 });
        setFeatured(data.products || []);
      } finally {
        setLoading(false);
      }
    };

    loadFeatured();
  }, []);

  return (
    <>
      <Helmet>
        <title>ShopSphere | Home</title>
        <meta name="description" content="Buy trending products with great prices and fast checkout" />
      </Helmet>

      <section className="mb-8 rounded-2xl bg-gradient-to-r from-brand-600 to-indigo-500 p-8 text-white">
        <h1 className="mb-2 text-3xl font-bold">Discover the best products today</h1>
        <p className="mb-4 max-w-xl text-indigo-50">
          Premium quality, secure checkout, fast delivery. Start shopping now.
        </p>
        <Link
          to="/products"
          className="inline-block rounded bg-white px-4 py-2 font-semibold text-brand-600 hover:bg-slate-100"
        >
          Shop Now
        </Link>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold">Featured Products</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {loading
            ? Array.from({ length: 4 }).map((_, index) => <SkeletonCard key={index} />)
            : featured.map((product) => <ProductCard key={product._id} product={product} />)}
        </div>
      </section>
    </>
  );
};

export default HomePage;
