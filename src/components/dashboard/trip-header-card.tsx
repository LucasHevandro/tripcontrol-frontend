// components/dashboard/trip-header-card.tsx
import Link from "next/link";
import { Plane, Calendar, Users, MapPin, Plus } from "lucide-react";
import type { TripSummary } from "@/types/trip";
import { formatDateRange } from "@/lib/format";

const STATUS_LABEL: Record<TripSummary["status"], string> = {
    planning: "Planejamento",
    ongoing: "Em andamento",
    completed: "Concluída",
};

const STATUS_STYLE: Record<TripSummary["status"], string> = {
    planning: "bg-amber-50 text-amber-700",
    ongoing: "bg-emerald-50 text-emerald-700",
    completed: "bg-neutral-100 text-neutral-500",
};

interface TripHeaderCardProps {
    trip: TripSummary;
}

export function TripHeaderCard({ trip }: TripHeaderCardProps) {
    return (
        <div className="flex flex-col gap-4 rounded-xl border border-neutral-200 bg-white p-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
                <h1 className="flex items-center gap-2 text-lg font-semibold text-neutral-900">
                    <Plane className="h-[18px] w-[18px] text-neutral-700" />
                    {trip.name}
                </h1>
                <div className="mt-1.5 flex flex-wrap items-center gap-4 text-sm text-neutral-500">
                    <span className="flex items-center gap-1.5">
                        <Calendar className="h-4 w-4" />
                        {formatDateRange(trip.startDate, trip.endDate)}
                    </span>
                    <span className="flex items-center gap-1.5">
                        <Users className="h-4 w-4" />
                        {trip.participantCount} participantes
                    </span>
                    <span className="flex items-center gap-1.5">
                        <MapPin className="h-4 w-4" />
                        {trip.destination}
                    </span>
                </div>
            </div>

            <div className="flex items-center gap-3">
                <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${STATUS_STYLE[trip.status]}`}
                >
                    {STATUS_LABEL[trip.status]}
                </span>
                <Link
                    href={`/trips/${trip.id}/finances/new`}
                    className="flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3.5 py-2 text-sm font-medium text-white transition-colors hover:bg-emerald-700"
                >
                    <Plus className="h-4 w-4" />
                    Adicionar despesa
                </Link>
            </div>
        </div>
    );
}