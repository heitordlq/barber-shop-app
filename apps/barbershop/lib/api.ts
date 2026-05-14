import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

export const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor: adiciona Bearer token
api.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("barbershop-auth");
      if (stored) {
        const { state } = JSON.parse(stored);
        if (state?.accessToken) {
          config.headers.Authorization = `Bearer ${state.accessToken}`;
        }
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Evita múltiplas chamadas de refresh simultâneas
let isRefreshing = false;
let pendingRequests: Array<(token: string) => void> = [];

const processQueue = (token: string) => {
  pendingRequests.forEach((cb) => cb(token));
  pendingRequests = [];
};

// Response interceptor: refresh automático
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // Encauça requisição enquanto refresh está em andamento
        return new Promise((resolve) => {
          pendingRequests.push((token: string) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            resolve(api(originalRequest));
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const stored = localStorage.getItem("barbershop-auth");
        if (!stored) throw new Error("No session");

        const parsed = JSON.parse(stored);
        const refreshToken = parsed.state?.refreshToken;
        if (!refreshToken) throw new Error("No refresh token");

        const res = await axios.post(`${API_URL}/auth/refresh`, null, {
          headers: { Authorization: `Bearer ${refreshToken}` },
        });
        const { accessToken: newAccess, refreshToken: newRefresh } = res.data;

        // Atualiza localStorage
        parsed.state.accessToken = newAccess;
        parsed.state.refreshToken = newRefresh;
        localStorage.setItem("barbershop-auth", JSON.stringify(parsed));

        // Atualiza Zustand em memória (sem importar o hook)
        try {
          const { useAuthStore } = await import("@/store/auth.store");
          useAuthStore.setState({ accessToken: newAccess, refreshToken: newRefresh });
        } catch { /* store pode não existir no server */ }

        processQueue(newAccess);
        originalRequest.headers.Authorization = `Bearer ${newAccess}`;
        return api(originalRequest);
      } catch {
        pendingRequests = [];
        if (typeof window !== "undefined") {
          localStorage.removeItem("barbershop-auth");
          window.location.href = "/login";
        }
      } finally {
        isRefreshing = false;
      }
    }
    return Promise.reject(error);
  }
);
