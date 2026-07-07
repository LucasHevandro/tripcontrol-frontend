export default function RoadmapLoading() {
    return (
        <div className="space-y-1">
            <div className="flex items-start justify-between">
                <div className="space-y-1.5">
                    <div className="h-6 w-48 animate-pulse rounded-lg bg-neutral-200 dark:bg-neutral-700" />
                    <div className="h-4 w-64 animate-pulse rounded-lg bg-neutral-200 dark:bg-neutral-700" />
                </div>
                <div className="h-9 w-36 animate-pulse rounded-lg bg-neutral-200 dark:bg-neutral-700" />
            </div>
            <div className="flex gap-2 pb-1">
                {Array.from({ length: 7 }).map((_, i) => (
                    <div key={i} className="h-8 w-24 animate-pulse rounded-full bg-neutral-200" />
                ))}
            </div>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_280px]">
                <div className="rounded-xl border border-neutral-200 bg-white p-5">
                    <div className="h-5 w-40 animate-pulse rounded bg-neutral-200 mb-4" />
                    {Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className="flex gap-4 mb-4">
                            <div className="h-4 w-10 animate-pulse rounded bg-neutral-200 mt-1" />
                            <div className="h-3 w-3 animate-pulse rounded-full bg-neutral-200 mt-1.5" />
                            <div className="flex-1 rounded-lg bg-neutral-100 p-3">
                                <div className="h-4 w-3/4 animate-pulse rounded bg-neutral-200 mb-2" />
                                <div className="h-3 w-1/2 animate-pulse rounded bg-neutral-200 dark:bg-neutral-700" />
                            </div>
                        </div>
                    ))}
                </div>
                <div className="space-y-4">
                    <div className="h-48 animate-pulse rounded-xl bg-neutral-200 dark:bg-neutral-700" />
                    <div className="h-48 animate-pulse rounded-xl bg-neutral-200 dark:bg-neutral-700" />
                </div>
            </div>
        </div>
    );
}