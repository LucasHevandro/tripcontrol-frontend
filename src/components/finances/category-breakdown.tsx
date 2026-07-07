import { getCategoryColor } from "@/lib/avatar-color";
import { formatCurrencyBRL } from "@/lib/format";
import type { CategoryBreakdown } from "@/types/trip";

interface CategoryBreakdownListProps {
    categories: CategoryBreakdown[];
}

export function CategoryBreakdownList({ categories }: CategoryBreakdownListProps) {
    const maxTotal = Math.max(...categories.map((c) => c.total), 1);

    if (categories.length === 0) return null;

    return (
        <div>
            <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                Gastos por categoria
            </h3>
            <ul className="mt-3 space-y-3">
                {categories.map((cat) => {
                    const color = getCategoryColor(cat.category);
                    const barWidth = (cat.total / maxTotal) * 100;
                    return (
                        <li key={cat.category}>
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-neutral-600 dark:text-neutral-400">
                                    {cat.category}
                                </span>
                                <span className="text-neutral-400 dark:text-neutral-500">
                                    {formatCurrencyBRL(cat.total)} · {cat.percentage}%
                                </span>
                            </div>
                            <div className="mt-1.5 h-1.5 w-full rounded-full bg-neutral-100 dark:bg-neutral-700">
                                <div
                                    className={`h-full rounded-full ${color.bar}`}
                                    style={{ width: `${barWidth}%` }}
                                />
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}