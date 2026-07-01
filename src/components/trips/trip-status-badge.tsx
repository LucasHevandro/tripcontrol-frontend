import type { TripStatus } from "@/core/domain/trip/trip.types";

const STATUS_LABEL: Record<TripStatus, string> = {
    PLANNING: "Planejamento",
    ONGOING: "Em andamento",
    COMPLETED: "Concluída",
};

const STATUS_STYLE: Record<TripStatus, string> = {
    PLANNING: "bg-amber-50 text-amber-700",
    ONGOING: "bg-emerald-50 text-emerald-700",
    COMPLETED: "bg-neutral-100 text-neutral-500",
};

interface TripStatusBadgeProps {
    status: TripStatus;
}

export function TripStatusBadge({ status }: TripStatusBadgeProps) {
    return (
        <span
            className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${STATUS_STYLE[status]}`}
        >
            {STATUS_LABEL[status]}
        </span>
    );
}