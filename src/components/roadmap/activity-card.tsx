import { Clock, MapPin, Wallet } from "lucide-react";
import type { RoadmapActivity } from "@/types/trip";

const BADGE_STYLE: Record<string, string> = {
    Concluído: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400",
    Agora: "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-400",
};

interface ActivityCardProps {
    activity: RoadmapActivity;
}

export function ActivityCard({ activity }: ActivityCardProps) {
    return (
        <div className="rounded-lg border border-neutral-100 bg-neutral-50 p-3 dark:border-neutral-700 dark:bg-neutral-800">
            <div className="flex items-start justify-between gap-2">
                <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                    <span className="mr-1">{activity.emoji}</span>
                    {activity.title}
                </p>
                {activity.badge && (
                    <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${BADGE_STYLE[activity.badge] ?? "bg-neutral-100 text-neutral-600 dark:bg-neutral-700 dark:text-neutral-400"}`}>
                        {activity.badge}
                    </span>
                )}
            </div>

            <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1">
                <span className="flex items-center gap-1 text-xs text-neutral-400 dark:text-neutral-500">
                    <Clock className="h-3 w-3" />
                    {activity.duration}
                </span>
                {activity.location && (
                    <span className="flex items-center gap-1 text-xs text-neutral-400 dark:text-neutral-500">
                        <MapPin className="h-3 w-3" />
                        {activity.location}
                    </span>
                )}
                {activity.costLabel && (
                    <span className="flex items-center gap-1 text-xs text-neutral-400 dark:text-neutral-500">
                        <Wallet className="h-3 w-3" />
                        {activity.costLabel}
                    </span>
                )}
            </div>

            {activity.note && (
                <p className="mt-1.5 text-xs text-neutral-500 dark:text-neutral-400">{activity.note}</p>
            )}
        </div>
    );
}