import { getMyTripsMock } from "@/lib/mock-trip";
import { TripsFilterTabs } from "@/components/trips/trips-filter-tabs";
import { NewTripTrigger } from "@/components/trips/new-trip-trigger";

export default function MyTripsPage() {
    const data = getMyTripsMock();

    return (
        <div className="space-y-1">
            <div className="flex items-start justify-between">
                <div>
                    <h1 className="text-lg font-semibold text-neutral-900">
                        Minhas viagens
                    </h1>
                    <p className="text-sm text-neutral-400">
                        {data.activeTripCount} viagens ativas · {data.completedTripCount} concluída
                    </p>
                </div>
                <NewTripTrigger variant="button" />
            </div>

            <TripsFilterTabs trips={data.trips} />
        </div>
    );
}