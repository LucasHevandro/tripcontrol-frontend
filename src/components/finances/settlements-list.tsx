"use client";

import { useState } from "react";
import { ArrowRight, PartyPopper, CheckCircle } from "lucide-react";
import { getAvatarColor } from "@/lib/avatar-color";
import { getInitials } from "@/lib/get-initials";
import { formatCurrencyBRL } from "@/lib/format";
import { useCreatePayment } from "@/hooks/expenses/use-payments";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { Button } from "@/components/ui/button";
import type { Settlement } from "@/types/trip";

interface SettlementsListProps {
    settlements: Settlement[];
    perPersonAverage: number;
    currentUserId: string;
    tripId: string;
}

function Avatar({ id, name }: { id: string; name: string }) {
    const color = getAvatarColor(id);
    return (
        <span className={`flex h-7 w-7 items-center justify-center rounded-full text-[10px] font-semibold ${color.bg} ${color.text}`}>
            {getInitials(name)}
        </span>
    );
}

export function SettlementsList({ settlements, perPersonAverage, currentUserId, tripId }: SettlementsListProps) {
    const createPayment = useCreatePayment(tripId);
    const [toConfirm, setToConfirm] = useState<Settlement | null>(null);

    function handleConfirmPayment() {
        if (!toConfirm) return;
        createPayment.mutate(
            {
                fromUserId: toConfirm.fromParticipantId,
                toUserId: toConfirm.toParticipantId,
                amount: toConfirm.amount,
            },
            { onSuccess: () => setToConfirm(null) },
        );
    }

    return (
        <div>
            <div className="flex items-center justify-between">
                <h2 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
                    Acertos financeiros
                </h2>
                <span className="text-xs text-emerald-600 dark:text-emerald-400">
                    calculado automaticamente
                </span>
            </div>
            <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
                Cada pessoa deve pagar {formatCurrencyBRL(perPersonAverage)}
            </p>

            {settlements.length === 0 ? (
                <div className="mt-4 flex items-center gap-1.5 text-sm text-neutral-500 dark:text-neutral-400">
                    <PartyPopper className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                    Nenhum acerto pendente
                </div>
            ) : (
                <ul className="mt-4 space-y-4">
                    {settlements.map((s) => {
                        const canMarkAsPaid = s.fromParticipantId === currentUserId;
                        return (
                            <li
                                key={s.id}
                                className="border-b border-neutral-100 pb-4 last:border-0 last:pb-0 dark:border-neutral-700"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Avatar id={s.fromParticipantId} name={s.fromName} />
                                        <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                                            {s.fromName}
                                        </span>
                                        <ArrowRight className="h-3.5 w-3.5 text-neutral-400 dark:text-neutral-500" />
                                        <Avatar id={s.toParticipantId} name={s.toName} />
                                        <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                                            {s.toName}
                                        </span>
                                    </div>
                                    <span className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                                        {formatCurrencyBRL(s.amount)}
                                    </span>
                                </div>
                                {s.description && (
                                    <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
                                        {s.description}
                                    </p>
                                )}
                                {canMarkAsPaid && (
                                    <div className="mt-2 flex justify-end">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            leftIcon={CheckCircle}
                                            onClick={() => setToConfirm(s)}
                                            className="text-emerald-700 hover:bg-emerald-50 dark:text-emerald-400 dark:hover:bg-emerald-950"
                                        >
                                            Marquei como pago
                                        </Button>
                                    </div>
                                )}
                            </li>
                        );
                    })}
                </ul>
            )}

            <ConfirmDialog
                open={toConfirm !== null}
                title="Confirmar pagamento"
                message={
                    toConfirm
                        ? `Confirmar que você pagou ${formatCurrencyBRL(toConfirm.amount)} para ${toConfirm.toName}? Isso vai atualizar os saldos do grupo.`
                        : ""
                }
                confirmLabel="Confirmar pagamento"
                variant="default"
                isLoading={createPayment.isPending}
                onConfirm={handleConfirmPayment}
                onCancel={() => setToConfirm(null)}
            />
        </div>
    );
}