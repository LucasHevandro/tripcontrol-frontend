import type { RoadmapDay } from "@/types/trip";
import { ActivityCard } from "./activity-card";

interface DayTimelineProps {
    day: RoadmapDay;
}

const STATUS_DOT: Record<string, string> = {
    completed: "bg-emerald-500",
    current: "bg-amber-500",
    upcoming: "bg-neutral-300",
};

export function DayTimeline({ day }: DayTimelineProps) {
    return (
        <div className="rounded-xl border border-neutral-200 bg-white p-5">
            <div className="flex items-center justify-between text-sm text-neutral-500">
                <span className="font-medium text-neutral-900">{day.fullLabel}</span>
                <span>
                    {day.activityCount} atividades · {day.participantCount} participantes
                </span>
            </div>

            {day.activities.length === 0 ? (
                <div className="mt-8 py-8 text-center text-sm text-neutral-400">
                    Nenhuma atividade planejada para este dia
                </div>
            ) : (
                <ul className="mt-4 space-y-0">
                    {day.activities.map((activity) => (
                        <li key={activity.id} className="flex gap-4">
                            <div className="flex w-12 shrink-0 flex-col items-start pt-3">
                                <span className="text-xs text-neutral-400">{activity.time}</span>
                            </div>

                            <div className="flex flex-col items-center">
                                <span
                                    className={`mt-3.5 h-2.5 w-2.5 shrink-0 rounded-full ${STATUS_DOT[activity.status]}`}
                                />
                                <div className="w-px flex-1 bg-neutral-100" />
                            </div>

                            <div className="flex-1 pb-4 pt-2">
                                <ActivityCard activity={activity} />
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}