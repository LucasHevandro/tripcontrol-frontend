import Link from "next/link";
import { Plus } from "lucide-react";
import { getTripRoadmapMock } from "@/lib/mock-trip";
import { DaySelector } from "@/components/roadmap/day-selector";
import { ActiveReservations } from "@/components/roadmap/active-reservations";
import { DayChecklist } from "@/components/roadmap/day-checklist";

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
                <Link
                    href={`/trips/${tripId}/roadmap/new`}
                    className="flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3.5 py-2 text-sm font-medium text-white hover:bg-emerald-700"
                >
                    <Plus className="h-4 w-4" />
                    Nova atividade
                </Link>
            </div>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_280px]">
                <div>
                    <DaySelector
                        days={data.days}
                        defaultSelectedIndex={defaultDayIndex >= 0 ? defaultDayIndex : 0}
                    />
                </div>

                <div className="space-y-4">
                    <ActiveReservations reservations={data.activeReservations} />
                    <DayChecklist items={data.todayChecklist} />
                </div>
            </div>
        </div>
    );
}