import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
    icon?: LucideIcon;
    title: string;
    description?: string;
    action?: ReactNode;
    className?: string;
}

export function EmptyState({ icon: Icon, title, description, action, className }: EmptyStateProps) {
    return (
        <div
            className={cn(
                "flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-neutral-200 bg-white px-6 py-10 text-center dark:border-neutral-700 dark:bg-neutral-900",
                className,
            )}
        >
            {Icon && (
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-neutral-100 text-neutral-500 dark:bg-neutral-800 dark:text-neutral-400">
                    <Icon className="h-5 w-5" />
                </div>
            )}
            <div className="max-w-sm">
                <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">{title}</p>
                {description && (
                    <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">{description}</p>
                )}
            </div>
            {action}
        </div>
    );
}