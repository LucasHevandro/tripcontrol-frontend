"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    Sparkles,
    Menu,
    X,
    Map,
    CircleUser,
    LogOut,
    User as UserIcon,
} from "lucide-react";
import { useUser } from "@/contexts/user-context";
import { getInitials } from "@/lib/get-initials";

const GLOBAL_NAV_ITEMS = [
    { label: "Minhas viagens", href: "/trips", icon: Map },
    { label: "Perfil", href: "/profile", icon: CircleUser },
];

function isItemActive(pathname: string, href: string) {
    return pathname === href || pathname.startsWith(`${href}/`);
}

export function GlobalNavbar() {
    const pathname = usePathname();
    const { user, isLoading, logout } = useUser();

    // Mobile: painel lateral completo (navegação + conta + logout)
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    // Desktop: dropdown pequeno ancorado no avatar (só Perfil + Sair)
    const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
    const accountMenuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setIsDrawerOpen(false);
        setIsAccountMenuOpen(false);
    }, [pathname]);

    useEffect(() => {
        document.body.style.overflow = isDrawerOpen ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [isDrawerOpen]);

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (
                accountMenuRef.current &&
                !accountMenuRef.current.contains(e.target as Node)
            ) {
                setIsAccountMenuOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <>
            <header className="flex items-center justify-between border-b border-neutral-200 bg-white px-4 py-3.5 md:px-6 md:py-4">
                <Link href="/trips" className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-neutral-900" />
                    <span className="text-[15px] font-semibold text-neutral-900 md:text-base">
                        TripControl
                    </span>
                </Link>

                {/* Navegação horizontal — só em telas md+ */}
                <nav className="hidden items-center gap-7 md:flex">
                    {GLOBAL_NAV_ITEMS.map((item) => {
                        const isActive = isItemActive(pathname, item.href);
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`relative pb-1 text-sm transition-colors ${isActive
                                    ? "font-medium text-emerald-700"
                                    : "text-neutral-400 hover:text-neutral-600"
                                    }`}
                            >
                                {item.label}
                                {isActive && (
                                    <span className="absolute -bottom-[17px] left-0 h-[2px] w-full bg-emerald-600" />
                                )}
                            </Link>
                        );
                    })}
                </nav>

                {/* Desktop: avatar abre um dropdown pequeno (Perfil + Sair) */}
                <div className="relative hidden md:block" ref={accountMenuRef}>
                    {isLoading ? (
                        <div className="h-8 w-8 animate-pulse rounded-full bg-neutral-200" />
                    ) : (
                        <button
                            type="button"
                            onClick={() => setIsAccountMenuOpen((v) => !v)}
                            className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-xs font-semibold text-emerald-700 transition-opacity hover:opacity-80"
                            aria-label="Menu da conta"
                            aria-expanded={isAccountMenuOpen}
                        >
                            {user ? getInitials(user.name) : "?"}
                        </button>
                    )}

                    {isAccountMenuOpen && (
                        <div className="absolute right-0 top-[calc(100%+8px)] w-52 rounded-lg border border-neutral-200 bg-white py-1 shadow-lg">
                            {user && (
                                <div className="border-b border-neutral-100 px-4 py-3">
                                    <p className="text-sm font-medium text-neutral-900">
                                        {user.name}
                                    </p>
                                    <p className="text-xs text-neutral-500">{user.email}</p>
                                </div>
                            )}

                            <Link
                                href="/profile"
                                onClick={() => setIsAccountMenuOpen(false)}
                                className="flex items-center gap-2 px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50"
                            >
                                <UserIcon className="h-4 w-4" />
                                Perfil
                            </Link>

                            <button
                                type="button"
                                onClick={() => {
                                    setIsAccountMenuOpen(false);
                                    logout();
                                }}
                                className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-rose-600 hover:bg-rose-50"
                            >
                                <LogOut className="h-4 w-4" />
                                Sair
                            </button>
                        </div>
                    )}
                </div>

                {/* Mobile: hambúrguer abre o painel lateral completo */}
                <button
                    type="button"
                    onClick={() => setIsDrawerOpen(true)}
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-neutral-600 hover:bg-neutral-100 md:hidden"
                    aria-label="Abrir menu de navegação"
                    aria-expanded={isDrawerOpen}
                >
                    <Menu className="h-[22px] w-[22px]" />
                </button>
            </header>

            {isDrawerOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/40 md:hidden"
                    onClick={() => setIsDrawerOpen(false)}
                    aria-hidden="true"
                />
            )}

            <div
                className={`fixed inset-y-0 right-0 z-50 w-[280px] max-w-[85vw] transform bg-white shadow-xl transition-transform duration-200 md:hidden ${isDrawerOpen ? "translate-x-0" : "translate-x-full"
                    }`}
                role="dialog"
                aria-modal="true"
                aria-label="Menu de navegação"
            >
                <div className="flex flex-col h-full">
                    <div className="flex items-center justify-between border-b border-neutral-200 px-4 py-4">
                        <span className="flex items-center gap-2 text-[15px] font-semibold text-neutral-900">
                            <Sparkles className="h-4 w-4" />
                            TripControl
                        </span>
                        <button
                            type="button"
                            onClick={() => setIsDrawerOpen(false)}
                            className="flex h-8 w-8 items-center justify-center rounded-lg text-neutral-500 hover:bg-neutral-100"
                            aria-label="Fechar menu"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>

                    {user && (
                        <div className="border-b border-neutral-100 bg-neutral-50 px-4 py-3.5">
                            <p className="text-[13px] font-semibold text-neutral-900">
                                {user.name}
                            </p>
                            <p className="mt-0.5 text-[11px] text-neutral-400">
                                {user.email}
                            </p>
                        </div>
                    )}

                    <nav className="flex-1 overflow-y-auto p-2">
                        {GLOBAL_NAV_ITEMS.map((item) => {
                            const isActive = isItemActive(pathname, item.href);
                            const Icon = item.icon;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`mb-0.5 flex items-center gap-3 rounded-lg px-3 py-3 text-sm transition-colors ${isActive
                                        ? "bg-emerald-50 font-medium text-emerald-700"
                                        : "text-neutral-600 hover:bg-neutral-50"
                                        }`}
                                >
                                    <Icon className="h-[18px] w-[18px] flex-shrink-0" />
                                    {item.label}
                                </Link>
                            );
                        })}
                    </nav>

                    <div className="border-t border-neutral-100 p-2">
                        <button
                            type="button"
                            onClick={() => {
                                setIsDrawerOpen(false);
                                logout();
                            }}
                            className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left text-sm text-rose-600 hover:bg-rose-50"
                        >
                            <LogOut className="h-[18px] w-[18px]" />
                            Sair
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}