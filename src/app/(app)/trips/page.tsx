import Link from "next/link";
import { Plus } from "lucide-react";
import { getMyTripsMock } from "@/lib/mock-trip";
import { TripsFilterTabs } from "@/components/trips/trips-filter-tabs";

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
                <Link
                    href="/trips/new"
                    className="flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3.5 py-2 text-sm font-medium text-white hover:bg-emerald-700"
                >
                    <Plus className="h-4 w-4" />
                    Nova viagem
                </Link>
            </div>

            <TripsFilterTabs trips={data.trips} />
        </div>
    );
}