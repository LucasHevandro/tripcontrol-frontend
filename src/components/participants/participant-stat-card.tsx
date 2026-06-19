interface ParticipantStatCardProps {
    label: string;
    value: string;
    sublabel: string;
    valueClassName?: string;
}

export function ParticipantStatCard({
    label,
    value,
    sublabel,
    valueClassName = "text-neutral-900",
}: ParticipantStatCardProps) {
    return (
        <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-4">
            <p className="text-sm text-neutral-500">{label}</p>
            <p className={`mt-1.5 text-2xl font-bold ${valueClassName}`}>{value}</p>
            <p className="mt-0.5 text-xs text-neutral-400">{sublabel}</p>
        </div>
    );
}