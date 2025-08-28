import axios from "axios";
import { BASE_URL } from "../Components/API/API.js";

// Centralized Axios instance
const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach Authorization token if present
apiClient.interceptors.request.use(
  (config) => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch {
      // no-op for SSR or storage issues
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle common response errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    if (status === 401) {
      // Optionally clear token and redirect to login
      try {
        localStorage.removeItem("token");
      } catch {}
      // Avoid redirect loops in onboarding routes
      if (typeof window !== "undefined" && !window.location.pathname.includes("/login")) {
        // Keep query param so UX can return after login
        const current = encodeURIComponent(window.location.pathname + window.location.search);
        window.location.replace(`/login?from=${current}`);
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;

