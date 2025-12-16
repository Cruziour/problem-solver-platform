import axios from 'axios';

// Create Axios instance
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  withCredentials: true,
  timeout: 150000,
});

// ---------------- Helpers ----------------
const getTokens = () => ({
  accessToken: localStorage.getItem('accessToken'),
  refreshToken: localStorage.getItem('refreshToken'),
});

export const saveTokens = (accessToken, refreshToken) => {
  if (accessToken) localStorage.setItem('accessToken', accessToken);
  if (refreshToken) localStorage.setItem('refreshToken', refreshToken);
};

export const clearTokens = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('user');
};

// ---------------- Public Routes ----------------
// These routes will NOT send any token
const PUBLIC_ROUTES = [
  '/login',
  '/signup',
  '/validateOtp',
  '/resend-otp'
];

// ---------------- Request Interceptor ----------------
axiosInstance.interceptors.request.use(
  (config) => {
    const { accessToken } = getTokens();
    const isPublic = PUBLIC_ROUTES.some((path) => config.url.includes(path));

    if (!isPublic && accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

// ---------------- Response Interceptor ----------------
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });
  failedQueue = [];
};

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const status = error.response?.status;

    if (
      status === 406 &&
      !originalRequest._retry &&
      !originalRequest.url.includes('/refresh-token')
    ) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return axiosInstance(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const { refreshToken } = getTokens();
      if (!refreshToken) {
        clearTokens();
        window.location.href = '/login';
        return Promise.reject(error);
      }

      try {
        // ✅ Refresh token API (GET or POST — depends on your backend)
        const { data } = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/refresh-token`,
          {
            headers: { Authorization: `Bearer ${refreshToken}` },
          },
        );

        const newAccessToken =
          data?.data?.accessToken || data?.accessToken || data?.token;
        const newRefreshToken = data?.data?.refreshToken || data?.refreshToken;

        if (!newAccessToken) throw new Error('Invalid refresh token response');

        // Save new tokens
        saveTokens(newAccessToken, newRefreshToken);
        axiosInstance.defaults.headers.Authorization = `Bearer ${newAccessToken}`;

        // Resolve pending requests
        processQueue(null, newAccessToken);

        // Retry original request
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error('🔴 Token refresh failed:', refreshError.message);
        processQueue(refreshError, null);
        clearTokens();
        window.location.href = '/login'; // redirect to login
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
