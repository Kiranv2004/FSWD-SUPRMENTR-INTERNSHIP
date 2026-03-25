import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";
import { productService, uploadService } from "../services/api.js";

const emptyForm = {
  name: "",
  price: "",
  description: "",
  image: "",
  category: "",
  stock: "",
  rating: "4",
  featured: false,
};

const AdminDashboardPage = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState("");

  const loadProducts = async () => {
    const { data } = await productService.list({ limit: 50 });
    setProducts(data.products || []);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleImageUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      const { data } = await uploadService.image(file);
      setForm((prev) => ({ ...prev, image: data.imageUrl }));
      toast.success("Image uploaded");
    } catch (error) {
      toast.error(error.response?.data?.message || "Image upload failed");
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const payload = {
        ...form,
        price: Number(form.price),
        stock: Number(form.stock),
        rating: Number(form.rating),
      };

      if (editingId) {
        await productService.update(editingId, payload);
        toast.success("Product updated");
      } else {
        await productService.create(payload);
        toast.success("Product created");
      }

      setForm(emptyForm);
      setEditingId("");
      await loadProducts();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to save product");
    }
  };

  const onEdit = (product) => {
    setEditingId(product._id);
    setForm({
      name: product.name,
      price: String(product.price),
      description: product.description,
      image: product.image,
      category: product.category,
      stock: String(product.stock),
      rating: String(product.rating || 4),
      featured: Boolean(product.featured),
    });
  };

  const onDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    try {
      await productService.remove(id);
      toast.success("Product deleted");
      await loadProducts();
    } catch (error) {
      toast.error(error.response?.data?.message || "Delete failed");
    }
  };

  return (
    <>
      <Helmet>
        <title>Admin Dashboard | ShopSphere</title>
      </Helmet>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <section className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-800">
          <h1 className="mb-4 text-2xl font-bold">Admin Dashboard</h1>
          <form onSubmit={onSubmit} className="space-y-3">
            <input
              placeholder="Name"
              value={form.name}
              onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
              className="w-full rounded border border-slate-300 bg-white px-3 py-2 dark:border-slate-600 dark:bg-slate-900"
            />
            <input
              placeholder="Price"
              type="number"
              value={form.price}
              onChange={(event) => setForm((prev) => ({ ...prev, price: event.target.value }))}
              className="w-full rounded border border-slate-300 bg-white px-3 py-2 dark:border-slate-600 dark:bg-slate-900"
            />
            <textarea
              placeholder="Description"
              value={form.description}
              onChange={(event) => setForm((prev) => ({ ...prev, description: event.target.value }))}
              className="w-full rounded border border-slate-300 bg-white px-3 py-2 dark:border-slate-600 dark:bg-slate-900"
            />
            <input
              placeholder="Category"
              value={form.category}
              onChange={(event) => setForm((prev) => ({ ...prev, category: event.target.value }))}
              className="w-full rounded border border-slate-300 bg-white px-3 py-2 dark:border-slate-600 dark:bg-slate-900"
            />
            <input
              placeholder="Stock"
              type="number"
              value={form.stock}
              onChange={(event) => setForm((prev) => ({ ...prev, stock: event.target.value }))}
              className="w-full rounded border border-slate-300 bg-white px-3 py-2 dark:border-slate-600 dark:bg-slate-900"
            />
            <div className="flex items-center gap-2">
              <input
                id="featured"
                type="checkbox"
                checked={form.featured}
                onChange={(event) => setForm((prev) => ({ ...prev, featured: event.target.checked }))}
              />
              <label htmlFor="featured" className="text-sm">
                Featured product
              </label>
            </div>

            <input type="file" accept="image/*" onChange={handleImageUpload} />
            <input
              placeholder="Image URL"
              value={form.image}
              onChange={(event) => setForm((prev) => ({ ...prev, image: event.target.value }))}
              className="w-full rounded border border-slate-300 bg-white px-3 py-2 dark:border-slate-600 dark:bg-slate-900"
            />

            <button type="submit" className="w-full rounded bg-brand-600 px-3 py-2 font-semibold text-white">
              {editingId ? "Update Product" : "Create Product"}
            </button>
          </form>
        </section>

        <section className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-800">
          <h2 className="mb-4 text-xl font-bold">Manage Products</h2>
          <div className="space-y-3">
            {products.map((product) => (
              <article
                key={product._id}
                className="flex items-center justify-between gap-3 rounded border border-slate-200 p-3 dark:border-slate-700"
              >
                <div>
                  <p className="font-medium">{product.name}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-300">₹{product.price}</p>
                </div>
                <div className="space-x-2">
                  <button
                    type="button"
                    onClick={() => onEdit(product)}
                    className="rounded bg-slate-200 px-2 py-1 text-sm dark:bg-slate-700"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => onDelete(product._id)}
                    className="rounded bg-red-500 px-2 py-1 text-sm text-white"
                  >
                    Delete
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </>
  );
};

export default AdminDashboardPage;
