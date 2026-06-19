import { Clock, MapPin, Wallet, Users } from "lucide-react";
import type { RoadmapActivity } from "@/types/trip";

const BADGE_STYLE: Record<string, string> = {
    Concluído: "bg-emerald-50 text-emerald-700",
    Agora: "bg-amber-50 text-amber-700",
};

interface ActivityCardProps {
    activity: RoadmapActivity;
}

export function ActivityCard({ activity }: ActivityCardProps) {
    return (
        <div className="rounded-lg border border-neutral-100 bg-neutral-50 p-3">
            <div className="flex items-start justify-between gap-2">
                <p className="text-sm font-medium text-neutral-900">
                    <span className="mr-1">{activity.emoji}</span>
                    {activity.title}
                </p>
                {activity.badge && (
                    <span
                        className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${BADGE_STYLE[activity.badge] ?? "bg-neutral-100 text-neutral-600"
                            }`}
                    >
                        {activity.badge}
                    </span>
                )}
            </div>

            <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1">
                <span className="flex items-center gap-1 text-xs text-neutral-400">
                    <Clock className="h-3 w-3" />
                    {activity.duration}
                </span>
                {activity.location && (
                    <span className="flex items-center gap-1 text-xs text-neutral-400">
                        <MapPin className="h-3 w-3" />
                        {activity.location}
                    </span>
                )}
                {activity.costLabel && (
                    <span className="flex items-center gap-1 text-xs text-neutral-400">
                        <Wallet className="h-3 w-3" />
                        {activity.costLabel}
                    </span>
                )}
            </div>

            {activity.note && (
                <p className="mt-1.5 text-xs text-neutral-500">{activity.note}</p>
            )}
        </div>
    );
}