"use client";

import { NewTripTrigger } from "@/components/trips/new-trip-trigger";
import { TripsFilterTabs } from "@/components/trips/trips-filter-tabs";
import { TripsSkeleton } from "@/components/trips/trips-skeleton";
import { useTrips } from "@/hooks/trips/use-trips";
import { ErrorState } from "@/components/ui/error-state";
import { PageHeader } from "@/components/ui/page-header";

export default function MyTripsPage() {
    const { data, isLoading, isError, refetch, isRefetching } = useTrips();

    if (isLoading) return <TripsSkeleton />;

    if (isError) {
        return (
            <ErrorState
                title="Erro ao carregar viagens"
                description="Verifique sua conexão e tente novamente."
                onRetry={() => refetch()}
                isRetrying={isRefetching}
                className="mt-6"
            />
        );
    }

    return (
        <div className="space-y-1">
            <div className="flex items-center justify-between">
                <PageHeader title="Minhas viagens" subtitle={`${data?.activeTripCount ?? 0} viagens ativas · ${data?.completedTripCount ?? 0} concluídas`} />
                <NewTripTrigger variant="button" label="Criar Viagem" />
            </div>

            <TripsFilterTabs trips={data?.trips ?? []} />
        </div>
    );
}