import { Skeleton } from "@/components/ui/skeleton";
import { SkeletonCard } from "@/components/ui/skeleton-card";

export function DashboardSkeleton() {
    return (
        <div className="space-y-6">
            {/* Header card */}
            <div className="rounded-xl border border-neutral-200 bg-white p-5 dark:border-neutral-700 dark:bg-neutral-900">
                <div className="flex items-start justify-between">
                    <div className="space-y-2">
                        <Skeleton className="h-6 w-48" />
                        <div className="flex gap-4">
                            <Skeleton className="h-4 w-28" />
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="h-4 w-32" />
                        </div>
                    </div>
                    <Skeleton className="h-9 w-36 rounded-lg" />
                </div>
            </div>

            {/* 4 stat cards */}
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                {Array.from({ length: 4 }).map((_, i) => (
                    <SkeletonCard key={i} />
                ))}
            </div>

            {/* Barra de orçamento */}
            <div className="rounded-xl border border-neutral-200 bg-white p-5 dark:border-neutral-700 dark:bg-neutral-900">
                <div className="mb-2.5 flex justify-between">
                    <Skeleton className="h-4 w-36" />
                    <Skeleton className="h-4 w-10" />
                </div>
                <Skeleton className="h-2 w-full rounded-full" />
                <div className="mt-2 flex justify-between">
                    <Skeleton className="h-3 w-24" />
                    <Skeleton className="h-3 w-28" />
                </div>
            </div>

            {/* Duas colunas: despesas + roteiro */}
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                <div className="space-y-3 rounded-xl border border-neutral-200 bg-white p-5 dark:border-neutral-700 dark:bg-neutral-900">
                    <div className="flex justify-between">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-4 w-16" />
                    </div>
                    {Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className="flex items-center gap-3 border-b border-neutral-100 py-2 dark:border-neutral-800">
                            <Skeleton className="h-9 w-9 shrink-0 rounded-lg" />
                            <div className="flex-1 space-y-1.5">
                                <Skeleton className="h-4 w-3/4" />
                                <Skeleton className="h-3 w-1/2" />
                            </div>
                            <Skeleton className="h-4 w-16" />
                        </div>
                    ))}
                </div>

                <div className="space-y-4 rounded-xl border border-neutral-200 bg-white p-5 dark:border-neutral-700 dark:bg-neutral-900">
                    <div className="flex justify-between">
                        <Skeleton className="h-4 w-28" />
                        <Skeleton className="h-3 w-20" />
                    </div>
                    {Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className="flex gap-3">
                            <Skeleton className="mt-1 h-3 w-10 shrink-0" />
                            <Skeleton className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full" />
                            <div className="flex-1 space-y-1.5">
                                <Skeleton className="h-4 w-3/4" />
                                <Skeleton className="h-3 w-1/2" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Participantes */}
            <div className="rounded-xl border border-neutral-200 bg-white p-5 dark:border-neutral-700 dark:bg-neutral-900">
                <Skeleton className="mb-3 h-4 w-40" />
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className="flex items-center gap-2.5 rounded-lg bg-neutral-50 p-3 dark:bg-neutral-800">
                            <Skeleton className="h-8 w-8 shrink-0 rounded-full" />
                            <div className="space-y-1.5">
                                <Skeleton className="h-3.5 w-14" />
                                <Skeleton className="h-3 w-10" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}