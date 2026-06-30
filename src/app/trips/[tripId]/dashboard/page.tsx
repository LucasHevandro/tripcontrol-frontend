"use client";

import { useState, use } from "react";
import { Wallet, Receipt, Map, Hotel, Receipt as ReceiptIcon, MapIcon } from "lucide-react";
import { getTripDashboardMock, getNewTripDashboardMock } from "@/lib/mock-trip";
import { formatCurrencyBRL } from "@/lib/format";
import { isNewTrip, getOnboardingSteps } from "@/lib/onboarding";
import { TripHeaderCard } from "@/components/dashboard/trip-header-card";
import { NewTripHeaderCard } from "@/components/dashboard/new-trip-header-card";
import { OnboardingChecklist } from "@/components/dashboard/onboarding-checklist";
import { EmptySectionCard } from "@/components/dashboard/empty-section-card";
import { StatCard } from "@/components/dashboard/start-card";
import { BudgetProgressBar } from "@/components/dashboard/budget-progress-bar";
import { RecentExpensesList } from "@/components/dashboard/recent-exprense-list";
import { TodayItinerary } from "@/components/dashboard/today-itinerary";
import { ParticipantsBalanceRow } from "@/components/dashboard/participants-balance-row";
import { getTripParticipantsMock } from "@/lib/mock-trip";
import { NewExpenseModal } from "@/components/expenses/new-expense-modal";

export default function DashboardPage({
    params,
}: {
    params: Promise<{ tripId: string }>;
}) {
    const { tripId } = use(params);
    const [isOpen, setIsOpen] = useState(false);
    const { participants } = getTripParticipantsMock(tripId);
    // TODO: trocar por uma única função getTripDashboard(tripId) real,
    // que sempre devolve newTripStatus — isNewTrip() decide a partir dela.
    // Por ora, simulando o caso "viagem nova" sempre que tripId === "new-trip-demo".
    const data =
        tripId === "new-trip-demo"
            ? getNewTripDashboardMock(tripId)
            : getTripDashboardMock(tripId);

    if (isNewTrip(data)) {
        const steps = getOnboardingSteps(tripId, data.newTripStatus);

        return (
            <div className="space-y-1">
                <NewTripHeaderCard trip={data.trip} />

                <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                    <StatCard
                        icon={Wallet}
                        label="Total gasto"
                        value={formatCurrencyBRL(data.totalSpent)}
                        sublabel="Total gasto"
                    />
                    <StatCard
                        icon={Receipt}
                        label="Despesas"
                        value={data.expenseCount}
                        sublabel="Despesas"
                    />
                    <StatCard
                        icon={Map}
                        label="Atividades"
                        value={data.activityCount}
                        sublabel="Atividades"
                    />
                    <StatCard
                        icon={Hotel}
                        label="Participante"
                        value={data.trip.participantCount}
                        sublabel="Participante"
                    />
                </div>

                <OnboardingChecklist steps={steps} />

                <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                    <EmptySectionCard
                        icon={Receipt}
                        title="Despesas"
                        emptyMessage="Nenhuma despesa registrada ainda"
                        actionLabel="Adicionar primeira despesa"
                        actionHref={`/trips/${tripId}/finances`}
                        onAction={() => setIsOpen(true)}
                    />
                    {isOpen && (
                        <NewExpenseModal
                            tripId={tripId}
                            participants={participants}
                            currentUserId="lucas"
                            onClose={() => setIsOpen(false)}
                        />
                    )}
                </div>
            </div>
        );
    }

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