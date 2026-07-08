import type { ReactNode } from "react";
import { Calendar, MapPin, Users } from "lucide-react";
import { formatDateRange, formatCurrencyBRL } from "@/lib/format";
import type { TripDashboard } from "@/core/domain/trip/trip.types";

type TripInfo = TripDashboard["trip"];

interface TripHeroCardProps {
    trip: TripInfo;
    totalSpent?: number;
    budget?: number;
    primaryAction?: ReactNode;
}

const STATUS_CHIP = {
    PLANNING: "bg-white/15 text-emerald-50 backdrop-blur-sm",
    ONGOING: "bg-white text-emerald-700",
    COMPLETED: "bg-white/15 text-emerald-50 backdrop-blur-sm",
} as const;

const STATUS_LABEL = {
    PLANNING: "Planejamento",
    ONGOING: "Em andamento",
    COMPLETED: "Concluída",
} as const;

function getCountdown(startDate: string, endDate: string): string {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const start = new Date(startDate);
    const end = new Date(endDate);
    const msPerDay = 1000 * 60 * 60 * 24;

    if (today < start) {
        const days = Math.ceil((start.getTime() - today.getTime()) / msPerDay);
        return days === 1 ? "Falta 1 dia para começar" : `Faltam ${days} dias para começar`;
    }

    if (today <= end) {
        const totalDays = Math.floor((end.getTime() - start.getTime()) / msPerDay) + 1;
        const currentDay = Math.floor((today.getTime() - start.getTime()) / msPerDay) + 1;
        return `Dia ${currentDay} de ${totalDays}`;
    }

    const days = Math.floor((today.getTime() - end.getTime()) / msPerDay);
    if (days === 0) return "Encerrada hoje";
    return days === 1 ? "Concluída há 1 dia" : `Concluída há ${days} dias`;
}

export function TripHeroCard({ trip, totalSpent, budget, primaryAction }: TripHeroCardProps) {
    const countdown = getCountdown(trip.startDate, trip.endDate);
    const hasBudget = typeof budget === "number" && budget > 0;
    const spentPct = hasBudget ? Math.min(100, Math.round(((totalSpent ?? 0) / budget) * 100)) : 0;
    const isOverBudget = hasBudget && (totalSpent ?? 0) > budget;

    return (
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-600 via-emerald-700 to-emerald-800 p-6 text-white shadow-lg sm:p-8">
            {/* Padrões decorativos */}
            <div
                className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl"
                aria-hidden="true"
            />
            <div
                className="pointer-events-none absolute -bottom-24 -left-8 h-56 w-56 rounded-full bg-emerald-300/20 blur-3xl"
                aria-hidden="true"
            />

            <div className="relative flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                {/* Coluna esquerda — identidade da viagem */}
                <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                        <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${STATUS_CHIP[trip.status]}`}>
                            {STATUS_LABEL[trip.status]}
                        </span>
                        <span className="text-emerald-200/60">·</span>
                        <span className="text-xs font-medium text-emerald-100">{countdown}</span>
                    </div>

                    <h1 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl">
                        {trip.name}
                    </h1>

                    <p className="mt-1.5 flex items-center gap-1.5 text-sm text-emerald-100">
                        <MapPin className="h-4 w-4" />
                        {trip.destination}
                    </p>

                    <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-emerald-50">
                        <span className="flex items-center gap-1.5">
                            <Calendar className="h-4 w-4 text-emerald-200" />
                            {formatDateRange(trip.startDate, trip.endDate)}
                        </span>
                        <span className="flex items-center gap-1.5">
                            <Users className="h-4 w-4 text-emerald-200" />
                            {trip.participantCount} {trip.participantCount === 1 ? "participante" : "participantes"}
                        </span>
                    </div>

                    {primaryAction && (
                        <div className="mt-6">{primaryAction}</div>
                    )}
                </div>

                {/* Coluna direita — orçamento (só se houver budget definido) */}
                {hasBudget && (
                    <div className="w-full shrink-0 rounded-xl bg-white/10 p-4 backdrop-blur-sm lg:w-64">
                        <p className="text-[11px] font-medium uppercase tracking-wider text-emerald-100">
                            Total gasto
                        </p>
                        <p className="mt-1 text-2xl font-bold sm:text-3xl">
                            {formatCurrencyBRL(totalSpent ?? 0)}
                        </p>
                        <p className="mt-0.5 text-xs text-emerald-100">
                            de {formatCurrencyBRL(budget)} orçados
                        </p>
                        <div
                            className="mt-3 h-2 overflow-hidden rounded-full bg-white/20"
                            role="progressbar"
                            aria-valuenow={spentPct}
                            aria-valuemin={0}
                            aria-valuemax={100}
                            aria-label="Orçamento usado"
                        >
                            <div
                                className={`h-full rounded-full transition-all ${isOverBudget ? "bg-amber-300" : "bg-white"
                                    }`}
                                style={{ width: `${spentPct}%` }}
                            />
                        </div>
                        <p className="mt-1.5 text-xs text-emerald-100">
                            {isOverBudget ? "Acima do orçamento" : `${spentPct}% usado`}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}