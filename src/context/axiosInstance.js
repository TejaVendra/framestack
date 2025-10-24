// src/utils/axiosInstance.js
import axios from "axios";

let apiUrl = import.meta.env.VITE_API_END_POINT;

const axiosInstance = axios.create({
  baseURL: `${apiUrl}`,
});

// ✅ Attach access token before every request
axiosInstance.interceptors.request.use(
  (config) => {
    const access = localStorage.getItem("access_token");
    if (access) {
      config.headers.Authorization = `Bearer ${access}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Handle expired access token globally
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // if token expired & request not retried yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refresh = localStorage.getItem("refresh_token");
        const res = await axios.post(`${apiUrl}/token/refresh/`, { refresh });

        const newAccess = res.data.access;

        // save new token
        localStorage.setItem("access_token", newAccess);

        // retry the failed request with new token
        axiosInstance.defaults.headers.Authorization = `Bearer ${newAccess}`;
        originalRequest.headers.Authorization = `Bearer ${newAccess}`;

        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error("Refresh failed:", refreshError.response?.data || refreshError.message);
        // logout
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
