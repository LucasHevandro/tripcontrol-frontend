"use client";

import { use } from "react";
import { Wallet, Receipt, Map, Hotel, Users, Map as MapIcon } from "lucide-react";
import { formatCurrencyBRL } from "@/lib/format";
import { isNewTrip, getOnboardingSteps } from "@/lib/onboarding";
import { useTripDashboard } from "@/hooks/trips/use-trip-dashboard";
import { OnboardingChecklist } from "@/components/dashboard/onboarding-checklist";
import { EmptyExpensesSection } from "@/components/dashboard/empty-expenses-section";
import { EmptySectionCard } from "@/components/dashboard/empty-section-card";
import { StatCard } from "@/components/dashboard/stat-card";
import { RecentExpensesList } from "@/components/dashboard/recent-expense-list";
import { TodayItinerary } from "@/components/dashboard/today-itinerary";
import { ParticipantsBalanceRow } from "@/components/dashboard/participants-balance-row";
import { DashboardSkeleton } from "@/components/dashboard/dashboard-skeleton";
import { ErrorState } from "@/components/ui/error-state";
import Link from "next/link";
import { UserPlus } from "lucide-react";
import { TripHeroCard } from "@/components/dashboard/trip-hero-card";
import { ExpenseTrigger } from "@/components/expenses/expense-trigger";

export default function DashboardPage({
    params,
}: {
    params: Promise<{ tripId: string }>;
}) {
    const { tripId } = use(params);
    const { data, isLoading, isRefetching, isError, refetch } = useTripDashboard(tripId);

    if (isLoading) return <DashboardSkeleton />;

    if (isError || !data) return (
        <ErrorState
            title="Não foi possível carregar o dashboard"
            onRetry={() => refetch()}
            isRetrying={isRefetching}
            className="mt-6"
        />
    );

    if (isNewTrip(data)) {
        const steps = getOnboardingSteps(tripId, data.newTripStatus);

        return (
            <div className="space-y-6">
                <TripHeroCard
                    trip={data.trip}
                    primaryAction={
                        <Link
                            href={`/trips/${tripId}/participants`}
                            className="inline-flex items-center gap-1.5 rounded-lg bg-white px-4 py-2 text-sm font-medium text-emerald-700 shadow-sm transition-colors hover:bg-emerald-50"
                        >
                            <UserPlus className="h-4 w-4" />
                            Convidar participantes
                        </Link>
                    }
                />

                <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                    <StatCard icon={Wallet} label="Total gasto" value={formatCurrencyBRL(data.totalSpent)} sublabel="Total gasto" />
                    <StatCard icon={Receipt} label="Despesas" value={data.expenseCount} sublabel="Despesas" />
                    <StatCard icon={Map} label="Atividades" value={data.activityCount} sublabel="Atividades" />
                    <StatCard
                        icon={Users}
                        label={data.trip.participantCount === 1 ? "Participante" : "Participantes"}
                        value={data.trip.participantCount}
                        sublabel="no grupo"
                    />
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
        <div className="space-y-6">
            <TripHeroCard
                trip={data.trip}
                totalSpent={data.totalSpent}
                budget={data.budget}
                primaryAction={
                    <ExpenseTrigger
                        tripId={tripId}
                        variant="button"
                        label="Nova despesa"
                        buttonClassName="bg-white text-emerald-700 shadow-sm hover:bg-emerald-50"
                    />
                }
            />

            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                <StatCard icon={Wallet} label="Total gasto" value={formatCurrencyBRL(data.totalSpent)} sublabel={`de ${formatCurrencyBRL(data.budget)} orçados`} />
                <StatCard icon={Receipt} label="Despesas" value={data.expenseCount} sublabel="registradas" />
                <StatCard icon={Map} label="Atividades" value={data.activityCount} sublabel={`${data.completedActivityCount} concluídas`} />
                <StatCard icon={Hotel} label="Reservas" value={data.reservationCount} sublabel={data.allReservationsConfirmed ? "todas confirmadas" : "pendências"} />
            </div>

            <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                <RecentExpensesList tripId={tripId} expenses={data.recentExpenses} />
                <TodayItinerary todayLabel={data.todayLabel} activities={data.todayActivities} />
            </div>

            <ParticipantsBalanceRow participants={data.participants} />
        </div>
    );
}