import type { RoadmapDay } from "@/types/trip";
import { ActivityCard } from "./activity-card";

interface DayTimelineProps {
    tripId: string;
    day: RoadmapDay;
}

const STATUS_DOT: Record<string, string> = {
    completed: "bg-emerald-500",
    current: "bg-amber-500",
    upcoming: "bg-neutral-300 dark:bg-neutral-600",
};

export function DayTimeline({ tripId, day }: DayTimelineProps) {
    return (
        <div className="rounded-xl border border-neutral-200 bg-white p-5 dark:border-neutral-700 dark:bg-neutral-900">
            <div className="flex items-center justify-between text-sm text-neutral-500 dark:text-neutral-400">
                <span className="font-medium text-neutral-900 dark:text-neutral-100">{day.fullLabel}</span>
                <span>{day.activityCount} atividades · {day.participantCount} participantes</span>
            </div>

            {day.activities.length === 0 ? (
                <div className="mt-8 py-8 text-center text-sm text-neutral-400 dark:text-neutral-500">
                    Nenhuma atividade planejada para este dia
                </div>
            ) : (
                <ul className="mt-4 space-y-0">
                    {day.activities.map((activity) => (
                        <li key={activity.id} className="flex gap-4">
                            <div className="flex w-12 shrink-0 flex-col items-start pt-3">
                                <span className="text-xs text-neutral-400 dark:text-neutral-500">{activity.time}</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <span className={`mt-3.5 h-2.5 w-2.5 shrink-0 rounded-full ${STATUS_DOT[activity.status]}`} />
                                <div className="w-px flex-1 bg-neutral-100 dark:bg-neutral-700" />
                            </div>
                            <div className="flex-1 pb-4 pt-2">
                                <ActivityCard tripId={tripId} activity={activity} />
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}