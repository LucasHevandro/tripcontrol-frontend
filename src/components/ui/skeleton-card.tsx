import { Skeleton } from "./skeleton";

interface SkeletonCardProps {
    className?: string;
}

export function SkeletonCard({ className }: SkeletonCardProps) {
    return (
        <div className={`rounded-xl border border-neutral-200 bg-white p-5 dark:border-neutral-700 dark:bg-neutral-900 ${className ?? ""}`}>
            <Skeleton className="mb-3 h-4 w-1/3" />
            <Skeleton className="mb-1.5 h-7 w-1/2" />
            <Skeleton className="h-3 w-1/4" />
        </div>
    );
}