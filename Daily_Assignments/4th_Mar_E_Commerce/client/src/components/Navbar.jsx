import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaHeart, FaShoppingCart, FaUserCircle } from "react-icons/fa";
import { useApp } from "../context/AppContext.jsx";
import DarkModeToggle from "./DarkModeToggle.jsx";

const Navbar = () => {
  const { user, cart, search, setSearch, logout } = useApp();
  const navigate = useNavigate();
  const location = useLocation();

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const onSearchSubmit = (event) => {
    event.preventDefault();
    if (location.pathname !== "/products") {
      navigate(`/products?search=${encodeURIComponent(search)}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur dark:border-slate-700 dark:bg-slate-900/90">
      <nav className="mx-auto flex w-full max-w-7xl flex-wrap items-center gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <Link to="/" className="text-xl font-bold text-brand-600">
          ShopSphere
        </Link>

        <form onSubmit={onSearchSubmit} className="order-3 w-full sm:order-none sm:flex-1">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 outline-none ring-brand-500 focus:ring-2 dark:border-slate-600 dark:bg-slate-800"
          />
        </form>

        <div className="ml-auto flex items-center gap-3">
          <DarkModeToggle />
          <Link to="/wishlist" className="relative text-slate-700 dark:text-slate-200">
            <FaHeart className="text-lg" />
          </Link>
          <Link to="/cart" className="relative text-slate-700 dark:text-slate-200">
            <FaShoppingCart className="text-xl" />
            {totalItems > 0 && (
              <span className="absolute -right-2 -top-2 rounded-full bg-brand-600 px-1.5 text-xs text-white">
                {totalItems}
              </span>
            )}
          </Link>
          {user ? (
            <div className="flex items-center gap-2">
              <Link to="/profile" className="flex items-center gap-1 text-sm font-medium">
                <FaUserCircle className="text-xl" />
                <span className="hidden sm:inline">{user.name}</span>
              </Link>
              {user.role === "admin" && (
                <Link to="/admin" className="rounded bg-slate-200 px-2 py-1 text-xs dark:bg-slate-700">
                  Admin
                </Link>
              )}
              <button
                type="button"
                onClick={logout}
                className="rounded bg-red-500 px-3 py-1 text-sm font-medium text-white hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="rounded bg-brand-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-brand-500"
            >
              Login
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
