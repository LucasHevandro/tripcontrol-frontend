"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sparkles, LogOut, User as UserIcon } from "lucide-react";
import { useUser } from "@/contexts/user-context";
import { getInitials } from "@/lib/get-initials";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Dialog } from "@/components/ui/dialog";
import { TripBottomBar, TRIP_NAV_ITEMS, type TripTab } from "./trip-bottom-bar";

export type { TripTab };

interface TripNavbarProps {
    tripId: string;
    activeTab?: TripTab;
}

export function TripNavbar({ tripId, activeTab }: TripNavbarProps) {
    const pathname = usePathname();
    const { user, isLoading, logout } = useUser();
    const [isAccountSheetOpen, setIsAccountSheetOpen] = useState(false);
    const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
    const accountMenuRef = useRef<HTMLDivElement>(null);

    // Fecha menus quando muda de rota
    useEffect(() => {
        setIsAccountSheetOpen(false);
        setIsAccountMenuOpen(false);
    }, [pathname]);

    // Fecha dropdown desktop ao clicar fora
    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (accountMenuRef.current && !accountMenuRef.current.contains(e.target as Node)) {
                setIsAccountMenuOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    function getHref(path: string) {
        return `/trips/${tripId}/${path}`;
    }

    function isItemActive(key: TripTab, href: string) {
        return activeTab
            ? key === activeTab
            : pathname === href || pathname.startsWith(`${href}/`);
    }

    function handleAvatarClick() {
        // Desktop: dropdown; Mobile: sheet
        if (window.matchMedia("(min-width: 768px)").matches) {
            setIsAccountMenuOpen((v) => !v);
        } else {
            setIsAccountSheetOpen(true);
        }
    }

    return (
        <>
            <header className="flex items-center justify-between border-b border-neutral-200 bg-white px-4 py-3.5 dark:border-neutral-800 dark:bg-neutral-900 md:px-6 md:py-4">
                <Link href="/trips" className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-neutral-900 dark:text-neutral-100" />
                    <span className="text-[15px] font-semibold text-neutral-900 dark:text-neutral-100 md:text-base">
                        TripControl
                    </span>
                </Link>

                {/* Nav horizontal (desktop) */}
                <nav className="hidden items-center gap-7 md:flex">
                    {TRIP_NAV_ITEMS.map((item) => {
                        const href = getHref(item.path);
                        const isActive = isItemActive(item.key, href);
                        return (
                            <Link
                                key={item.key}
                                href={href}
                                className={`relative pb-1 text-sm transition-colors ${isActive
                                    ? "font-medium text-emerald-700 dark:text-emerald-400"
                                    : "text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200"
                                    }`}
                            >
                                {item.label}
                                {isActive && (
                                    <span className="absolute -bottom-[17px] left-0 h-[2px] w-full bg-emerald-600 dark:bg-emerald-400" />
                                )}
                            </Link>
                        );
                    })}
                </nav>

                <div className="flex items-center gap-3">
                    <div className="hidden md:block">
                        <ThemeToggle />
                    </div>

                    <div className="relative" ref={accountMenuRef}>
                        {isLoading ? (
                            <div className="h-8 w-8 animate-pulse rounded-full bg-neutral-200 dark:bg-neutral-700" />
                        ) : (
                            <button
                                type="button"
                                onClick={handleAvatarClick}
                                className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-xs font-semibold text-emerald-700 transition-opacity hover:opacity-80 dark:bg-emerald-900 dark:text-emerald-300"
                                aria-label="Menu da conta"
                                aria-expanded={isAccountMenuOpen || isAccountSheetOpen}
                            >
                                {user ? getInitials(user.name) : "?"}
                            </button>
                        )}

                        {/* Dropdown (desktop) */}
                        {isAccountMenuOpen && (
                            <div className="absolute right-0 top-[calc(100%+8px)] z-50 hidden w-52 rounded-lg border border-neutral-200 bg-white py-1 shadow-lg dark:border-neutral-700 dark:bg-neutral-900 md:block">                                {user && (
                                <div className="border-b border-neutral-100 px-4 py-3 dark:border-neutral-800">
                                    <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">{user.name}</p>
                                    <p className="text-xs text-neutral-500 dark:text-neutral-400">{user.email}</p>
                                </div>
                            )}
                                <Link
                                    href="/profile"
                                    onClick={() => setIsAccountMenuOpen(false)}
                                    className="flex items-center gap-2 px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50 dark:text-neutral-300 dark:hover:bg-neutral-800"
                                >
                                    <UserIcon className="h-4 w-4" />
                                    Perfil
                                </Link>
                                <button
                                    type="button"
                                    onClick={() => { setIsAccountMenuOpen(false); logout(); }}
                                    className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950"
                                >
                                    <LogOut className="h-4 w-4" />
                                    Sair
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </header>

            {/* Sheet de conta (mobile) */}
            <Dialog
                open={isAccountSheetOpen}
                onClose={() => setIsAccountSheetOpen(false)}
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
                        onClick={() => setIsAccountSheetOpen(false)}
                        className="flex items-center gap-3 border-b border-neutral-100 px-5 py-4 text-sm text-neutral-700 hover:bg-neutral-50 dark:border-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-800"
                    >
                        <UserIcon className="h-4 w-4" />
                        Perfil
                    </Link>

                    <button
                        type="button"
                        onClick={() => { setIsAccountSheetOpen(false); logout(); }}
                        className="flex w-full items-center gap-3 px-5 py-4 text-left text-sm text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950"
                    >
                        <LogOut className="h-4 w-4" />
                        Sair
                    </button>
                </div>
            </Dialog>

            <TripBottomBar tripId={tripId} activeTab={activeTab} />
        </>
    );
}