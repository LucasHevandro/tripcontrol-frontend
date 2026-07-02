import { getCategoryColor, getAvatarColor } from "@/lib/avatar-color";
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

            {/* overflow-x-auto garante scroll horizontal em mobile */}
            <div className="mt-3 overflow-x-auto -mx-5 px-5">
                <div className="min-w-[480px]">
                    <div className="grid grid-cols-[1fr_auto_auto_auto_auto] gap-x-4 border-b border-neutral-100 pb-2 text-xs text-neutral-400">
                        <span>Descrição</span>
                        <span>Pago por</span>
                        <span>Categoria</span>
                        <span>Data</span>
                        <span className="text-right">Valor</span>
                    </div>

                    {expenses.length === 0 ? (
                        <p className="py-8 text-center text-sm text-neutral-400">
                            Nenhuma despesa registrada ainda
                        </p>
                    ) : (
                        expenses.map((expense) => {
                            const avatarColor = getAvatarColor(expense.paidById);
                            const categoryColor = getCategoryColor(expense.category);
                            return (
                                <div
                                    key={expense.id}
                                    className="grid grid-cols-[1fr_auto_auto_auto_auto] items-center gap-x-4 border-b border-neutral-100 py-3 text-sm"
                                >
                                    <span className="font-medium text-neutral-900">
                                        {expense.description}
                                    </span>

                                    <span className="flex items-center gap-2 text-neutral-700">
                                        <span
                                            className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold ${avatarColor.bg} ${avatarColor.text}`}
                                        >
                                            {getInitials(expense.paidByName)}
                                        </span>
                                        <span className="max-w-[80px] truncate">{expense.paidByName}</span>
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
                        })
                    )}
                </div>
            </div>
        </div>
    );
}