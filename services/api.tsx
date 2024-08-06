import useAuthStore from '@/store/authStore';
import axios from 'axios';
import { setupTokenRefresh } from './login/refreshToken';
import { auth, signOut } from '@/auth';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const api = axios.create({
    baseURL: apiUrl,
});

api.interceptors.request.use(async (config) => {
    const session = await auth()
    const user = session?.user as any;

    config.headers.Authorization = `Bearer ${user.accessToken}`;
    return config;
});

api.interceptors.response.use(response => response, async (error) => {
    const session = await auth()
    
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        await setupTokenRefresh();
        const user: any = session?.user;
        axios.defaults.headers.common['Authorization'] = `Bearer ${user.accessToken}`;
        originalRequest.headers['Authorization'] = `Bearer ${user.accessToken}`;
        return api(originalRequest);
    }
    return Promise.reject(error);
});

export default api;