import Link from "next/link";
import { Plane, Calendar, Users, MapPin, UserPlus } from "lucide-react";
import type { TripDashboard } from "@/core/domain/trip/trip.types";
import { formatDateRange } from "@/lib/format";

type TripInfo = TripDashboard["trip"];

interface NewTripHeaderCardProps {
    trip: TripInfo;
}

export function NewTripHeaderCard({ trip }: NewTripHeaderCardProps) {
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
                        <MapPin className="h-4 w-4" />
                        {trip.destination}
                    </span>
                    <span className="flex items-center gap-1.5">
                        <Users className="h-4 w-4" />
                        {trip.participantCount} participante
                        {trip.participantCount !== 1 ? "s" : ""}
                    </span>
                </div>
            </div>

            <div className="flex items-center gap-3">
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                    Recém criada
                </span>
                <Link
                    href={`/trips/${trip.id}/participants`}
                    className="flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3.5 py-2 text-sm font-medium text-white transition-colors hover:bg-emerald-700"
                >
                    <UserPlus className="h-4 w-4" />
                    Convidar
                </Link>
            </div>
        </div>
    );
}