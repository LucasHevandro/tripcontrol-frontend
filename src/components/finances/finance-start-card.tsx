interface FinanceStatCardProps {
    label: string;
    value: string;
    sublabel: string;
    valueClassName?: string;
}

export function FinanceStatCard({
    label,
    value,
    sublabel,
    valueClassName = "text-neutral-900 dark:text-neutral-100",
}: FinanceStatCardProps) {
    return (
        <div className="rounded-xl border border-neutral-200 bg-white p-4 dark:border-neutral-700 dark:bg-neutral-800">
            <p className="text-sm text-neutral-500 dark:text-neutral-400">{label}</p>
            <p className={`mt-2 text-2xl font-bold ${valueClassName}`}>{value}</p>
            <p className="mt-0.5 text-xs text-neutral-400 dark:text-neutral-500">{sublabel}</p>
        </div>
    );
}