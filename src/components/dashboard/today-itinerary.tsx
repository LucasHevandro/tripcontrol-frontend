import { CalendarDays, CheckCircle2, MapPin } from "lucide-react";
import type { Activity, ActivityStatus } from "@/types/trip";

const STATUS_DOT: Record<ActivityStatus, string> = {
    completed: "bg-emerald-500",
    current: "bg-amber-500",
    upcoming: "bg-neutral-300 dark:bg-neutral-600",
};

const STATUS_BADGE: Record<ActivityStatus, { label: string; className: string } | null> = {
    completed: null,
    current: { label: "Agora", className: "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-400" },
    upcoming: null,
};

interface TodayItineraryProps {
    todayLabel: string;
    activities: Activity[];
}

export function TodayItinerary({ todayLabel, activities }: TodayItineraryProps) {
    return (
        <div className="rounded-xl border border-neutral-200 bg-white p-5 dark:border-neutral-700 dark:bg-neutral-900">
            <div className="flex items-center justify-between">
                <h2 className="flex items-center gap-2 text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                    <CalendarDays className="h-4 w-4 text-neutral-500 dark:text-neutral-400" />
                    Roteiro de hoje
                </h2>
                <span className="text-xs text-neutral-400 dark:text-neutral-500">{todayLabel}</span>
            </div>

            <ul className="mt-3 space-y-4">
                {activities.map((activity) => {
                    const badge = STATUS_BADGE[activity.status];
                    return (
                        <li key={activity.id} className="flex gap-3">
                            <div className="flex w-12 shrink-0 flex-col items-start">
                                <span className="text-xs text-neutral-400 dark:text-neutral-500">{activity.time}</span>
                            </div>

                            <span className={`mt-1 h-2 w-2 shrink-0 rounded-full ${STATUS_DOT[activity.status]}`} />

                            <div className="flex-1">
                                <div className="flex items-center gap-1.5">
                                    <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                                        {activity.title}
                                    </p>
                                    {activity.status === "completed" && (
                                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                                    )}
                                </div>
                                {activity.location && (
                                    <p className="mt-0.5 flex items-center gap-1 text-xs text-neutral-400 dark:text-neutral-500">
                                        <MapPin className="h-3 w-3" />
                                        {activity.location}
                                    </p>
                                )}
                            </div>

                            {badge && (
                                <span className={`h-fit rounded-full px-2.5 py-0.5 text-xs font-medium ${badge.className}`}>
                                    {badge.label}
                                </span>
                            )}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}