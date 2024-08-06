import { auth, signOut, unstable_update } from "@/auth";
import ITokenInterface from "@/interfaces/Login/ITokenInterface";
import useAuthStore from "@/store/authStore";
import axios from "axios";

export const refreshAccessToken = async (refreshToken: string, token: string): Promise<ITokenInterface> => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    const response = await axios.post(`${apiUrl}/login/refresh`, { refreshToken, accessToken: token });

    return response.data;
};

export const setupTokenRefresh = async () => {
    try {
        const session = await auth();
        const user = session?.user as any;
        if (!user.accessToken || !user.refreshToken) throw new Error('No tokens');
        const tokens = await refreshAccessToken(user.refreshToken, user.accessToken);
        if (!tokens.success) throw new Error('Erro ao renovar o token');
        unstable_update(
            {
                user: {
                    ...user,
                    accessToken: tokens.accessToken,
                    refreshToken: tokens.refreshToken,
                },
                expires: session?.expires
            }
        );

    } catch (error) {
        console.error('Erro ao renovar o token:', error);
        await signOut();
    }
};