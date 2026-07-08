"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Wallet, Map, Building2, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type TripTab = "dashboard" | "finances" | "roadmap" | "reservations" | "participants";

export interface TripNavItem {
    key: TripTab;
    label: string;
    shortLabel?: string;
    path: string;
    icon: LucideIcon;
}

export const TRIP_NAV_ITEMS: TripNavItem[] = [
    { key: "dashboard", label: "Dashboard", path: "dashboard", icon: LayoutDashboard },
    { key: "finances", label: "Finanças", path: "finances", icon: Wallet },
    { key: "roadmap", label: "Roteiro", path: "roadmap", icon: Map },
    { key: "reservations", label: "Reservas", path: "reservations", icon: Building2 },
    { key: "participants", label: "Participantes", shortLabel: "Grupo", path: "participants", icon: Users },
];

interface TripBottomBarProps {
    tripId: string;
    activeTab?: TripTab;
}

export function TripBottomBar({ tripId, activeTab }: TripBottomBarProps) {
    const pathname = usePathname();

    function getHref(path: string) {
        return `/trips/${tripId}/${path}`;
    }

    function isItemActive(key: TripTab, href: string) {
        return activeTab
            ? key === activeTab
            : pathname === href || pathname.startsWith(`${href}/`);
    }

    return (
        <nav
            aria-label="Navegação da viagem"
            className="fixed inset-x-0 bottom-0 z-40 border-t border-neutral-200 bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur dark:border-neutral-800 dark:bg-neutral-900/95 md:hidden"
        >
            <div className="grid grid-cols-5">
                {TRIP_NAV_ITEMS.map((item) => {
                    const href = getHref(item.path);
                    const isActive = isItemActive(item.key, href);
                    const Icon = item.icon;
                    return (
                        <Link
                            key={item.key}
                            href={href}
                            aria-current={isActive ? "page" : undefined}
                            className="flex flex-col items-center gap-0.5 pb-2 pt-2"
                        >
                            <span
                                className={`flex h-7 w-14 items-center justify-center rounded-full transition-colors ${isActive
                                        ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400"
                                        : "text-neutral-500 dark:text-neutral-400"
                                    }`}
                            >
                                <Icon className="h-[18px] w-[18px]" />
                            </span>
                            <span
                                className={`text-[11px] ${isActive
                                        ? "font-medium text-emerald-700 dark:text-emerald-400"
                                        : "text-neutral-500 dark:text-neutral-400"
                                    }`}
                            >
                                {item.shortLabel ?? item.label}
                            </span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}