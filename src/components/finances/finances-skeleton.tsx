import { Skeleton } from "@/components/ui/skeleton";
import { SkeletonCard } from "@/components/ui/skeleton-card";

export function FinancesSkeleton() {
    return (
        <div className="space-y-1">
            {/* Header */}
            <div className="flex items-start justify-between">
                <div className="space-y-1.5">
                    <Skeleton className="h-6 w-44" />
                    <Skeleton className="h-4 w-56" />
                </div>
                <Skeleton className="h-9 w-36 rounded-lg" />
            </div>

            {/* 4 stat cards */}
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                {Array.from({ length: 4 }).map((_, i) => (
                    <SkeletonCard key={i} />
                ))}
            </div>

            {/* Duas colunas */}
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_380px]">
                <div className="rounded-xl border border-neutral-200 bg-white p-5 space-y-6">
                    {/* Tabela de despesas */}
                    <div>
                        <Skeleton className="h-5 w-40 mb-4" />
                        <div className="grid grid-cols-5 gap-4 pb-2 border-b border-neutral-100">
                            {["w-24", "w-16", "w-20", "w-12", "w-14"].map((w, i) => (
                                <Skeleton key={i} className={`h-3 ${w}`} />
                            ))}
                        </div>
                        {Array.from({ length: 5 }).map((_, i) => (
                            <div key={i} className="grid grid-cols-5 items-center gap-4 py-3 border-b border-neutral-100">
                                <Skeleton className="h-4 w-32" />
                                <div className="flex items-center gap-2">
                                    <Skeleton className="h-6 w-6 rounded-full" />
                                    <Skeleton className="h-4 w-16" />
                                </div>
                                <Skeleton className="h-5 w-20 rounded-full" />
                                <Skeleton className="h-4 w-10" />
                                <Skeleton className="h-4 w-16 ml-auto" />
                            </div>
                        ))}
                    </div>

                    {/* Categorias */}
                    <div>
                        <Skeleton className="h-4 w-36 mb-3" />
                        {Array.from({ length: 4 }).map((_, i) => (
                            <div key={i} className="mb-3">
                                <div className="flex justify-between mb-1.5">
                                    <Skeleton className="h-3.5 w-24" />
                                    <Skeleton className="h-3.5 w-20" />
                                </div>
                                <Skeleton className="h-1.5 w-full rounded-full" />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="rounded-xl border border-neutral-200 bg-white p-5 space-y-4">
                    {/* Acertos */}
                    <div>
                        <Skeleton className="h-5 w-36 mb-1" />
                        <Skeleton className="h-3.5 w-44 mb-4" />
                        {Array.from({ length: 4 }).map((_, i) => (
                            <div key={i} className="pb-4 mb-1 border-b border-neutral-100">
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-2">
                                        <Skeleton className="h-7 w-7 rounded-full" />
                                        <Skeleton className="h-4 w-12" />
                                        <Skeleton className="h-3 w-3" />
                                        <Skeleton className="h-7 w-7 rounded-full" />
                                        <Skeleton className="h-4 w-12" />
                                    </div>
                                    <Skeleton className="h-4 w-14" />
                                </div>
                                <Skeleton className="h-3 w-40 mt-1.5" />
                            </div>
                        ))}
                    </div>

                    {/* Saldo individual */}
                    <div className="rounded-lg bg-neutral-50 p-4">
                        <Skeleton className="h-4 w-28 mb-3" />
                        {Array.from({ length: 6 }).map((_, i) => (
                            <div key={i} className="flex items-center gap-3 mb-3">
                                <Skeleton className="h-7 w-7 rounded-full" />
                                <Skeleton className="h-4 flex-1" />
                                <Skeleton className="h-4 w-16" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}