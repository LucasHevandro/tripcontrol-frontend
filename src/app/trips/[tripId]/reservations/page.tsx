"use client";

import { use, useState } from "react";
import { formatCurrencyBRL } from "@/lib/format";
import { useReservations } from "@/hooks/reservations/use-reservations";
import { ReservationStatCard } from "@/components/reservations/reservation-stat-card";
import { ReservationCard } from "@/components/reservations/reservation-card";
import { CategoryFilter } from "@/components/reservations/category-filter";
import { ReservationTrigger } from "@/components/reservations/reservation-trigger";
import type { ReservationCategory } from "@/core/domain/reservation/reservation.types";
import { PageHeader } from "@/components/ui/page-header";
import { ErrorState } from "@/components/ui/error-state";

type FilterOption = ReservationCategory | "all";

export default function ReservationsPage({
    params,
}: {
    params: Promise<{ tripId: string }>;
}) {
    const { tripId } = use(params);
    const [filter, setFilter] = useState<FilterOption>("all");
    const { data, isLoading, isRefetching, isError, refetch } = useReservations(tripId);

    if (isLoading) {
        return (
            <div className="space-y-1">
                <div className="h-8 w-48 animate-pulse rounded-lg bg-neutral-200 dark:bg-neutral-700" />
                <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className="h-24 animate-pulse rounded-xl bg-neutral-200 dark:bg-neutral-700" />
                    ))}
                </div>
            </div>
        );
    }

    if (isError || !data) return (
        <ErrorState
            title="Não foi possível carregar as reservas"
            onRetry={() => refetch()}
            isRetrying={isRefetching}
            className="mt-6"
        />
    );

    const filtered =
        filter === "all"
            ? (data?.reservations ?? [])
            : (data?.reservations ?? []).filter((r) => r.category === filter);

    return (
        <div className="space-y-6">
            <PageHeader
                title="Gerenciamento de reservas"
                subtitle={`${data?.tripName} · ${data?.tripPeriod}`}
                action={
                    <ReservationTrigger tripId={tripId} variant="button" label="Nova reserva" />
                }
            />

            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                <ReservationStatCard
                    label="Total de reservas"
                    value={String(data?.totalReservations ?? 0)}
                    sublabel={`${data?.confirmedCount ?? 0} confirmadas`}
                />
                <ReservationStatCard
                    label="Total investido"
                    value={formatCurrencyBRL(data?.totalInvested ?? 0)}
                    sublabel="em reservas"
                />
                <ReservationStatCard
                    label="Próximo check-in"
                    value={data?.nextCheckinLabel ?? "N/A"}
                    sublabel=""
                />
                <ReservationStatCard
                    label="Próximo voo"
                    value={data?.nextFlightLabel ?? "N/A"}
                    sublabel=""
                />
            </div>

            <CategoryFilter activeFilter={filter} onChange={setFilter} />

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {filtered.map((res) => (
                    <ReservationCard
                        key={res.id}
                        tripId={tripId}
                        reservation={{
                            ...res,
                            warning: res.warning ?? undefined,
                        }}
                    />
                ))}
                {filter === "all" && (
                    <ReservationTrigger tripId={tripId} variant="card" />
                )}
            </div>
        </div>
    );
}