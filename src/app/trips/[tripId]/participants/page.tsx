import Link from "next/link";
import { UserPlus } from "lucide-react";
import { getTripParticipantsMock } from "@/lib/mock-trip";
import { formatCurrencyBRL } from "@/lib/format";
import { ParticipantStatCard } from "@/components/participants/participant-stat-card";
import { ParticipantCard } from "@/components/participants/participant-card";
import { InvitePanel } from "@/components/participants/invite-panel";
import { SettlementSummary } from "@/components/participants/settlement-summary";

export default async function ParticipantsPage({
    params,
}: {
    params: Promise<{ tripId: string }>;
}) {
    const { tripId } = await params;
    const data = getTripParticipantsMock(tripId);

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
                <Link
                    href={`/trips/${tripId}/participants/invite`}
                    className="flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3.5 py-2 text-sm font-medium text-white hover:bg-emerald-700"
                >
                    <UserPlus className="h-4 w-4" />
                    Convidar participante
                </Link>
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

                <div className="space-y-4">
                    <InvitePanel inviteLink={data.inviteLink} />
                    <SettlementSummary settlements={data.settlementSummary} />
                </div>
            </div>
        </div>
    );
}