import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
    title: ReactNode;
    subtitle?: ReactNode;
    action?: ReactNode;
    className?: string;
}

export function PageHeader({ title, subtitle, action, className }: PageHeaderProps) {
    return (
        <header
            className={cn(
                "flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between",
                className,
            )}
        >
            <div className="min-w-0">
                <h1 className="text-xl font-semibold text-neutral-900 sm:text-2xl dark:text-neutral-100">
                    {title}
                </h1>
                {subtitle && (
                    <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">{subtitle}</p>
                )}
            </div>
            {action && <div className="shrink-0">{action}</div>}
        </header>
    );
}