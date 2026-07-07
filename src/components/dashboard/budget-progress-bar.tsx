import { formatCurrencyBRL } from "@/lib/format";

interface BudgetProgressBarProps {
    totalSpent: number;
    budget: number;
}

function getBarColor(percentage: number): string {
    if (percentage > 100) return "bg-rose-500";
    if (percentage >= 80) return "bg-amber-500";
    return "bg-emerald-600";
}

export function BudgetProgressBar({ totalSpent, budget }: BudgetProgressBarProps) {
    const rawPercentage = budget > 0 ? (totalSpent / budget) * 100 : 0;
    const percentage = Math.round(rawPercentage);
    const remaining = budget - totalSpent;

    return (
        <div className="rounded-xl border border-neutral-200 bg-white p-5 dark:border-neutral-700 dark:bg-neutral-900">
            <div className="flex items-center justify-between text-sm">
                <span className="text-neutral-600 dark:text-neutral-400">Orçamento utilizado</span>
                <span className="font-semibold text-neutral-900 dark:text-neutral-100">{percentage}%</span>
            </div>

            <div className="mt-2.5 h-2 w-full overflow-hidden rounded-full bg-neutral-100 dark:bg-neutral-700">
                <div
                    className={`h-full rounded-full ${getBarColor(rawPercentage)}`}
                    style={{ width: `${Math.min(rawPercentage, 100)}%` }}
                />
            </div>

            <div className="mt-2 flex items-center justify-between text-xs text-neutral-400 dark:text-neutral-500">
                <span>{formatCurrencyBRL(totalSpent)} gastos</span>
                <span>
                    {remaining >= 0
                        ? `${formatCurrencyBRL(remaining)} restantes`
                        : `${formatCurrencyBRL(Math.abs(remaining))} acima do orçamento`}
                </span>
            </div>
        </div>
    );
}