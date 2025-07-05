// src/lib/api.ts
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
});

/* ---------- helper: true if we don’t want Authorization header ---------- */
function isPublicGet(url?: string, method?: string) {
  if (method?.toUpperCase() !== "GET" || !url) return false;

  return (
    url.startsWith("/experiences") || // /experiences & /experiences/recent
    url.startsWith("/companies")     // /companies?q=foo
  );
}

/* ---------- interceptor ---------- */
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token && !isPublicGet(config.url, config.method)) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
