"use client";

import { useState } from "react";
import { ArrowRight, Bell, PartyPopper, CheckCircle, Wallet } from "lucide-react";
import { getAvatarColor } from "@/lib/avatar-color";
import { getInitials } from "@/lib/get-initials";
import { formatCurrencyBRL } from "@/lib/format";
import { useNotifyDebtors } from "@/hooks/participants/use-participants";
import { useCreatePayment } from "@/hooks/expenses/use-payments";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { Button } from "@/components/ui/button";
import type { Settlement } from "@/types/trip";

interface SettlementSummaryProps {
    tripId: string;
    settlements: Settlement[];
    currentUserId: string;
}

function Avatar({ id, name }: { id: string; name: string }) {
    const color = getAvatarColor(id);
    return (
        <span className={`flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-semibold ${color.bg} ${color.text}`}>
            {getInitials(name)}
        </span>
    );
}

export function SettlementSummary({ tripId, settlements, currentUserId }: SettlementSummaryProps) {
    const notifyDebtors = useNotifyDebtors(tripId);
    const createPayment = useCreatePayment(tripId);
    const [toConfirm, setToConfirm] = useState<Settlement | null>(null);
    const hasSettlements = settlements.length > 0;

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
        <div className="rounded-xl border border-neutral-200 bg-white p-4 dark:border-neutral-700 dark:bg-neutral-900">
            <h2 className="flex items-center gap-2 text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                <Wallet className="h-4 w-4 text-neutral-500 dark:text-neutral-400" />
                Resumo de acertos
            </h2>

            {hasSettlements ? (
                <>
                    <ul className="mt-3 space-y-3">
                        {settlements.map((s) => {
                            const canMarkAsPaid = s.fromParticipantId === currentUserId;
                            return (
                                <li key={s.id} className="border-b border-neutral-100 pb-3 last:border-0 last:pb-0 dark:border-neutral-800">
                                    <div className="flex items-center justify-between gap-2">
                                        <div className="flex items-center gap-1.5">
                                            <Avatar id={s.fromParticipantId} name={s.fromName} />
                                            <span className="text-xs text-neutral-600 dark:text-neutral-400">{s.fromName}</span>
                                            <ArrowRight className="h-3 w-3 text-neutral-400 dark:text-neutral-500" />
                                            <Avatar id={s.toParticipantId} name={s.toName} />
                                            <span className="text-xs text-neutral-600 dark:text-neutral-400">{s.toName}</span>
                                        </div>
                                        <span className="shrink-0 text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                                            {formatCurrencyBRL(s.amount)}
                                        </span>
                                    </div>
                                    {canMarkAsPaid && (
                                        <div className="mt-1.5 flex justify-end">
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

                    <button
                        type="button"
                        onClick={() => notifyDebtors.mutate()}
                        disabled={notifyDebtors.isPending}
                        className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg border border-neutral-200 py-2.5 text-sm font-medium text-neutral-700 hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800"
                    >
                        {notifyDebtors.isPending ? (
                            <>
                                <span className="h-4 w-4 animate-spin rounded-full border-2 border-neutral-400 border-t-transparent" />
                                Notificando...
                            </>
                        ) : (
                            <>
                                <Bell className="h-4 w-4" />
                                Notificar todos os devedores
                            </>
                        )}
                    </button>
                </>
            ) : (
                <div className="mt-4 flex flex-col items-center gap-1 py-6 text-center">
                    <PartyPopper className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                    <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                        Tudo certo por aqui!
                    </p>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">
                        Não há acertos pendentes no momento.
                    </p>
                </div>
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