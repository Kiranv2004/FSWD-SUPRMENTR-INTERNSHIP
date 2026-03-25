import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

export const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authService = {
  register: (payload) => api.post("/auth/register", payload),
  login: (payload) => api.post("/auth/login", payload),
  profile: () => api.get("/users/profile"),
  toggleWishlist: (productId) => api.post("/users/wishlist", { productId }),
};

export const productService = {
  list: (params) => api.get("/products", { params }),
  details: (id) => api.get(`/products/${id}`),
  create: (payload) => api.post("/products", payload),
  update: (id, payload) => api.put(`/products/${id}`, payload),
  remove: (id) => api.delete(`/products/${id}`),
};

export const cartService = {
  get: () => api.get("/cart"),
  upsert: (payload) => api.post("/cart", payload),
};

export const orderService = {
  create: (payload) => api.post("/orders", payload),
  list: () => api.get("/orders"),
};

export const uploadService = {
  image: (file) => {
    const formData = new FormData();
    formData.append("image", file);
    return api.post("/upload/image", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
};
