import { Plane, Calendar, Users, MapPin } from "lucide-react";
import type { TripDashboard } from "@/core/domain/trip/trip.types";
import { formatDateRange } from "@/lib/format";
import { ExpenseTrigger } from "@/components/expenses/expense-trigger";

type TripInfo = TripDashboard["trip"];

const STATUS_LABEL: Record<TripInfo["status"], string> = {
    PLANNING: "Planejamento",
    ONGOING: "Em andamento",
    COMPLETED: "Concluída",
};

const STATUS_STYLE: Record<TripInfo["status"], string> = {
    PLANNING: "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-400",
    ONGOING: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400",
    COMPLETED: "bg-neutral-100 text-neutral-500 dark:bg-neutral-800 dark:text-neutral-400",
};

interface TripHeaderCardProps {
    trip: TripInfo;
}

export function TripHeaderCard({ trip }: TripHeaderCardProps) {
    return (
        <div className="flex flex-col gap-4 rounded-xl border border-neutral-200 bg-white p-5 dark:border-neutral-700 dark:bg-neutral-900 sm:flex-row sm:items-center sm:justify-between">
            <div>
                <h1 className="flex items-center gap-2 text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                    <Plane className="h-[18px] w-[18px] text-neutral-700 dark:text-neutral-400" />
                    {trip.name}
                </h1>
                <div className="mt-1.5 flex flex-wrap items-center gap-4 text-sm text-neutral-500 dark:text-neutral-400">
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
                <span className={`rounded-full px-3 py-1 text-xs font-medium ${STATUS_STYLE[trip.status]}`}>
                    {STATUS_LABEL[trip.status]}
                </span>
                <ExpenseTrigger tripId={trip.id} variant="button" label="Adicionar despesa" />
            </div>
        </div>
    );
}