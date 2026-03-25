import { useState } from "react";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext.jsx";
import { orderService } from "../services/api.js";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { refreshUserData } = useApp();
  const [form, setForm] = useState({
    fullName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });

  const onChange = (event) => {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      await orderService.create({ shippingAddress: form, paymentMethod: "dummy" });
      toast.success("Order placed successfully");
      await refreshUserData();
      navigate("/orders");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to place order");
    }
  };

  return (
    <>
      <Helmet>
        <title>Checkout | ShopSphere</title>
      </Helmet>
      <section className="mx-auto max-w-xl rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800">
        <h1 className="mb-4 text-2xl font-bold">Checkout</h1>
        <p className="mb-4 text-sm text-slate-500 dark:text-slate-300">
          Payment Mode: Dummy payment is enabled for development.
        </p>

        <form onSubmit={onSubmit} className="space-y-3">
          {Object.keys(form).map((field) => (
            <input
              key={field}
              name={field}
              value={form[field]}
              onChange={onChange}
              placeholder={field}
              required
              className="w-full rounded border border-slate-300 bg-white px-3 py-2 capitalize dark:border-slate-600 dark:bg-slate-900"
            />
          ))}

          <button type="submit" className="w-full rounded bg-brand-600 px-3 py-2 font-semibold text-white">
            Place Order
          </button>
        </form>
      </section>
    </>
  );
};

export default CheckoutPage;
