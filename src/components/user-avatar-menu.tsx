// components/user-avatar-menu.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { LogOut, User as UserIcon } from "lucide-react";
import { useUser } from "@/contexts/user-context";
import { getInitials } from "@/lib/get-initials";

export function UserAvatarMenu() {
    const { user, isLoading, logout } = useUser();
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    // Fecha o menu ao clicar fora dele
    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    if (isLoading) {
        return <div className="h-8 w-8 animate-pulse rounded-full bg-neutral-200" />;
    }

    return (
        <div className="relative" ref={menuRef}>
            <button
                type="button"
                onClick={() => setIsOpen((v) => !v)}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-xs font-semibold text-emerald-700 transition-opacity hover:opacity-80"
                aria-label="Menu do usuário"
                aria-expanded={isOpen}
            >
                {user ? getInitials(user.name) : "?"}
            </button>

            {isOpen && (
                <div className="absolute right-0 top-[calc(100%+8px)] w-56 rounded-lg border border-neutral-200 bg-white py-1 shadow-lg">
                    {user && (
                        <div className="border-b border-neutral-100 px-4 py-3">
                            <p className="text-sm font-medium text-neutral-900">{user.name}</p>
                            <p className="text-xs text-neutral-500">{user.email}</p>
                        </div>
                    )}

                    <Link
                        href="/profile"
                        className="flex items-center gap-2 px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50"
                    >
                        <UserIcon className="h-4 w-4" />
                        Meu perfil
                    </Link>

                    <button
                        type="button"
                        onClick={() => {
                            setIsOpen(false);
                            logout();
                        }}
                        className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-rose-600 hover:bg-rose-50"
                    >
                        <LogOut className="h-4 w-4" />
                        Sair
                    </button>
                </div>
            )
            }
        </div >
    );
}