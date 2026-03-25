import { createContext, useContext, useEffect, useMemo, useReducer } from "react";
import toast from "react-hot-toast";
import { authService, cartService } from "../services/api.js";

const AppContext = createContext();

const initialState = {
  user: null,
  token: localStorage.getItem("token") || "",
  cart: [],
  wishlist: [],
  loading: false,
  search: "",
  darkMode: localStorage.getItem("darkMode") === "true",
};

function appReducer(state, action) {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_AUTH":
      return { ...state, user: action.payload.user, token: action.payload.token };
    case "LOGOUT":
      return { ...state, user: null, token: "", cart: [], wishlist: [] };
    case "SET_CART":
      return { ...state, cart: action.payload };
    case "SET_WISHLIST":
      return { ...state, wishlist: action.payload };
    case "SET_SEARCH":
      return { ...state, search: action.payload };
    case "TOGGLE_DARK_MODE":
      return { ...state, darkMode: !state.darkMode };
    default:
      return state;
  }
}

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const setLoading = (loading) => dispatch({ type: "SET_LOADING", payload: loading });

  const syncTheme = (isDark) => {
    document.documentElement.classList.toggle("dark", isDark);
    localStorage.setItem("darkMode", String(isDark));
  };

  useEffect(() => {
    syncTheme(state.darkMode);
  }, [state.darkMode]);

  const fetchProfileAndCart = async () => {
    if (!state.token) return;

    try {
      const [profileRes, cartRes] = await Promise.all([authService.profile(), cartService.get()]);
      dispatch({ type: "SET_AUTH", payload: { user: profileRes.data, token: state.token } });
      dispatch({ type: "SET_WISHLIST", payload: profileRes.data.wishlist || [] });
      dispatch({ type: "SET_CART", payload: cartRes.data.products || [] });
    } catch (error) {
      localStorage.removeItem("token");
      dispatch({ type: "LOGOUT" });
    }
  };

  useEffect(() => {
    fetchProfileAndCart();
  }, [state.token]);

  const login = (payload) => {
    localStorage.setItem("token", payload.token);
    dispatch({ type: "SET_AUTH", payload });
  };

  const logout = () => {
    localStorage.removeItem("token");
    dispatch({ type: "LOGOUT" });
    toast.success("Logged out successfully");
  };

  const updateCart = async (productId, quantity = 1, action = "add") => {
    if (!state.user) {
      toast.error("Please login to manage cart");
      return;
    }
    const { data } = await cartService.upsert({ productId, quantity, action });
    dispatch({ type: "SET_CART", payload: data.products || [] });
  };

  const toggleWishlist = async (productId) => {
    if (!state.user) {
      toast.error("Please login to use wishlist");
      return;
    }
    const { data } = await authService.toggleWishlist(productId);
    dispatch({ type: "SET_WISHLIST", payload: data.wishlist || [] });
  };

  const value = useMemo(
    () => ({
      ...state,
      setLoading,
      login,
      logout,
      updateCart,
      toggleWishlist,
      setSearch: (search) => dispatch({ type: "SET_SEARCH", payload: search }),
      toggleDarkMode: () => dispatch({ type: "TOGGLE_DARK_MODE" }),
      refreshUserData: fetchProfileAndCart,
    }),
    [state]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within AppProvider");
  }
  return context;
};
