export default function ParticipantsLoading() {
    return (
        <div className="space-y-1">
            <div className="flex items-start justify-between">
                <div className="space-y-1.5">
                    <div className="h-6 w-60 animate-pulse rounded-lg bg-neutral-200 dark:bg-neutral-700" />
                    <div className="h-4 w-44 animate-pulse rounded-lg bg-neutral-200 dark:bg-neutral-700" />
                </div>
                <div className="h-9 w-44 animate-pulse rounded-lg bg-neutral-200 dark:bg-neutral-700" />
            </div>
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="rounded-xl border border-neutral-200 bg-white p-4">
                        <div className="h-3.5 w-24 animate-pulse rounded bg-neutral-200 mb-2" />
                        <div className="h-7 w-16 animate-pulse rounded bg-neutral-200 mb-1" />
                        <div className="h-3 w-20 animate-pulse rounded bg-neutral-200 dark:bg-neutral-700" />
                    </div>
                ))}
            </div>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_320px]">
                <div className="space-y-1">
                    <div className="rounded-xl border border-neutral-200 bg-white px-4 py-3">
                        <div className="h-4 w-32 animate-pulse rounded bg-neutral-200 dark:bg-neutral-700" />
                    </div>
                    {Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className="rounded-xl border border-neutral-200 bg-white p-4">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="h-10 w-10 animate-pulse rounded-full bg-neutral-200" />
                                <div>
                                    <div className="h-4 w-36 animate-pulse rounded bg-neutral-200 mb-1.5" />
                                    <div className="h-3 w-28 animate-pulse rounded bg-neutral-200 dark:bg-neutral-700" />
                                </div>
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                                {Array.from({ length: 3 }).map((_, j) => (
                                    <div key={j} className="h-16 animate-pulse rounded-lg bg-neutral-100" />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="space-y-4">
                    <div className="h-64 animate-pulse rounded-xl bg-neutral-200 dark:bg-neutral-700" />
                    <div className="h-48 animate-pulse rounded-xl bg-neutral-200 dark:bg-neutral-700" />
                </div>
            </div>
        </div>
    );
}