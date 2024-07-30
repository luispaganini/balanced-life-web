import ITokenInterface from "@/interfaces/Login/ITokenInterface";
import useAuthStore from "@/store/authStore";
import axios from "axios";

export const refreshAccessToken = async (refreshToken: string, token: string): Promise<ITokenInterface> => {
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    const response = await axios.post(`${apiUrl}/login/refresh`, { refreshToken, accessToken: token });

    return response.data;
};

export const setupTokenRefresh = async () => {
    const { clearTokens } = useAuthStore.getState();
    try {
        const { token, setToken, refreshToken, setRefreshToken } = useAuthStore.getState();

        if (!refreshToken || !token) return;

        const tokens = await refreshAccessToken(refreshToken, token);
        if (!tokens.success) throw new Error('Erro ao renovar o token');

        setToken(tokens.accessToken);
        setRefreshToken(tokens.refreshToken);
    } catch (error) {
        console.error('Erro ao renovar o token:', error);
        clearTokens();
    }
};