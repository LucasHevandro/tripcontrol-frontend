// contexts/user-context.tsx
"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";

export interface User {
    id: string;
    name: string;
    email: string;
}

interface UserContextValue {
    user: User | null;
    isLoading: boolean;
    logout: () => void;
}

const UserContext = createContext<UserContextValue | undefined>(undefined);

const MOCK_USER: User = {
    id: "mock-user-1",
    name: "Lucas Hevandro",
    email: "lucas@email.com",
};

export function UserProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(MOCK_USER);
    const [isLoading] = useState(false);
    const router = useRouter();

    function logout() {
        // TODO: quando a autenticação real existir, troque por:
        // - limpar o token (cookie httpOnly idealmente é limpo pelo backend
        //   via POST /auth/logout; se for localStorage, limpar aqui)
        // - invalidar cache do TanStack Query se estiver usando
        setUser(null);
        router.push("/login");
    }

    return (
        <UserContext.Provider value={{ user, isLoading, logout }}>
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