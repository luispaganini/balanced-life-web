// store.ts
import IUserInterface from '@/interfaces/User/IUserInterface';
import {create} from 'zustand';
import { persist } from 'zustand/middleware';

// Define o tipo do estado da store
interface UserState {
    user: IUserInterface | null;
    setUser: (user: IUserInterface | null) => void;
    token: string | null;
    setToken: (token: string | null) => void;
    refreshToken: string | null;
    setRefreshToken: (refreshToken: string | null) => void;
    clearTokens: () => void;
}

const useAuthStore = create<UserState>()(
    persist(
      (set) => ({
        refreshToken: null,
        setRefreshToken: (refreshToken) => set({ refreshToken }),
        token: null,
        setToken: (token) => set({ token }),
        user: null,
        setUser: (user) => set({ user }),
        clearTokens: () => set({ token: null, refreshToken: null }),
      }),
      { name: 'auth' }
    )
  );
  
  export default useAuthStore;