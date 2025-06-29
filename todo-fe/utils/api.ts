import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

api.interceptors.request.use(
  (config) => {
    const stored = sessionStorage.getItem("session-auth");
    if (stored) {
      const parsed = JSON.parse(stored);
      const token = parsed.state?.data?.token;
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => {
    console.error("Request Error", error);
    return Promise.reject(error);
  }
);
