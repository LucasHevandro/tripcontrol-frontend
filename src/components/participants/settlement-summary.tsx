"use client";

import { ArrowRight, Bell } from "lucide-react";
import { getAvatarColor } from "@/lib/avatar-color";
import { getInitials } from "@/lib/get-initials";
import { formatCurrencyBRL } from "@/lib/format";
import type { Settlement } from "@/types/trip";

interface SettlementSummaryProps {
    settlements: Settlement[];
}

function Avatar({ id, name }: { id: string; name: string }) {
    const color = getAvatarColor(id);
    return (
        <span className={`flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-semibold ${color.bg} ${color.text}`}>
            {getInitials(name)}
        </span>
    );
}

export function SettlementSummary({ settlements }: SettlementSummaryProps) {
    return (
        <div className="rounded-xl border border-neutral-200 bg-white p-4 dark:border-neutral-700 dark:bg-neutral-900">
            <h2 className="flex items-center gap-2 text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                💸 Resumo de acertos
            </h2>

            <ul className="mt-3 space-y-3">
                {settlements.map((s) => (
                    <li key={s.id} className="flex items-center justify-between gap-2 border-b border-neutral-100 pb-3 last:border-0 last:pb-0 dark:border-neutral-800">
                        <div className="flex items-center gap-1.5">
                            <Avatar id={s.fromParticipantId} name={s.fromName} />
                            <span className="text-xs text-neutral-600 dark:text-neutral-400">{s.fromName}</span>
                            <ArrowRight className="h-3 w-3 text-neutral-400" />
                            <Avatar id={s.toParticipantId} name={s.toName} />
                            <span className="text-xs text-neutral-600 dark:text-neutral-400">{s.toName}</span>
                        </div>
                        <span className="shrink-0 text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                            {formatCurrencyBRL(s.amount)}
                        </span>
                    </li>
                ))}
            </ul>

            <button
                type="button"
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg border border-neutral-200 py-2.5 text-sm font-medium text-neutral-700 hover:bg-neutral-50 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800"
            >
                <Bell className="h-4 w-4" />
                Notificar todos os devedores
            </button>
        </div>
    );
}