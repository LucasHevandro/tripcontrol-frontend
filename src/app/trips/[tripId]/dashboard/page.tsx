"use client";

import { use } from "react";
import { Wallet, Receipt, Map, Hotel, Receipt as ReceiptIcon, Map as MapIcon } from "lucide-react";
import { formatCurrencyBRL } from "@/lib/format";
import { isNewTrip, getOnboardingSteps } from "@/lib/onboarding";
import { useTripDashboard } from "@/hooks/trips/use-trip-dashboard";
import { TripHeaderCard } from "@/components/dashboard/trip-header-card";
import { NewTripHeaderCard } from "@/components/dashboard/new-trip-header-card";
import { OnboardingChecklist } from "@/components/dashboard/onboarding-checklist";
import { EmptyExpensesSection } from "@/components/dashboard/empty-expenses-section";
import { EmptySectionCard } from "@/components/dashboard/empty-section-card";
import { StatCard } from "@/components/dashboard/stat-card";
import { BudgetProgressBar } from "@/components/dashboard/budget-progress-bar";
import { RecentExpensesList } from "@/components/dashboard/recent-expense-list";
import { TodayItinerary } from "@/components/dashboard/today-itinerary";
import { ParticipantsBalanceRow } from "@/components/dashboard/participants-balance-row";
import { DashboardSkeleton } from "@/components/dashboard/dashboard-skeleton";

export default function DashboardPage({
    params,
}: {
    params: Promise<{ tripId: string }>;
}) {
    const { tripId } = use(params);
    const { data, isLoading, isError } = useTripDashboard(tripId);

    if (isLoading) return <DashboardSkeleton />;

    if (isError || !data) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-center">
                <p className="text-sm text-neutral-500">
                    Erro ao carregar dashboard. Tente novamente.
                </p>
            </div>
        );
    }

    if (isNewTrip(data)) {
        const steps = getOnboardingSteps(tripId, data.newTripStatus);

        return (
            <div className="space-y-1">
                <NewTripHeaderCard trip={data.trip} />

                <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                    <StatCard icon={Wallet} label="Total gasto" value={formatCurrencyBRL(data.totalSpent)} sublabel="Total gasto" />
                    <StatCard icon={Receipt} label="Despesas" value={data.expenseCount} sublabel="Despesas" />
                    <StatCard icon={Map} label="Atividades" value={data.activityCount} sublabel="Atividades" />
                    <StatCard icon={Hotel} label="Participante" value={data.trip.participantCount} sublabel="Participante" />
                </div>

                <OnboardingChecklist steps={steps} />

                <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                    <EmptyExpensesSection tripId={tripId} />
                    <EmptySectionCard
                        icon={MapIcon}
                        title="Roteiro"
                        emptyMessage="Roteiro ainda não planejado"
                        actionLabel="Planejar roteiro"
                        actionHref={`/trips/${tripId}/roadmap`}
                    />
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-1">
            <TripHeaderCard trip={data.trip} />

            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                <StatCard icon={Wallet} label="Total gasto" value={formatCurrencyBRL(data.totalSpent)} sublabel={`de ${formatCurrencyBRL(data.budget)} orçados`} />
                <StatCard icon={Receipt} label="Despesas" value={data.expenseCount} sublabel="registradas" />
                <StatCard icon={Map} label="Atividades" value={data.activityCount} sublabel={`${data.completedActivityCount} concluídas`} />
                <StatCard icon={Hotel} label="Reservas" value={data.reservationCount} sublabel={data.allReservationsConfirmed ? "todas confirmadas" : "pendências"} />
            </div>

            <BudgetProgressBar totalSpent={data.totalSpent} budget={data.budget} />

            <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                <RecentExpensesList tripId={tripId} expenses={data.recentExpenses} />
                <TodayItinerary todayLabel={data.todayLabel} activities={data.todayActivities} />
            </div>

            <ParticipantsBalanceRow participants={data.participants} />
        </div>
    );
}