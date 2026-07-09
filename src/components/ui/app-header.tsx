"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sparkles } from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { AccountMenu } from "@/components/ui/account-menu";

export interface HeaderNavItem {
    key: string;
    label: string;
    href: string;
}

interface AppHeaderProps {
    navItems: HeaderNavItem[];
    /** Se definido, sobrescreve a lógica de rota — usado quando o layout já sabe qual aba está ativa. */
    activeKey?: string;
    /** Se true, mostra os links do nav também no mobile. Padrão: só desktop (usado com bottom bar). */
    showNavOnMobile?: boolean;
}

export function AppHeader({ navItems, activeKey, showNavOnMobile = false }: AppHeaderProps) {
    const pathname = usePathname();

    function isActive(item: HeaderNavItem) {
        if (activeKey) return item.key === activeKey;
        return pathname === item.href || pathname.startsWith(`${item.href}/`);
    }

    return (
        <header className="flex items-center justify-between border-b border-neutral-200 bg-white px-4 py-3.5 dark:border-neutral-800 dark:bg-neutral-900 md:px-6 md:py-4">
            <Link href="/trips" className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-neutral-900 dark:text-neutral-100" />
                <span className="text-[15px] font-semibold text-neutral-900 dark:text-neutral-100 md:text-base">
                    TripControl
                </span>
            </Link>

            <nav className={`items-center gap-5 sm:gap-7 ${showNavOnMobile ? "flex" : "hidden md:flex"}`}>
                {navItems.map((item) => {
                    const active = isActive(item);
                    return (
                        <Link
                            key={item.key}
                            href={item.href}
                            className={`relative pb-1 text-sm transition-colors ${active
                                ? "font-medium text-emerald-700 dark:text-emerald-400"
                                : "text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200"
                                }`}
                        >
                            {item.label}
                            {active && (
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
                <AccountMenu />
            </div>
        </header>
    );
}