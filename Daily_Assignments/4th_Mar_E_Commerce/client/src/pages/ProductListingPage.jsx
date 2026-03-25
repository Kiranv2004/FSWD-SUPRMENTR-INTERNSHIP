import { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard.jsx";
import SidebarFilters from "../components/SidebarFilters.jsx";
import SkeletonCard from "../components/SkeletonCard.jsx";
import { useApp } from "../context/AppContext.jsx";
import { productService } from "../services/api.js";

const ProductListingPage = () => {
  const [searchParams] = useSearchParams();
  const { search } = useApp();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, pages: 1 });
  const [filters, setFilters] = useState({
    category: "",
    minPrice: "",
    rating: "",
    sort: "latest",
    page: 1,
  });

  const resolvedSearch = useMemo(() => searchParams.get("search") || search, [searchParams, search]);

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      try {
        const { data } = await productService.list({
          page: filters.page,
          category: filters.category || undefined,
          minPrice: filters.minPrice || undefined,
          rating: filters.rating || undefined,
          sort: filters.sort,
          search: resolvedSearch || undefined,
          limit: 8,
        });
        setProducts(data.products || []);
        setPagination(data.pagination || { page: 1, pages: 1 });
        const uniqueCategories = [...new Set((data.products || []).map((item) => item.category))];
        setCategories((prev) => [...new Set([...prev, ...uniqueCategories])]);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [filters, resolvedSearch]);

  return (
    <>
      <Helmet>
        <title>ShopSphere | Products</title>
      </Helmet>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
        <SidebarFilters filters={filters} setFilters={setFilters} categories={categories} />

        <section className="lg:col-span-3">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
            <h1 className="text-2xl font-bold">Products</h1>
            <select
              value={filters.sort}
              onChange={(event) => setFilters((prev) => ({ ...prev, sort: event.target.value }))}
              className="rounded border border-slate-300 bg-white px-2 py-2 dark:border-slate-600 dark:bg-slate-800"
            >
              <option value="latest">Latest</option>
              <option value="priceAsc">Price: Low to High</option>
              <option value="priceDesc">Price: High to Low</option>
              <option value="ratingDesc">Top Rated</option>
              <option value="nameAsc">Name: A-Z</option>
            </select>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {loading
              ? Array.from({ length: 8 }).map((_, index) => <SkeletonCard key={index} />)
              : products.map((product) => <ProductCard key={product._id} product={product} />)}
          </div>

          <div className="mt-6 flex items-center justify-center gap-3">
            <button
              type="button"
              disabled={pagination.page <= 1}
              onClick={() => setFilters((prev) => ({ ...prev, page: prev.page - 1 }))}
              className="rounded bg-slate-200 px-3 py-2 disabled:opacity-50 dark:bg-slate-700"
            >
              Prev
            </button>
            <span>
              Page {pagination.page} of {pagination.pages || 1}
            </span>
            <button
              type="button"
              disabled={pagination.page >= pagination.pages}
              onClick={() => setFilters((prev) => ({ ...prev, page: prev.page + 1 }))}
              className="rounded bg-slate-200 px-3 py-2 disabled:opacity-50 dark:bg-slate-700"
            >
              Next
            </button>
          </div>
        </section>
      </div>
    </>
  );
};

export default ProductListingPage;
