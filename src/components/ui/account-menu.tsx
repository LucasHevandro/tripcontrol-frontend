"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut, User as UserIcon } from "lucide-react";
import { useUser } from "@/contexts/user-context";
import { getInitials } from "@/lib/get-initials";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Dialog } from "@/components/ui/dialog";

export function AccountMenu() {
    const pathname = usePathname();
    const { user, isLoading, logout } = useUser();
    const [isSheetOpen, setIsSheetOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setIsSheetOpen(false);
        setIsMenuOpen(false);
    }, [pathname]);

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setIsMenuOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    function handleAvatarClick() {
        if (window.matchMedia("(min-width: 768px)").matches) {
            setIsMenuOpen((v) => !v);
        } else {
            setIsSheetOpen(true);
        }
    }

    return (
        <>
            <div className="relative" ref={menuRef}>
                {isLoading ? (
                    <div className="h-8 w-8 animate-pulse rounded-full bg-neutral-200 dark:bg-neutral-700" />
                ) : (
                    <button
                        type="button"
                        onClick={handleAvatarClick}
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-xs font-semibold text-emerald-700 transition-opacity hover:opacity-80 dark:bg-emerald-900 dark:text-emerald-300"
                        aria-label="Menu da conta"
                        aria-expanded={isMenuOpen || isSheetOpen}
                    >
                        {user ? getInitials(user.name) : "?"}
                    </button>
                )}

                {/* Dropdown desktop */}
                {isMenuOpen && (
                    <div className="absolute right-0 top-[calc(100%+8px)] z-50 hidden w-52 rounded-lg border border-neutral-200 bg-white py-1 shadow-lg dark:border-neutral-700 dark:bg-neutral-900 md:block">
                        {user && (
                            <div className="border-b border-neutral-100 px-4 py-3 dark:border-neutral-800">
                                <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">{user.name}</p>
                                <p className="text-xs text-neutral-500 dark:text-neutral-400">{user.email}</p>
                            </div>
                        )}
                        <Link
                            href="/profile"
                            onClick={() => setIsMenuOpen(false)}
                            className="flex items-center gap-2 px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50 dark:text-neutral-300 dark:hover:bg-neutral-800"
                        >
                            <UserIcon className="h-4 w-4" />
                            Perfil
                        </Link>
                        <button
                            type="button"
                            onClick={() => { setIsMenuOpen(false); logout(); }}
                            className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950"
                        >
                            <LogOut className="h-4 w-4" />
                            Sair
                        </button>
                    </div>
                )}
            </div>

            {/* Sheet mobile */}
            <Dialog
                open={isSheetOpen}
                onClose={() => setIsSheetOpen(false)}
                ariaLabel="Menu da conta"
                mobileSheet
                size="sm"
            >
                <div className="flex flex-col">
                    {user && (
                        <div className="border-b border-neutral-100 px-5 py-4 dark:border-neutral-800">
                            <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">{user.name}</p>
                            <p className="mt-0.5 text-xs text-neutral-500 dark:text-neutral-400">{user.email}</p>
                        </div>
                    )}

                    <div className="border-b border-neutral-100 px-5 py-4 dark:border-neutral-800">
                        <p className="mb-2 text-xs font-medium text-neutral-500 dark:text-neutral-400">Tema</p>
                        <ThemeToggle />
                    </div>

                    <Link
                        href="/profile"
                        onClick={() => setIsSheetOpen(false)}
                        className="flex items-center gap-3 border-b border-neutral-100 px-5 py-4 text-sm text-neutral-700 hover:bg-neutral-50 dark:border-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-800"
                    >
                        <UserIcon className="h-4 w-4" />
                        Perfil
                    </Link>

                    <button
                        type="button"
                        onClick={() => { setIsSheetOpen(false); logout(); }}
                        className="flex w-full items-center gap-3 px-5 py-4 text-left text-sm text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950"
                    >
                        <LogOut className="h-4 w-4" />
                        Sair
                    </button>
                </div>
            </Dialog>
        </>
    );
}