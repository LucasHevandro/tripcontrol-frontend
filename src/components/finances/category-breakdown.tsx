import { getCategoryColor } from "@/lib/avatar-color";
import { formatCurrencyBRL } from "@/lib/format";
import type { CategoryBreakdown } from "@/types/trip";

interface CategoryBreakdownListProps {
    categories: CategoryBreakdown[];
}

export function CategoryBreakdownList({ categories }: CategoryBreakdownListProps) {
    const maxTotal = Math.max(...categories.map((c) => c.total));

    return (
        <div>
            <h3 className="text-sm font-semibold text-neutral-900">
                Gastos por categoria
            </h3>

            <ul className="mt-3 space-y-3">
                {categories.map((cat) => {
                    const color = getCategoryColor(cat.category);
                    const barWidth = maxTotal > 0 ? (cat.total / maxTotal) * 100 : 0;
                    return (
                        <li key={cat.category}>
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-neutral-600">{cat.category}</span>
                                <span className="text-neutral-400">
                                    {formatCurrencyBRL(cat.total)} · {cat.percentage}%
                                </span>
                            </div>
                            <div className="mt-1.5 h-1.5 w-full rounded-full bg-neutral-100">
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