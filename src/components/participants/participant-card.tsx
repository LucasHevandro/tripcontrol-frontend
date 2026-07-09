"use client";

import { useRouter } from "next/navigation";
import { BarChart2, HandCoins, ArrowUp, ArrowDown } from "lucide-react";
import { getAvatarColor } from "@/lib/avatar-color";
import { getInitials } from "@/lib/get-initials";
import { formatCurrencyBRL, formatBalance } from "@/lib/format";
import { useNotifyDebtors } from "@/hooks/participants/use-participants";
import { Button } from "@/components/ui/button";
import type { ParticipantDetail } from "@/types/trip";

interface ParticipantCardProps {
    participant: ParticipantDetail;
    tripId: string;
}

export function ParticipantCard({ participant: p, tripId }: ParticipantCardProps) {
    const router = useRouter();
    const notifyDebtors = useNotifyDebtors(tripId);
    const color = getAvatarColor(p.id);
    const isOrganizer = p.role === "ORGANIZER";
    const isZero = p.balance === 0;
    const isPositive = p.balance > 0;
    const isDebtor = p.balance < 0;

    const balanceLabel = isZero ? "Sem saldo pendente" : isPositive ? "A receber" : "A pagar";
    const balanceTone = isZero
        ? { bg: "bg-neutral-50 dark:bg-neutral-800/50", text: "text-neutral-600 dark:text-neutral-400" }
        : isPositive
            ? { bg: "bg-emerald-50 dark:bg-emerald-950/40", text: "text-emerald-700 dark:text-emerald-400" }
            : { bg: "bg-rose-50 dark:bg-rose-950/40", text: "text-rose-700 dark:text-rose-400" };

    return (
        <div className="rounded-xl border border-neutral-200 bg-white p-4 dark:border-neutral-700 dark:bg-neutral-900">
            {/* Cabeçalho — pessoa */}
            <div className="flex items-start gap-3">
                <span
                    className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full text-lg font-semibold ${color.bg} ${color.text} ${isOrganizer
                            ? "ring-2 ring-emerald-500 ring-offset-2 dark:ring-offset-neutral-900"
                            : ""
                        }`}
                >
                    {getInitials(p.name)}
                </span>
                <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                        <p className="truncate font-semibold text-neutral-900 dark:text-neutral-100">
                            {p.name}
                        </p>
                        {isOrganizer && (
                            <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400">
                                Organizador
                            </span>
                        )}
                    </div>
                    <p className="mt-0.5 truncate text-xs text-neutral-500 dark:text-neutral-400">
                        {p.email}
                    </p>
                </div>
            </div>

            {/* Balanço destacado */}
            <div className={`mt-4 flex items-center justify-between rounded-lg px-3 py-3 ${balanceTone.bg}`}>
                <div className="min-w-0">
                    <p className={`text-[11px] font-semibold uppercase tracking-wide ${balanceTone.text}`}>
                        {balanceLabel}
                    </p>
                    <p className={`mt-0.5 text-xl font-bold ${balanceTone.text}`}>
                        {isZero ? formatCurrencyBRL(0) : formatBalance(p.balance)}
                    </p>
                </div>
                {!isZero && (
                    <span
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${isPositive
                                ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300"
                                : "bg-rose-100 text-rose-700 dark:bg-rose-900 dark:text-rose-300"
                            }`}
                        aria-hidden="true"
                    >
                        {isPositive ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
                    </span>
                )}
            </div>

            {/* Detalhes */}
            <div className="mt-3 flex items-center gap-4 text-xs">
                <div>
                    <p className="text-neutral-500 dark:text-neutral-400">Pagou</p>
                    <p className="mt-0.5 font-semibold text-neutral-900 dark:text-neutral-100">
                        {formatCurrencyBRL(p.totalPaid)}
                    </p>
                </div>
                <div className="h-8 w-px bg-neutral-200 dark:bg-neutral-700" aria-hidden="true" />
                <div>
                    <p className="text-neutral-500 dark:text-neutral-400">Cota individual</p>
                    <p className="mt-0.5 font-semibold text-neutral-900 dark:text-neutral-100">
                        {formatCurrencyBRL(p.individualQuota)}
                    </p>
                </div>
            </div>

            {/* Ações */}
            <div className="mt-4 flex flex-wrap gap-2">
                <Button
                    variant="secondary"
                    size="sm"
                    leftIcon={BarChart2}
                    onClick={() => router.push(`/trips/${tripId}/finances`)}
                >
                    Ver despesas
                </Button>
                {!isOrganizer && isDebtor && (
                    <Button
                        variant="ghost"
                        size="sm"
                        leftIcon={HandCoins}
                        onClick={() => notifyDebtors.mutate()}
                        isLoading={notifyDebtors.isPending}
                        className="text-emerald-700 hover:bg-emerald-50 dark:text-emerald-400 dark:hover:bg-emerald-950"
                    >
                        Solicitar acerto
                    </Button>
                )}
            </div>
        </div>
    );
}