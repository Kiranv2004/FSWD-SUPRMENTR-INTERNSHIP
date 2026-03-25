import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext.jsx";

const CartPage = () => {
  const { cart, updateCart, user } = useApp();
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <section className="text-center">
        <h1 className="mb-3 text-2xl font-bold">Your cart is empty</h1>
        <Link to="/products" className="rounded bg-brand-600 px-4 py-2 text-white">
          Continue Shopping
        </Link>
      </section>
    );
  }

  return (
    <>
      <Helmet>
        <title>Cart | ShopSphere</title>
      </Helmet>

      <h1 className="mb-5 text-2xl font-bold">Shopping Cart</h1>

      <div className="space-y-4">
        {cart.map((item) => (
          <article
            key={item.product._id}
            className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 sm:flex-row sm:items-center dark:border-slate-700 dark:bg-slate-800"
          >
            <img src={item.product.image} alt={item.product.name} className="h-20 w-20 rounded object-cover" />
            <div className="flex-1">
              <h2 className="font-semibold">{item.product.name}</h2>
              <p className="text-sm text-slate-500 dark:text-slate-300">₹{item.product.price}</p>
            </div>
            <input
              type="number"
              min="1"
              value={item.quantity}
              onChange={(event) => updateCart(item.product._id, Number(event.target.value), "add")}
              className="w-20 rounded border border-slate-300 bg-white px-2 py-1 dark:border-slate-600 dark:bg-slate-900"
            />
            <button
              type="button"
              onClick={() => updateCart(item.product._id, 1, "remove")}
              className="rounded bg-red-500 px-3 py-1 text-white hover:bg-red-600"
            >
              Remove
            </button>
          </article>
        ))}
      </div>

      <div className="mt-6 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800">
        <p className="mb-3 text-lg font-semibold">Total: ₹{total.toFixed(2)}</p>
        <button
          type="button"
          onClick={() => (user ? navigate("/checkout") : navigate("/login"))}
          className="rounded bg-brand-600 px-4 py-2 text-white hover:bg-brand-500"
        >
          Proceed to Checkout
        </button>
      </div>
    </>
  );
};

export default CartPage;
