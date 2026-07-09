"use client";

import { use } from "react";
import { useRoadmap } from "@/hooks/roadmap/use-roadmap";
import { DaySelector } from "@/components/roadmap/day-selector";
import { ActivityTrigger } from "@/components/roadmap/activity-trigger";
import { PageHeader } from "@/components/ui/page-header";
import { ErrorState } from "@/components/ui/error-state";
import { ActiveReservations } from "@/components/roadmap/active-reservations";
export default function RoadmapPage({
    params,
}: {
    params: Promise<{ tripId: string }>;
}) {
    const { tripId } = use(params);
    const { data, isLoading, isRefetching, isError, refetch } = useRoadmap(tripId);

    if (isLoading) {
        return (
            <div className="space-y-1">
                <div className="h-8 w-48 animate-pulse rounded-lg bg-neutral-200 dark:bg-neutral-700" />
                <div className="h-64 w-full animate-pulse rounded-xl bg-neutral-200 dark:bg-neutral-700" />
            </div>
        );
    }

    if (isError || !data) return (
        <ErrorState
            title="Não foi possível carregar o roteiro"
            onRetry={() => refetch()}
            isRetrying={isRefetching}
            className="mt-6"
        />
    );

    const defaultDayIndex = Math.max(
        data.days.findIndex((d) => d.activities.length > 0),
        0,
    );

    return (
        <div className="space-y-6">
            <PageHeader
                title="Planejamento de roteiro"
                subtitle={`${data.tripName} · ${data.tripPeriod} · ${data.tripDurationDays} dias`}
                action={
                    <ActivityTrigger
                        tripId={tripId}
                        defaultDate={data.days[defaultDayIndex]?.date}
                        variant="button"
                    />
                }
            />

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_280px]">
                <div>
                    <DaySelector
                        tripId={tripId}
                        days={data.days}
                        defaultSelectedIndex={defaultDayIndex}
                    />
                </div>
                <aside className="space-y-4">
                    {data.activeReservations.length > 0 && (
                        <ActiveReservations reservations={data.activeReservations} />
                    )}
                </aside>
            </div>
        </div>
    );
}