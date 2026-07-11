export default function ReservationsLoading() {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-start justify-between">
                <div className="space-y-1.5">
                    <div className="h-6 w-56 animate-pulse rounded-lg bg-neutral-200 dark:bg-neutral-700" />
                    <div className="h-4 w-40 animate-pulse rounded-lg bg-neutral-200 dark:bg-neutral-700" />
                </div>
                <div className="h-9 w-32 animate-pulse rounded-lg bg-neutral-200 dark:bg-neutral-700" />
            </div>

            {/* Stat cards */}
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="rounded-xl border border-neutral-200 bg-white p-4 dark:border-neutral-700 dark:bg-neutral-900">
                        <div className="mb-2 h-3.5 w-24 animate-pulse rounded bg-neutral-200 dark:bg-neutral-700" />
                        <div className="mb-1 h-7 w-16 animate-pulse rounded bg-neutral-200 dark:bg-neutral-700" />
                        <div className="h-3 w-20 animate-pulse rounded bg-neutral-200 dark:bg-neutral-700" />
                    </div>
                ))}
            </div>

            {/* Filter pills */}
            <div className="flex gap-2">
                {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="h-9 w-28 animate-pulse rounded-full bg-neutral-200 dark:bg-neutral-700" />
                ))}
            </div>

            {/* Grid cards */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="overflow-hidden rounded-xl border border-neutral-200 bg-white dark:border-neutral-700 dark:bg-neutral-900">
                        <div className="h-28 w-full animate-pulse bg-neutral-200 dark:bg-neutral-700" />
                        <div className="space-y-3 p-4">
                            <div className="h-5 w-3/4 animate-pulse rounded bg-neutral-200 dark:bg-neutral-700" />
                            <div className="h-3.5 w-1/2 animate-pulse rounded bg-neutral-200 dark:bg-neutral-700" />
                            <div className="h-3.5 w-2/3 animate-pulse rounded bg-neutral-200 dark:bg-neutral-700" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}