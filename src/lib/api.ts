import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

function isPublicRequest(url?: string, method?: string) {
  if (!url || !method) return false;

  const upperMethod = method.toUpperCase();

  if (upperMethod === "GET") {
    return (
      url.startsWith("/experiences") || 
      url.startsWith("/companies")     
    );
  }
  return false;
}

/* ---------- REQUEST interceptor ---------- */
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token && !isPublicRequest(config.url, config.method)) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

/* ---------- RESPONSE interceptor ---------- */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 403)
    ) {
      localStorage.removeItem("token");

      const redirectUrl = window.location.pathname + window.location.search;

      const loginUrl = new URL('/login', window.location.origin);
      loginUrl.searchParams.set('message', 'session_expired');
      loginUrl.searchParams.set('redirect', redirectUrl);

      window.location.href = loginUrl.toString();
    }
    
    return Promise.reject(error);
  }
);

export default api;