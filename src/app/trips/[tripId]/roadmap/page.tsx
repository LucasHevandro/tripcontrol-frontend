import { getTripRoadmapMock } from "@/lib/mock-trip";
import { DaySelector } from "@/components/roadmap/day-selector";
import { ActiveReservations } from "@/components/roadmap/active-reservations";
import { DayChecklist } from "@/components/roadmap/day-checklist";
import { ActivityTrigger } from "@/components/roadmap/activity-trigger";

export default async function RoadmapPage({
    params,
}: {
    params: Promise<{ tripId: string }>;
}) {
    const { tripId } = await params;
    const data = getTripRoadmapMock(tripId);

    // Índice do dia com atividades no mock (14/01 = index 4).
    // Quando a API existir, calcule com base na data atual vs. datas da viagem.
    const defaultDayIndex = data.days.findIndex((d) => d.activities.length > 0);

    return (
        <div className="space-y-1">
            <div className="flex items-start justify-between">
                <div>
                    <h1 className="text-lg font-semibold text-neutral-900">
                        Planejamento de roteiro
                    </h1>
                    <p className="text-sm text-neutral-400">
                        {data.tripName} · {data.tripPeriod} · {data.tripDurationDays} dias
                    </p>
                </div>
                <ActivityTrigger
                    tripId={tripId}
                    defaultDate={data.days[defaultDayIndex]?.date}
                    variant="button"
                />
            </div>

            <div className="grid grid-cols-1 gap-4">
                <div>
                    <DaySelector
                        days={data.days}
                        defaultSelectedIndex={defaultDayIndex >= 0 ? defaultDayIndex : 0}
                    />
                </div>
            </div>
        </div>
    );
}