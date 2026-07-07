import type { LucideIcon } from "lucide-react";

interface StatCardProps {
    icon: LucideIcon;
    label: string;
    value: string | number;
    sublabel: string;
}

export function StatCard({ icon: Icon, label, value, sublabel }: StatCardProps) {
    return (
        <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-700 dark:bg-neutral-800">
            <div className="flex items-center gap-1.5 text-sm text-neutral-500 dark:text-neutral-400">
                <Icon className="h-4 w-4" />
                {label}
            </div>
            <p className="mt-2 text-2xl font-bold text-neutral-900 dark:text-neutral-100">{value}</p>
            <p className="mt-0.5 text-xs text-neutral-400 dark:text-neutral-500">{sublabel}</p>
        </div>
    );
}