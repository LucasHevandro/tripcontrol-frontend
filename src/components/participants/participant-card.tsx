"use client";

import { useRouter } from "next/navigation";
import { BarChart2, HandCoins } from "lucide-react";
import { getAvatarColor } from "@/lib/avatar-color";
import { getInitials } from "@/lib/get-initials";
import { formatCurrencyBRL, formatBalance } from "@/lib/format";
import { useNotifyDebtors } from "@/hooks/participants/use-participants";
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
    const isPositive = p.balance >= 0;
    const isDebtor = p.balance < 0;

    return (
        <div className="rounded-xl border border-neutral-200 bg-white p-4 dark:border-neutral-700 dark:bg-neutral-900">
            <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                    <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${color.bg} ${color.text}`}>
                        {getInitials(p.name)}
                    </span>
                    <div>
                        <p className="font-medium text-neutral-900 dark:text-neutral-100">{p.name}</p>
                        <p className="text-xs text-neutral-400 dark:text-neutral-500">{p.email}</p>
                    </div>
                </div>
                <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${isOrganizer
                        ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400"
                        : "bg-neutral-100 text-neutral-500 dark:bg-neutral-800 dark:text-neutral-400"
                    }`}>
                    {isOrganizer ? "Organizador" : "Membro"}
                </span>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-2">
                <div className="rounded-lg bg-neutral-50 p-3 text-center dark:bg-neutral-800">
                    <p className="text-base font-bold text-neutral-900 dark:text-neutral-100">
                        {formatCurrencyBRL(p.totalPaid)}
                    </p>
                    <p className="mt-0.5 text-xs text-neutral-400 dark:text-neutral-500">total pago</p>
                </div>
                <div className="rounded-lg bg-neutral-50 p-3 text-center dark:bg-neutral-800">
                    <p className="text-base font-bold text-neutral-900 dark:text-neutral-100">
                        {formatCurrencyBRL(p.individualQuota)}
                    </p>
                    <p className="mt-0.5 text-xs text-neutral-400 dark:text-neutral-500">cota individual</p>
                </div>
                <div className="rounded-lg bg-neutral-50 p-3 text-center dark:bg-neutral-800">
                    <p className={`text-base font-bold ${isPositive ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}`}>
                        {formatBalance(p.balance)}
                    </p>
                    <p className="mt-0.5 text-xs text-neutral-400 dark:text-neutral-500">saldo</p>
                </div>
            </div>

            <div className="mt-3 flex gap-2">
                <button
                    type="button"
                    onClick={() => router.push(`/trips/${tripId}/finances`)}
                    className="flex items-center gap-1.5 rounded-lg border border-neutral-200 px-3 py-1.5 text-xs font-medium text-neutral-700 hover:bg-neutral-50 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800"
                >
                    <BarChart2 className="h-3.5 w-3.5" />
                    Ver despesas
                </button>

                {!isOrganizer && isDebtor && (
                    <button
                        type="button"
                        onClick={() => notifyDebtors.mutate()}
                        disabled={notifyDebtors.isPending}
                        className="flex items-center gap-1.5 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-700 hover:bg-emerald-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-emerald-800 dark:bg-emerald-950 dark:text-emerald-400 dark:hover:bg-emerald-900"
                    >
                        {notifyDebtors.isPending ? (
                            <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-emerald-600 border-t-transparent" />
                        ) : (
                            <HandCoins className="h-3.5 w-3.5" />
                        )}
                        Solicitar acerto
                    </button>
                )}
            </div>
        </div>
    );
}
