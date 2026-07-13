"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, ArrowRight, Trash2, History } from "lucide-react";
import { getAvatarColor } from "@/lib/avatar-color";
import { getInitials } from "@/lib/get-initials";
import { formatCurrencyBRL } from "@/lib/format";
import { usePayments, useDeletePayment } from "@/hooks/expenses/use-payments";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { Button } from "@/components/ui/button";
import type { PaymentHistoryItem } from "@/core/domain/payment/payment.types";

interface PaymentsHistoryProps {
    tripId: string;
}

function formatPaidAt(iso: string): string {
    const date = new Date(iso);
    return date.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
}

function Avatar({ id, name }: { id: string; name: string }) {
    const color = getAvatarColor(id);
    return (
        <span
            className={`flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-semibold ${color.bg} ${color.text}`}
        >
            {getInitials(name)}
        </span>
    );
}

export function PaymentsHistory({ tripId }: PaymentsHistoryProps) {
    const { data: payments, isLoading } = usePayments(tripId);
    const deletePayment = useDeletePayment(tripId);
    const [toDelete, setToDelete] = useState<PaymentHistoryItem | null>(null);
    const [isExpanded, setIsExpanded] = useState(true);

    // Some por completo enquanto carrega para não flashar vazio
    if (isLoading) return null;
    if (!Array.isArray(payments) || payments.length === 0) return null;

    function handleConfirmDelete() {
        if (!toDelete) return;
        deletePayment.mutate(toDelete.id, {
            onSuccess: () => setToDelete(null),
        });
    }

    return (
        <div>
            <button
                type="button"
                onClick={() => setIsExpanded((v) => !v)}
                className="flex w-full items-center justify-between text-left"
                aria-expanded={isExpanded}
            >
                <div className="flex items-center gap-2">
                    <History className="h-4 w-4 text-neutral-500 dark:text-neutral-400" />
                    <h2 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
                        Histórico de acertos
                    </h2>
                    <span className="rounded-full bg-neutral-100 px-2 py-0.5 text-xs font-medium text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400">
                        {payments.length}
                    </span>
                </div>
                {isExpanded ? (
                    <ChevronUp className="h-4 w-4 text-neutral-500 dark:text-neutral-400" />
                ) : (
                    <ChevronDown className="h-4 w-4 text-neutral-500 dark:text-neutral-400" />
                )}
            </button>

            {isExpanded && (
                <ul className="mt-4 space-y-3">
                    {payments.map((p) => (
                        <li
                            key={p.id}
                            className="border-b border-neutral-100 pb-3 last:border-0 last:pb-0 dark:border-neutral-800"
                        >
                            <div className="flex flex-wrap items-center justify-between gap-2">
                                <div className="flex flex-wrap items-center gap-2">
                                    <Avatar id={p.from.userId} name={p.from.name} />
                                    <span className="text-sm text-neutral-700 dark:text-neutral-300">
                                        {p.from.name}
                                    </span>
                                    <ArrowRight className="h-3.5 w-3.5 text-neutral-400 dark:text-neutral-500" />
                                    <Avatar id={p.to.userId} name={p.to.name} />
                                    <span className="text-sm text-neutral-700 dark:text-neutral-300">
                                        {p.to.name}
                                    </span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                                        {formatCurrencyBRL(p.amount)}
                                    </span>
                                    {p.canDelete && (
                                        <button
                                            type="button"
                                            onClick={() => setToDelete(p)}
                                            aria-label="Desfazer pagamento"
                                            className="flex h-7 w-7 items-center justify-center rounded-lg text-neutral-400 hover:bg-rose-50 hover:text-rose-500 dark:text-neutral-500 dark:hover:bg-rose-950 dark:hover:text-rose-400"
                                        >
                                            <Trash2 className="h-3.5 w-3.5" />
                                        </button>
                                    )}
                                </div>
                            </div>
                            <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
                                {formatPaidAt(p.paidAt)}
                                {p.notes && <span> · {p.notes}</span>}
                            </p>
                        </li>
                    ))}
                </ul>
            )}

            <ConfirmDialog
                open={toDelete !== null}
                title="Desfazer pagamento"
                message={
                    toDelete
                        ? `Tem certeza que quer desfazer o pagamento de ${formatCurrencyBRL(toDelete.amount)} de ${toDelete.from.name} para ${toDelete.to.name}? Os saldos do grupo serão recalculados.`
                        : ""
                }
                confirmLabel="Desfazer"
                variant="danger"
                isLoading={deletePayment.isPending}
                onConfirm={handleConfirmDelete}
                onCancel={() => setToDelete(null)}
            />
        </div>
    );
}