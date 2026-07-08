import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

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
    const action = onAction ? (
        <Button variant="ghost" size="sm" leftIcon={Plus} onClick={onAction}>
            {actionLabel}
        </Button>
    ) : (
        <Link
            href={actionHref}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-emerald-700 hover:text-emerald-800 dark:text-emerald-400 dark:hover:text-emerald-300"
        >
            <Plus className="h-4 w-4" />
            {actionLabel}
        </Link>
    );

    return (
        <Card padding="lg">
            <h2 className="flex items-center gap-2 text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                <Icon className="h-4 w-4 text-neutral-500 dark:text-neutral-400" />
                {title}
            </h2>
            <EmptyState
                icon={Icon}
                title={emptyMessage}
                action={action}
                className="mt-4 border-none bg-transparent dark:bg-transparent"
            />
        </Card>
    );
}