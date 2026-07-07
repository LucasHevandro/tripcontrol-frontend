import { Skeleton } from "@/components/ui/skeleton";

export function TripsSkeleton() {
    return (
        <div className="space-y-1">
            {/* Header */}
            <div className="flex items-start justify-between">
                <div className="space-y-1.5">
                    <Skeleton className="h-6 w-32" />
                    <Skeleton className="h-4 w-44" />
                </div>
                <Skeleton className="h-9 w-32 rounded-lg" />
            </div>

            {/* Tabs */}
            <div className="flex gap-6 border-b border-neutral-200 pb-3">
                {Array.from({ length: 4 }).map((_, i) => (
                    <Skeleton key={i} className={`h-4 ${i === 0 ? "w-10" : i === 1 ? "w-24" : i === 2 ? "w-20" : "w-20"}`} />
                ))}
            </div>

            {/* Grid de cards */}
            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="overflow-hidden rounded-xl border border-neutral-200 bg-white">
                        <Skeleton className="h-20 w-full rounded-none sm:h-28" />
                        <div className="p-4 space-y-2">
                            <div className="flex justify-between items-start">
                                <Skeleton className="h-5 w-36" />
                                <Skeleton className="h-5 w-20 rounded-full" />
                            </div>
                            <Skeleton className="h-3.5 w-32" />
                            <Skeleton className="h-3.5 w-24" />
                            <div className="flex justify-between items-center pt-1">
                                <div className="flex -space-x-2">
                                    {Array.from({ length: 3 }).map((_, j) => (
                                        <Skeleton key={j} className="h-6 w-6 rounded-full ring-2 ring-white" />
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