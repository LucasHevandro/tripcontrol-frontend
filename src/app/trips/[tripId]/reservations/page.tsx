import Link from "next/link";
import { Plus } from "lucide-react";
import { getTripReservationsMock } from "@/lib/mock-trip";
import { formatCurrencyBRL } from "@/lib/format";
import { ReservationStatCard } from "@/components/reservations/reservation-stat-card";
import { ReservationsGrid } from "@/components/reservations/reservations-grid";

export default async function ReservationsPage({
    params,
}: {
    params: Promise<{ tripId: string }>;
}) {
    const { tripId } = await params;
    const data = getTripReservationsMock(tripId);

    return (
        <div className="space-y-1">
            <div className="flex items-start justify-between">
                <div>
                    <h1 className="text-lg font-semibold text-neutral-900">
                        Gerenciamento de reservas
                    </h1>
                    <p className="text-sm text-neutral-400">
                        {data.tripName} · {data.tripPeriod}
                    </p>
                </div>
                <Link
                    href={`/trips/${tripId}/reservations/new`}
                    className="flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3.5 py-2 text-sm font-medium text-white hover:bg-emerald-700"
                >
                    <Plus className="h-4 w-4" />
                    Nova reserva
                </Link>
            </div>

            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                <ReservationStatCard
                    label="Total de reservas"
                    value={String(data.totalReservations)}
                    sublabel={`${data.confirmedCount} confirmadas`}
                />
                <ReservationStatCard
                    label="Total investido"
                    value={formatCurrencyBRL(data.totalInvested)}
                    sublabel="em reservas"
                />
                <ReservationStatCard
                    label="Próximo check-in"
                    value={data.nextCheckinLabel}
                    sublabel={data.nextCheckinSublabel}
                />
                <ReservationStatCard
                    label="Próximo voo"
                    value={data.nextFlightLabel}
                    sublabel={data.nextFlightSublabel}
                />
            </div>

            <ReservationsGrid tripId={tripId} reservations={data.reservations} />
        </div>
    );
}