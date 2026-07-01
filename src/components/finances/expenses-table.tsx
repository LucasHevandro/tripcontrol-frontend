import { getCategoryColor } from "@/lib/avatar-color";
import { getAvatarColor } from "@/lib/avatar-color";
import { getInitials } from "@/lib/get-initials";
import { formatCurrencyBRL } from "@/lib/format";
import type { Expense } from "@/core/domain/expense/expense.types";

interface ExpensesTableProps {
    expenses: Expense[];
}

export function ExpensesTable({ expenses }: ExpensesTableProps) {
    return (
        <div>
            <h2 className="text-base font-semibold text-neutral-900">
                Despesas registradas
            </h2>

            <div className="mt-3 w-full">
                <div className="grid grid-cols-[1fr_auto_auto_auto_auto] gap-x-6 border-b border-neutral-100 pb-2 text-xs text-neutral-400">
                    <span>Descrição</span>
                    <span>Pago por</span>
                    <span>Categoria</span>
                    <span>Data</span>
                    <span className="text-right">Valor</span>
                </div>

                {expenses.map((expense) => {
                    const avatarColor = getAvatarColor(expense.paidById);
                    const categoryColor = getCategoryColor(expense.category);
                    return (
                        <div
                            key={expense.id}
                            className="grid grid-cols-[1fr_auto_auto_auto_auto] items-center gap-x-6 border-b border-neutral-100 py-3 text-sm"
                        >
                            <span className="font-medium text-neutral-900">
                                {expense.description}
                            </span>

                            <span className="flex items-center gap-2 text-neutral-700">
                                <span
                                    className={`flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-semibold ${avatarColor.bg} ${avatarColor.text}`}
                                >
                                    {getInitials(expense.paidByName)}
                                </span>
                                {expense.paidByName}
                            </span>

                            <span
                                className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${categoryColor.badge}`}
                            >
                                {expense.category}
                            </span>

                            <span className="text-neutral-400">{expense.date}</span>

                            <span className="text-right font-semibold text-neutral-900">
                                {formatCurrencyBRL(expense.amount)}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}