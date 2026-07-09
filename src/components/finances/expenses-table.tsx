"use client";

import { useState } from "react";
import { Trash2, Receipt } from "lucide-react";
import { getCategoryColor, getAvatarColor } from "@/lib/avatar-color";
import { getInitials } from "@/lib/get-initials";
import { formatCurrencyBRL } from "@/lib/format";
import { useDeleteExpense } from "@/hooks/expenses/use-expenses";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { EmptyState } from "@/components/ui/empty-state";
import type { Expense } from "@/core/domain/expense/expense.types";

interface ExpensesTableProps {
    tripId: string;
    expenses: Expense[];
}

export function ExpensesTable({ tripId, expenses }: ExpensesTableProps) {
    const deleteExpense = useDeleteExpense(tripId);
    const [toDelete, setToDelete] = useState<Expense | null>(null);

    function handleConfirmDelete() {
        if (!toDelete) return;
        deleteExpense.mutate(toDelete.id, {
            onSuccess: () => setToDelete(null),
        });
    }

    return (
        <div>
            <h2 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
                Despesas registradas
            </h2>

            {expenses.length === 0 ? (
                <EmptyState
                    icon={Receipt}
                    title="Nenhuma despesa registrada"
                    description='Registre a primeira despesa em "Nova despesa"'
                    className="mt-3"
                />
            ) : (
                <>
                    {/* Tabela (sm+) */}
                    <div className="mt-3 hidden sm:block">
                        <div className="grid grid-cols-[1fr_auto_auto_auto_auto_32px] gap-x-4 border-b border-neutral-100 pb-2 text-xs text-neutral-500 dark:border-neutral-700 dark:text-neutral-400">
                            <span>Descrição</span>
                            <span>Pago por</span>
                            <span>Categoria</span>
                            <span>Data</span>
                            <span className="text-right">Valor</span>
                            <span aria-hidden="true" />
                        </div>

                        {expenses.map((expense) => {
                            const avatarColor = getAvatarColor(expense.paidById);
                            const categoryColor = getCategoryColor(expense.category);
                            return (
                                <div
                                    key={expense.id}
                                    className="grid grid-cols-[1fr_auto_auto_auto_auto_32px] items-center gap-x-4 border-b border-neutral-100 py-3 text-sm dark:border-neutral-700"
                                >
                                    <span className="font-medium text-neutral-900 dark:text-neutral-100">
                                        {expense.description}
                                    </span>
                                    <span className="flex items-center gap-2 text-neutral-700 dark:text-neutral-300">
                                        <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold ${avatarColor.bg} ${avatarColor.text}`}>
                                            {getInitials(expense.paidByName)}
                                        </span>
                                        <span className="max-w-[80px] truncate">{expense.paidByName}</span>
                                    </span>
                                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${categoryColor.badge}`}>
                                        {expense.category}
                                    </span>
                                    <span className="text-neutral-500 dark:text-neutral-400">
                                        {expense.date}
                                    </span>
                                    <span className="text-right font-semibold text-neutral-900 dark:text-neutral-100">
                                        {formatCurrencyBRL(expense.amount)}
                                    </span>
                                    <button
                                        type="button"
                                        onClick={() => setToDelete(expense)}
                                        aria-label={`Excluir despesa ${expense.description}`}
                                        className="flex h-7 w-7 items-center justify-center rounded-lg text-neutral-400 transition-colors hover:bg-rose-50 hover:text-rose-500 dark:text-neutral-500 dark:hover:bg-rose-950 dark:hover:text-rose-400"
                                    >
                                        <Trash2 className="h-3.5 w-3.5" />
                                    </button>
                                </div>
                            );
                        })}
                    </div>

                    {/* Cards (< sm) */}
                    <div className="mt-3 space-y-2 sm:hidden">
                        {expenses.map((expense) => {
                            const avatarColor = getAvatarColor(expense.paidById);
                            const categoryColor = getCategoryColor(expense.category);
                            const firstName = expense.paidByName.split(" ")[0];
                            return (
                                <div
                                    key={expense.id}
                                    className="rounded-xl border border-neutral-200 bg-white p-4 dark:border-neutral-700 dark:bg-neutral-900"
                                >
                                    <div className="flex items-start justify-between gap-3">
                                        <p className="min-w-0 flex-1 font-medium text-neutral-900 dark:text-neutral-100">
                                            {expense.description}
                                        </p>
                                        <p className="shrink-0 font-semibold text-neutral-900 dark:text-neutral-100">
                                            {formatCurrencyBRL(expense.amount)}
                                        </p>
                                    </div>

                                    <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400">
                                        <span className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${categoryColor.badge}`}>
                                            {expense.category}
                                        </span>
                                        <span className="flex items-center gap-1.5">
                                            <span className={`flex h-5 w-5 items-center justify-center rounded-full text-[9px] font-semibold ${avatarColor.bg} ${avatarColor.text}`}>
                                                {getInitials(expense.paidByName)}
                                            </span>
                                            {firstName}
                                        </span>
                                        <span className="text-neutral-400 dark:text-neutral-600">·</span>
                                        <span>{expense.date}</span>
                                        <button
                                            type="button"
                                            onClick={() => setToDelete(expense)}
                                            aria-label={`Excluir despesa ${expense.description}`}
                                            className="ml-auto flex h-8 w-8 items-center justify-center rounded-lg text-neutral-400 hover:bg-rose-50 hover:text-rose-500 dark:text-neutral-500 dark:hover:bg-rose-950 dark:hover:text-rose-400"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </>
            )}

            <ConfirmDialog
                open={toDelete !== null}
                title="Excluir despesa"
                message={
                    toDelete
                        ? `Tem certeza que deseja excluir "${toDelete.description}"? Esta ação não pode ser desfeita.`
                        : ""
                }
                confirmLabel="Excluir"
                variant="danger"
                isLoading={deleteExpense.isPending}
                onConfirm={handleConfirmDelete}
                onCancel={() => setToDelete(null)}
            />
        </div>
    );
}