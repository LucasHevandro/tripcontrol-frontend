"use client";

import {
    createContext,
    useContext,
    useState,
    useEffect,
    type ReactNode,
} from "react";
import { tokenStorage } from "@/infrastructure/http/api-client";
import { HttpAuthRepository } from "@/infrastructure/repositories/auth.repository";

export interface User {
    id: string;
    name: string;
    email: string;
}

interface UserContextValue {
    user: User | null;
    isLoading: boolean;
    logout: () => void;
    setUser: (user: User | null) => void;
}

const UserContext = createContext<UserContextValue | undefined>(undefined);

const authRepository = new HttpAuthRepository();

export function UserProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Ao montar, verifica se há token válido e busca o usuário
    useEffect(() => {
        const token = tokenStorage.getAccessToken();
        if (!token) {
            setIsLoading(false);
            return;
        }

        authRepository
            .me()
            .then((userData) => setUser(userData))
            .catch(() => {
                // Token inválido ou expirado — limpa e deixa sem usuário
                tokenStorage.clearTokens();
            })
            .finally(() => setIsLoading(false));
    }, []);

    async function logout() {
        try {
            await authRepository.logout();
        } finally {
            setUser(null);
            tokenStorage.clearTokens();
            window.location.href = '/login';
        }
    }

    return (
        <UserContext.Provider value={{ user, isLoading, logout, setUser }}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error("useUser deve ser usado dentro de um UserProvider");
    }
    return context;
}