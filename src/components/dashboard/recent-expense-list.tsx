import Link from "next/link";
import { Receipt, Hotel, UtensilsCrossed, Car, Sailboat, type LucideIcon } from "lucide-react";
import type { Expense } from "@/types/trip";
import { formatCurrencyBRL } from "@/lib/format";

const CATEGORY_ICON: Record<string, LucideIcon> = {
    Hospedagem: Hotel,
    Alimentação: UtensilsCrossed,
    Transporte: Car,
    Lazer: Sailboat,
};

interface RecentExpensesListProps {
    tripId: string;
    expenses?: Expense[];
}

export function RecentExpensesList({ tripId, expenses = [] }: RecentExpensesListProps) {
    const safeExpenses = expenses ?? [];

    return (
        <div className="rounded-xl border border-neutral-200 bg-white p-5 dark:border-neutral-700 dark:bg-neutral-900">
            <div className="flex items-center justify-between">
                <h2 className="flex items-center gap-2 text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                    <Receipt className="h-4 w-4 text-neutral-500 dark:text-neutral-400" />
                    Últimas despesas
                </h2>
                <Link
                    href={`/trips/${tripId}/finances`}
                    className="text-sm font-medium text-emerald-700 hover:text-emerald-800 dark:text-emerald-400 dark:hover:text-emerald-300"
                >
                    ver todas
                </Link>
            </div>

            {safeExpenses.length === 0 ? (
                <div className="mt-4 rounded-lg border border-dashed border-neutral-200 py-6 text-center dark:border-neutral-800">
                    <p className="text-xs text-neutral-400 dark:text-neutral-500">
                        Nenhuma despesa recente registrada
                    </p>
                </div>
            ) : (
                <ul className="mt-3 divide-y divide-neutral-100 dark:divide-neutral-800">
                    {safeExpenses.map((expense) => {
                        const Icon = CATEGORY_ICON[expense.category] ?? Receipt;
                        const isIndividual = expense.splitType === "INDIVIDUAL";
                        return (
                            <li key={expense.id} className="flex items-center gap-3 py-3">
                                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400">
                                    <Icon className="h-[18px] w-[18px]" />
                                </span>
                                <div className="min-w-0 flex-1">
                                    <p className="truncate text-sm font-medium text-neutral-900 dark:text-neutral-100">
                                        {expense.description}
                                    </p>
                                    <p className="text-xs text-neutral-500 dark:text-neutral-400">
                                        {expense.category} · {isIndividual ? (
                                            <span className="italic">Cada um pagou o seu</span>
                                        ) : (
                                            expense.paidByName
                                        )}
                                    </p>
                                </div>
                                <span className="shrink-0 text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                                    {formatCurrencyBRL(expense.amount)}
                                </span>
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
}