interface ReservationStatCardProps {
    label: string;
    value: string;
    sublabel: string;
}

export function ReservationStatCard({ label, value, sublabel }: ReservationStatCardProps) {
    return (
        <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-700 dark:bg-neutral-800">
            <p className="text-sm text-neutral-500 dark:text-neutral-400">{label}</p>
            <p className="mt-1.5 text-2xl font-bold text-neutral-900 dark:text-neutral-100">{value}</p>
            <p className="mt-0.5 text-xs text-neutral-400 dark:text-neutral-500">{sublabel}</p>
        </div>
    );
}