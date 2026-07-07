"use client";

import { NewTripTrigger } from "@/components/trips/new-trip-trigger";
import { TripsFilterTabs } from "@/components/trips/trips-filter-tabs";
import { TripsSkeleton } from "@/components/trips/trips-skeleton";
import { useTrips } from "@/hooks/trips/use-trips";

export default function MyTripsPage() {
    const { data, isLoading, isError } = useTrips();

    if (isLoading) return <TripsSkeleton />;

    if (isError) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-center">
                <p className="text-sm text-neutral-500">
                    Erro ao carregar viagens. Tente novamente.
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-1">
            <div className="flex items-start justify-between">
                <div>
                    <h1 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                        Minhas viagens
                    </h1>
                    <p className="text-sm text-neutral-400">
                        {data?.activeTripCount ?? 0} viagens ativas ·{" "}
                        {data?.completedTripCount ?? 0} concluída
                    </p>
                </div>
                <NewTripTrigger variant="button" />
            </div>

            <TripsFilterTabs trips={data?.trips ?? []} />
        </div>
    );
}