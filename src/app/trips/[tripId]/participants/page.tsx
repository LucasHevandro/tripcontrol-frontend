<<<<<<< HEAD
"use client";

import { use } from "react";
import { formatCurrencyBRL } from "@/lib/format";
import { useParticipants } from "@/hooks/participants/use-participants";
import { ParticipantStatCard } from "@/components/participants/participant-stat-card";
import { ParticipantCard } from "@/components/participants/participant-card";
import { SettlementSummary } from "@/components/participants/settlement-summary";
import { InviteTrigger } from "@/components/participants/invite-trigger";

export default function ParticipantsPage({
    params,
}: {
    params: Promise<{ tripId: string }>;
}) {
    const { tripId } = use(params);
    const { data, isLoading, isError } = useParticipants(tripId);

    if (isLoading) {
        return (
            <div className="space-y-4">
                <div className="flex items-start justify-between">
                    <div className="space-y-1.5">
                        <div className="h-6 w-60 animate-pulse rounded-lg bg-neutral-200 dark:bg-neutral-700" />
                        <div className="h-4 w-44 animate-pulse rounded-lg bg-neutral-200 dark:bg-neutral-700" />
                    </div>
                    <div className="h-9 w-44 animate-pulse rounded-lg bg-neutral-200 dark:bg-neutral-700" />
                </div>
                <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className="h-24 animate-pulse rounded-xl bg-neutral-200 dark:bg-neutral-700" />
                    ))}
                </div>
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_320px]">
                    <div className="space-y-2">
                        <div className="h-12 animate-pulse rounded-xl bg-neutral-200 dark:bg-neutral-700" />
                        {Array.from({ length: 2 }).map((_, i) => (
                            <div key={i} className="h-40 animate-pulse rounded-xl bg-neutral-200 dark:bg-neutral-700" />
                        ))}
                    </div>
                    <div className="h-64 animate-pulse rounded-xl bg-neutral-200 dark:bg-neutral-700" />
                </div>
            </div>
        );
    }

    if (isError || !data) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-center">
                <p className="text-sm text-neutral-500 dark:text-neutral-400">
                    Erro ao carregar participantes.
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <div className="flex items-start justify-between">
                <div>
                    <h1 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                        Gerenciamento de participantes
                    </h1>
                    <p className="text-sm text-neutral-400 dark:text-neutral-500">
                        {data.tripName} · {data.tripPeriod}
                    </p>
                </div>
                <InviteTrigger
                    tripId={tripId}
                    tripName={data.tripName}
                    inviteLink={data.inviteLink}
                />
            </div>

            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                <ParticipantStatCard
                    label="Participantes"
                    value={String(data.participantCount)}
                    sublabel={`${data.organizerCount} organizador`}
                />
                <ParticipantStatCard
                    label="Total gasto"
                    value={formatCurrencyBRL(data.totalSpent)}
                    sublabel={`média ${formatCurrencyBRL(data.perPersonAverage)}/pessoa`}
                />
                <ParticipantStatCard
                    label="Acertos pendentes"
                    value={String(data.pendingSettlementsCount)}
                    sublabel={`${formatCurrencyBRL(data.pendingSettlementsAmount)} a resolver`}
                />
                <ParticipantStatCard
                    label="Status do grupo"
                    value={data.groupStatusLabel}
                    sublabel={data.groupStatusSublabel}
                    valueClassName="text-emerald-600 dark:text-emerald-400"
                />
            </div>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_320px]">
                <div className="space-y-2">
                    {/* Cabeçalho da lista */}
                    <div className="flex items-center justify-between rounded-xl border border-neutral-200 bg-white px-4 py-3 dark:border-neutral-700 dark:bg-neutral-900">
                        <h2 className="flex items-center gap-2 text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                            👥 Membros da viagem
                        </h2>
                        <span className="text-xs text-neutral-400 dark:text-neutral-500">
                            {data.participantCount} de {data.maxParticipants} vagas
                        </span>
                    </div>

                    {data.participants.map((participant) => (
                        <ParticipantCard
                            key={participant.id}
                            participant={participant}
                            tripId={tripId}
                        />
                    ))}
                </div>

                <SettlementSummary tripId={tripId} settlements={data.settlementSummary} />
            </div>
=======
export default function ParticipantsPage() {
    return (
        <div className="min-h-screen bg-[#f7f6f1]">
            <main className="px-6 py-8">
                {/* Lista de cards de viagens (Florianópolis, Serra Gaúcha, etc.) entra aqui */}
            </main>
>>>>>>> origin/main
        </div>
    );
}