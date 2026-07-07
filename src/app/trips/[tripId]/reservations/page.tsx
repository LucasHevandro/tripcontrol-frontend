<<<<<<< HEAD
"use client";

import { use, useState } from "react";
import { formatCurrencyBRL } from "@/lib/format";
import { useReservations } from "@/hooks/reservations/use-reservations";
import { ReservationStatCard } from "@/components/reservations/reservation-stat-card";
import { ReservationCard } from "@/components/reservations/reservation-card";
import { CategoryFilter } from "@/components/reservations/category-filter";
import { ReservationTrigger } from "@/components/reservations/reservation-trigger";
import type { ReservationCategory } from "@/core/domain/reservation/reservation.types";

type FilterOption = ReservationCategory | "all";

export default function ReservationsPage({
    params,
}: {
    params: Promise<{ tripId: string }>;
}) {
    const { tripId } = use(params);
    const [filter, setFilter] = useState<FilterOption>("all");
    const { data, isLoading, isError } = useReservations(tripId);

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

    if (isError) return (
        <div className="flex flex-col items-center justify-center py-20 text-center">
            <p className="text-sm text-neutral-500 dark:text-neutral-400">Erro ao carregar Reservas.</p>
        </div>
    );

    const filtered =
        filter === "all"
            ? (data?.reservations ?? [])
            : (data?.reservations ?? []).filter((r) => r.category === filter);

    return (
        <div className="space-y-1">
            <div className="flex items-start justify-between">
                <div>
                    <h1 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                        Gerenciamento de reservas
                    </h1>
                    <p className="text-sm text-neutral-400">
                        {data?.tripName} · {data?.tripPeriod}
                    </p>
                </div>
                <ReservationTrigger tripId={tripId} variant="button" label="Nova reserva" />
            </div>

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
=======
export default function ReservationsPage() {
    return (
        <div className="min-h-screen bg-[#f7f6f1]">
            <main className="px-6 py-8">
                {/* Lista de cards de viagens (Florianópolis, Serra Gaúcha, etc.) entra aqui */}
            </main>
>>>>>>> origin/main
        </div>
    );
}