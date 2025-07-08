import axios from "axios"

const axiosInstance = axios.create({
    baseURL:"http://localhost:8000/api",
    withCredentials:true
})

// Axios interceptor for token refresh
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        await axiosInstance.post("/auth/refresh-token");
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // Optionally handle refresh failure (e.g., logout user)
      }
    }
    return Promise.reject(error);
  }
);

export {axiosInstance}