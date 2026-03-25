import { useState } from "react";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext.jsx";
import { authService } from "../services/api.js";

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useApp();
  const [form, setForm] = useState({ email: "", password: "" });

  const onSubmit = async (event) => {
    event.preventDefault();

    if (!form.email || !form.password) {
      toast.error("All fields are required");
      return;
    }

    try {
      const { data } = await authService.login(form);
      login(data);
      toast.success("Welcome back");
      navigate(location.state?.from || "/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <>
      <Helmet>
        <title>Login | ShopSphere</title>
      </Helmet>
      <section className="mx-auto max-w-md rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800">
        <h1 className="mb-4 text-2xl font-bold">Login</h1>
        <form onSubmit={onSubmit} className="space-y-3">
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
            className="w-full rounded border border-slate-300 bg-white px-3 py-2 dark:border-slate-600 dark:bg-slate-900"
          />
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(event) => setForm((prev) => ({ ...prev, password: event.target.value }))}
            className="w-full rounded border border-slate-300 bg-white px-3 py-2 dark:border-slate-600 dark:bg-slate-900"
          />
          <button type="submit" className="w-full rounded bg-brand-600 px-3 py-2 font-semibold text-white">
            Login
          </button>
        </form>
        <p className="mt-3 text-sm">
          No account?{" "}
          <Link to="/register" className="text-brand-600">
            Register
          </Link>
        </p>
      </section>
    </>
  );
};

export default LoginPage;
