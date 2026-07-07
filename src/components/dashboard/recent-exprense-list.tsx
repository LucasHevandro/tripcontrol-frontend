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
    expenses: Expense[];
}

export function RecentExpensesList({ tripId, expenses }: RecentExpensesListProps) {
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

            <ul className="mt-3 divide-y divide-neutral-100 dark:divide-neutral-800">
                {expenses.map((expense) => {
                    const Icon = CATEGORY_ICON[expense.category] ?? Receipt;
                    return (
                        <li key={expense.id} className="flex items-center gap-3 py-3">
                            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400">
                                <Icon className="h-[18px] w-[18px]" />
                            </span>
                            <div className="flex-1">
                                <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                                    {expense.description}
                                </p>
                                <p className="text-xs text-neutral-400 dark:text-neutral-500">
                                    {expense.category} · {expense.paidByName}
                                </p>
                            </div>
                            <span className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                                {formatCurrencyBRL(expense.amount)}
                            </span>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}