// lib/api.ts
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
});

// // Helper: true if it's a public GET request
// function isPublicGet(url?: string, method?: string) {
//   return (
//     method?.toUpperCase() === "GET" &&
//     (url?.startsWith("/experiences/recent") || url?.startsWith("/experiences"))
//   );
// }

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  // Only attach token if not requesting a public GET
  const isPublicGet =
    config.method === "get" &&
    config.url?.startsWith("/experiences");

  if (token && !isPublicGet) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
