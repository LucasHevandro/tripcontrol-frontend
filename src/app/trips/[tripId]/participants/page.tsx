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
            <div className="space-y-1">
                <div className="h-8 w-48 animate-pulse rounded-lg bg-neutral-200" />
                <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className="h-24 animate-pulse rounded-xl bg-neutral-200" />
                    ))}
                </div>
            </div>
        );
    }

    if (isError || !data) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-center">
                <p className="text-sm text-neutral-500">
                    Erro ao carregar participantes.
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-1">
            <div className="flex items-start justify-between">
                <div>
                    <h1 className="text-lg font-semibold text-neutral-900">
                        Gerenciamento de participantes
                    </h1>
                    <p className="text-sm text-neutral-400">
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
                    valueClassName="text-emerald-600"
                />
            </div>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_320px]">
                <div className="space-y-1">
                    <div className="flex items-center justify-between rounded-xl border border-neutral-200 bg-white px-4 py-3">
                        <h2 className="flex items-center gap-2 text-sm font-semibold text-neutral-900">
                            👥 Membros da viagem
                        </h2>
                        <span className="text-xs text-neutral-400">
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

                <SettlementSummary settlements={data.settlementSummary} />
            </div>
        </div>
    );
}