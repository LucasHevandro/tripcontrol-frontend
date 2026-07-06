import { ArrowRight } from "lucide-react";
import { getAvatarColor } from "@/lib/avatar-color";
import { getInitials } from "@/lib/get-initials";
import { formatCurrencyBRL } from "@/lib/format";
import type { Settlement } from "@/types/trip";

interface SettlementsListProps {
    settlements: Settlement[];
    perPersonAverage: number;
}

function Avatar({ id, name }: { id: string; name: string }) {
    const color = getAvatarColor(id);
    return (
        <span className={`flex h-7 w-7 items-center justify-center rounded-full text-[10px] font-semibold ${color.bg} ${color.text}`}>
            {getInitials(name)}
        </span>
    );
}

export function SettlementsList({ settlements, perPersonAverage }: SettlementsListProps) {
    return (
        <div>
            <div className="flex items-center justify-between">
                <h2 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
                    Acertos financeiros
                </h2>
                <span className="text-xs text-emerald-600 dark:text-emerald-400">calculado automaticamente</span>
            </div>
            <p className="mt-1 text-xs text-neutral-400 dark:text-neutral-500">
                Cada pessoa deve pagar {formatCurrencyBRL(perPersonAverage)}
            </p>

            <ul className="mt-4 space-y-4">
                {settlements.map((s) => (
                    <li key={s.id} className="border-b border-neutral-100 pb-4 last:border-0 dark:border-neutral-700">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Avatar id={s.fromParticipantId} name={s.fromName} />
                                <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">{s.fromName}</span>
                                <ArrowRight className="h-3.5 w-3.5 text-neutral-400" />
                                <Avatar id={s.toParticipantId} name={s.toName} />
                                <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">{s.toName}</span>
                            </div>
                            <span className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                                {formatCurrencyBRL(s.amount)}
                            </span>
                        </div>
                        <p className="mt-1 text-xs text-neutral-400 dark:text-neutral-500">{s.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}