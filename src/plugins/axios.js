import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: (process.env.NODE_ENV === "development") ? 'http://localhost:8000' : "/api/", 
  timeout: 10000, // Request timeout in milliseconds

});


axiosInstance.interceptors.request.use((config) => {
    config.withCredentials = true;

    if (config.data instanceof FormData) {
      // 如果是 FormData，设置 Content-Type 为 multipart/form-data
      config.headers['Content-Type'] = 'multipart/form-data';
    } else {
      // 否则，默认使用 application/json
      config.headers['Content-Type'] = 'application/json';
    }
    return config;
  });
// Add request interceptor if needed
axiosInstance.interceptors.request.use(
  config => {
    // Perform actions before request is sent (e.g., add auth token)
    return config;
  },
  error => {
    // Handle request error
    return Promise.reject(error);
  }
);

// Add response interceptor if needed
axiosInstance.interceptors.response.use(
  response => {
    // Perform actions on successful response
    return response;
  },
  error => {
    // Handle response error
    return Promise.reject(error);
  }
);

export default axiosInstance;
