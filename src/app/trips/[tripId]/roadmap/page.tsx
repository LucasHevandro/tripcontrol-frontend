"use client";

import { use } from "react";
import { useRoadmap } from "@/hooks/roadmap/use-roadmap";
import { DaySelector } from "@/components/roadmap/day-selector";
import { ActiveReservations } from "@/components/roadmap/active-reservations";
import { ActivityTrigger } from "@/components/roadmap/activity-trigger";

export default function RoadmapPage({
    params,
}: {
    params: Promise<{ tripId: string }>;
}) {
    const { tripId } = use(params);
    const { data, isLoading, isError } = useRoadmap(tripId);

    if (isLoading) {
        return (
            <div className="space-y-1">
                <div className="h-8 w-48 animate-pulse rounded-lg bg-neutral-200 dark:bg-neutral-700" />
                <div className="h-64 w-full animate-pulse rounded-xl bg-neutral-200 dark:bg-neutral-700" />
            </div>
        );
    }

    if (isError || !data) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-center">
                <p className="text-sm text-neutral-500 dark:text-neutral-400">Erro ao carregar roteiro.</p>
            </div>
        );
    }

    const defaultDayIndex = Math.max(
        data.days.findIndex((d) => d.activities.length > 0),
        0,
    );

    return (
        <div className="space-y-1">
            <div className="flex items-start justify-between">
                <div>
                    <h1 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                        Planejamento de roteiro
                    </h1>
                    <p className="text-sm text-neutral-400">
                        {data.tripName} · {data.tripPeriod} · {data.tripDurationDays} dias
                    </p>
                </div>
                <ActivityTrigger
                    tripId={tripId}
                    defaultDate={data.days[defaultDayIndex]?.date}
                    variant="button"
                />
            </div>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_280px]">
                <div>
                    <DaySelector
                        tripId={tripId}
                        days={data.days}
                        defaultSelectedIndex={defaultDayIndex}
                    />
                </div>
            </div>
        </div>
    );
}