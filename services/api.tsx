import useAuthStore from '@/store/authStore';
import axios from 'axios';
import { setupTokenRefresh } from './login/refreshToken';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const api = axios.create({
    baseURL: apiUrl,
});

api.interceptors.request.use((config) => {
    const { token } = useAuthStore.getState();

    config.headers.Authorization = `Bearer ${token}`;
    return config;
});

api.interceptors.response.use(response => response, async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        await setupTokenRefresh();
        const { token } = useAuthStore.getState();
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        originalRequest.headers['Authorization'] = `Bearer ${token}`;
        return api(originalRequest);
    }
    return Promise.reject(error);
});

export default api;