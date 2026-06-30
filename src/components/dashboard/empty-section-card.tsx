import Link from "next/link";
import type { LucideIcon } from "lucide-react";

interface EmptySectionCardProps {
    icon: LucideIcon;
    title: string;
    emptyMessage: string;
    actionLabel: string;
    actionHref: string;
    onAction?: () => void;
}

export function EmptySectionCard({
    icon: Icon,
    title,
    emptyMessage,
    actionLabel,
    actionHref,
    onAction,
}: EmptySectionCardProps) {
    return (
        <div className="rounded-xl border border-neutral-200 bg-white p-5">
            <h2 className="flex items-center gap-2 text-sm font-semibold text-neutral-900">
                <Icon className="h-4 w-4 text-neutral-500" />
                {title}
            </h2>

            <div className="flex flex-col items-center gap-2 py-10">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-neutral-100 text-neutral-300">
                    <Icon className="h-5 w-5" />
                </span>
                <p className="text-sm text-neutral-400">{emptyMessage}</p>
                {onAction ? (
                    <button type="button" onClick={onAction} className="text-sm font-medium text-emerald-700">
                        + {actionLabel}
                    </button>
                ) : (
                    <Link href={actionHref} className="text-sm font-medium text-emerald-700">
                        + {actionLabel}
                    </Link>
                )}
            </div>
        </div>
    );
}