import { Skeleton } from "@/components/ui/skeleton";

export function TripsSkeleton() {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-start justify-between">
                <div className="space-y-1.5">
                    <Skeleton className="h-6 w-32" />
                    <Skeleton className="h-4 w-44" />
                </div>
                <Skeleton className="h-9 w-32 rounded-lg" />
            </div>

            {/* Tabs */}
            <div className="flex gap-6 border-b border-neutral-200 pb-3 dark:border-neutral-700">
                {Array.from({ length: 4 }).map((_, i) => (
                    <Skeleton key={i} className={`h-4 ${i === 0 ? "w-10" : i === 1 ? "w-24" : i === 2 ? "w-20" : "w-20"}`} />
                ))}
            </div>

            {/* Grid de cards */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="overflow-hidden rounded-xl border border-neutral-200 bg-white dark:border-neutral-700 dark:bg-neutral-900">
                        <Skeleton className="h-20 w-full rounded-none sm:h-28" />
                        <div className="space-y-2 p-4">
                            <div className="flex items-start justify-between">
                                <Skeleton className="h-5 w-36" />
                                <Skeleton className="h-5 w-20 rounded-full" />
                            </div>
                            <Skeleton className="h-3.5 w-32" />
                            <Skeleton className="h-3.5 w-24" />
                            <div className="flex items-center justify-between pt-1">
                                <div className="flex -space-x-2">
                                    {Array.from({ length: 3 }).map((_, j) => (
                                        <Skeleton key={j} className="h-6 w-6 rounded-full ring-2 ring-white dark:ring-neutral-900" />
                                    ))}
                                </div>
                                <div className="space-y-1 text-right">
                                    <Skeleton className="h-3 w-28" />
                                    <Skeleton className="h-1 w-24 rounded-full" />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}