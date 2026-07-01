import { Skeleton } from "./skeleton";

interface SkeletonCardProps {
    className?: string;
}

export function SkeletonCard({ className }: SkeletonCardProps) {
    return (
        <div className={`rounded-xl border border-neutral-200 bg-white p-5 ${className ?? ""}`}>
            <Skeleton className="h-4 w-1/3 mb-3" />
            <Skeleton className="h-7 w-1/2 mb-1.5" />
            <Skeleton className="h-3 w-1/4" />
        </div>
    );
}