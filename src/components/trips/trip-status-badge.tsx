import type { TripStatus } from "@/types/trip";

const STATUS_LABEL: Record<TripStatus, string> = {
    planning: "Planejamento",
    ongoing: "Em andamento",
    completed: "Concluída",
};

const STATUS_STYLE: Record<TripStatus, string> = {
    planning: "bg-amber-50 text-amber-700",
    ongoing: "bg-emerald-50 text-emerald-700",
    completed: "bg-neutral-100 text-neutral-500",
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