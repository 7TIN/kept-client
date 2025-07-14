// src/lib/api.ts
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

/* ---------- helper: skip Authorization header for public endpoints ---------- */
function isPublicRequest(url?: string, method?: string) {
  if (!url || !method) return false;

  const upperMethod = method.toUpperCase();

  // Allow unauthenticated GET requests
  if (upperMethod === "GET") {
    return (
      url.startsWith("/experiences") || // e.g., /experiences, /experiences/recent
      url.startsWith("/companies")     // e.g., /companies?q=...
    );
  }
  return false;
}

/* ---------- interceptor ---------- */
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token && !isPublicRequest(config.url, config.method)) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
