import { Wallet, Receipt, Map, Hotel } from "lucide-react";
import { getTripDashboardMock } from "@/lib/mock-trip";
import { formatCurrencyBRL } from "@/lib/format";
import { TripHeaderCard } from "@/components/dashboard/trip-header-card";
import { StatCard } from "@/components/dashboard/start-card";
import { BudgetProgressBar } from "@/components/dashboard/budget-progress-bar";
import { RecentExpensesList } from "@/components/dashboard/recent-exprense-list";
import { TodayItinerary } from "@/components/dashboard/today-itinerary";
import { ParticipantsBalanceRow } from "@/components/dashboard/participants-balance-row";

export default async function DashboardPage({ params }: { params: Promise<{ tripId: string }> }) {
    const { tripId } = await params;
    const data = getTripDashboardMock(tripId);

    return (
        <div className="space-y-1">
            <TripHeaderCard trip={data.trip} />

            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                <StatCard
                    icon={Wallet}
                    label="Total gasto"
                    value={formatCurrencyBRL(data.totalSpent)}
                    sublabel={`de ${formatCurrencyBRL(data.budget)} orçados`}
                />
                <StatCard
                    icon={Receipt}
                    label="Despesas"
                    value={data.expenseCount}
                    sublabel="registradas"
                />
                <StatCard
                    icon={Map}
                    label="Atividades"
                    value={data.activityCount}
                    sublabel={`${data.completedActivityCount} concluídas`}
                />
                <StatCard
                    icon={Hotel}
                    label="Reservas"
                    value={data.reservationCount}
                    sublabel={data.allReservationsConfirmed ? "todas confirmadas" : "pendências"}
                />
            </div>

            <BudgetProgressBar totalSpent={data.totalSpent} budget={data.budget} />

            <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                <RecentExpensesList tripId={tripId} expenses={data.recentExpenses} />
                <TodayItinerary
                    todayLabel={data.todayLabel}
                    activities={data.todayActivities}
                />
            </div>

            <ParticipantsBalanceRow participants={data.participants} />
        </div>
    );
}