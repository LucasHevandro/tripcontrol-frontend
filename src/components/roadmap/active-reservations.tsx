import { BedDouble, Car, Plane, Ship } from "lucide-react";
import type { ActiveReservation } from "@/types/trip";
import type { LucideIcon } from "lucide-react";

const ICON_MAP: Record<ActiveReservation["icon"], LucideIcon> = {
    hotel: BedDouble,
    car: Car,
    flight: Plane,
    boat: Ship,
};

const STATUS_BADGE: Record<ActiveReservation["status"], { label: string; className: string }> = {
    confirmed: { label: "Confirmado", className: "bg-emerald-50 text-emerald-700" },
    pending: { label: "Pendente", className: "bg-amber-50 text-amber-700" },
    cancelled: { label: "Cancelado", className: "bg-rose-50 text-rose-700" },
};

interface ActiveReservationsProps {
    reservations: ActiveReservation[];
}

export function ActiveReservations({ reservations }: ActiveReservationsProps) {
    return (
        <div className="rounded-xl border border-neutral-200 bg-white p-4">
            <h2 className="flex items-center gap-2 text-sm font-semibold text-neutral-900">
                🏨 Reservas ativas
            </h2>

            <ul className="mt-3 space-y-3">
                {reservations.map((res) => {
                    const Icon = ICON_MAP[res.icon];
                    const badge = STATUS_BADGE[res.status];
                    return (
                        <li
                            key={res.id}
                            className="flex items-center gap-3 border-b border-neutral-100 pb-3 last:border-0 last:pb-0"
                        >
                            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-neutral-100 text-neutral-600">
                                <Icon className="h-4 w-4" />
                            </span>
                            <div className="flex-1 min-w-0">
                                <p className="truncate text-sm font-medium text-neutral-900">
                                    {res.title}
                                </p>
                                <p className="text-xs text-neutral-400">{res.subtitle}</p>
                            </div>
                            <span
                                className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${badge.className}`}
                            >
                                {badge.label}
                            </span>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}