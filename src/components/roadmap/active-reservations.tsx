import { BedDouble, Car, Plane, Ship, type LucideIcon } from "lucide-react";
import type { ActiveReservation } from "@/types/trip";

const ICON_MAP: Record<ActiveReservation["icon"], LucideIcon> = {
    hotel: BedDouble, car: Car, flight: Plane, boat: Ship,
};

const STATUS_BADGE: Record<ActiveReservation["status"], { label: string; className: string }> = {
    confirmed: { label: "Confirmado", className: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400" },
    pending: { label: "Pendente", className: "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-400" },
    cancelled: { label: "Cancelado", className: "bg-rose-50 text-rose-700 dark:bg-rose-950 dark:text-rose-400" },
};

interface ActiveReservationsProps {
    reservations: ActiveReservation[];
}

export function ActiveReservations({ reservations }: ActiveReservationsProps) {
    return (
        <div className="rounded-xl border border-neutral-200 bg-white p-4 dark:border-neutral-700 dark:bg-neutral-900">
            <h2 className="flex items-center gap-2 text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                🏨 Reservas ativas
            </h2>

            <ul className="mt-3 space-y-3">
                {reservations.map((res) => {
                    const Icon = ICON_MAP[res.icon];
                    const badge = STATUS_BADGE[res.status];
                    return (
                        <li key={res.id} className="flex items-center gap-3 border-b border-neutral-100 pb-3 last:border-0 last:pb-0 dark:border-neutral-800">
                            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400">
                                <Icon className="h-4 w-4" />
                            </span>
                            <div className="min-w-0 flex-1">
                                <p className="truncate text-sm font-medium text-neutral-900 dark:text-neutral-100">{res.title}</p>
                                <p className="text-xs text-neutral-400 dark:text-neutral-500">{res.subtitle}</p>
                            </div>
                            <span className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${badge.className}`}>
                                {badge.label}
                            </span>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}