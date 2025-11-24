import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    }
});

axiosInstance.interceptors.request.use(
    (config) => {
        console.log("📤 [AXIOS] Request:", {
            url: config.url,
            method: config.method,
            data: config.data
        });
        return config;
    },
    (error) => {
        console.error("❌ [AXIOS] Request error:", error);
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => {
        console.log("📥 [AXIOS] Response:", {
            url: response.config.url,
            status: response.status,
            data: response.data
        });
        return response;
    },
    (error) => {
        console.error("❌ [AXIOS] Response error:", error);
        return Promise.reject(error)
    }
)

export default axiosInstance;