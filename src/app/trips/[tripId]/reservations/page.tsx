import { getTripReservationsMock } from "@/lib/mock-trip";
import { formatCurrencyBRL } from "@/lib/format";
import { ReservationStatCard } from "@/components/reservations/reservation-stat-card";
import { ReservationsGrid } from "@/components/reservations/reservations-grid";
import { ReservationTrigger } from "@/components/reservations/reservation-trigger";


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
                <ReservationTrigger tripId={tripId} variant="button" label="Nova reserva" />
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