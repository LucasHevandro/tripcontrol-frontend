"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sparkles } from "lucide-react";

export type TripTab =
    | "dashboard"
    | "finances"
    | "roadmap"
    | "reservations"
    | "participants"
    | "checklist";

const TRIP_NAV_ITEMS: { key: TripTab; label: string; path: string }[] = [
    { key: "dashboard", label: "Dashboard", path: "dashboard" },
    { key: "finances", label: "Finanças", path: "finances" },
    { key: "roadmap", label: "Roteiro", path: "roadmap" },
    { key: "reservations", label: "Reservas", path: "reservations" },
    { key: "participants", label: "Participantes", path: "participants" },
    { key: "checklist", label: "Checklist", path: "checklist" },
];

interface TripNavbarProps {
    tripId: string;
    /**
     * Opcional: se não for passado, a aba ativa é detectada automaticamente
     * comparando a URL atual com o path de cada item (igual ao GlobalNavbar).
     * Só passe activeTab manualmente se precisar forçar um valor específico
     * (ex: páginas que não seguem o padrão de rota /viagens/[tripId]/<aba>).
     */
    activeTab?: TripTab;
    userInitials?: string;
}

export function TripNavbar({
    tripId,
    activeTab,
    userInitials = "LH",
}: TripNavbarProps) {
    const pathname = usePathname();

    return (
        <header className="flex items-center justify-between border-b border-neutral-200 bg-white px-6 py-4">
            <Link href="/trips" className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-neutral-900" />
                <span className="text-base font-semibold text-neutral-900">
                    TripControl
                </span>
            </Link>

            <nav className="flex items-center gap-7">
                {TRIP_NAV_ITEMS.map((item) => {
                    const href = `/trips/${tripId}/${item.path}`;
                    const isActive = activeTab
                        ? item.key === activeTab
                        : pathname === href || pathname.startsWith(`${href}/`);

                    return (
                        <Link
                            key={item.key}
                            href={href}
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

            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-xs font-semibold text-emerald-700">
                {userInitials}
            </div>
        </header>
    );
}