import type { TripDashboardData } from "@/types/trip";

export interface OnboardingStep {
    id: string;
    number: number;
    title: string;
    subtitle: string;
    completed: boolean;
    actionLabel?: string;
    actionHref?: string;
}

/**
 * Uma viagem é considerada "recém-criada" enquanto não tiver
 * participantes convidados, roteiro montado, nem despesas registradas.
 * Assim que qualquer um desses existir, o dashboard completo é exibido
 * em vez da tela de onboarding.
 */
export function isNewTrip(data: TripDashboardData): boolean {
    const { hasInvitedParticipants, hasRoadmapActivities, hasExpenses } =
        data.newTripStatus;
    return !hasInvitedParticipants && !hasRoadmapActivities && !hasExpenses;
}

export function getOnboardingSteps(
    tripId: string,
    status: TripDashboardData["newTripStatus"]
): OnboardingStep[] {
    return [
        {
            id: "create",
            number: 1,
            title: "Criar a viagem",
            subtitle: "Informações básicas definidas",
            completed: true, // se chegou até aqui, a viagem já existe
        },
        {
            id: "invite",
            number: 2,
            title: "Convidar o grupo",
            subtitle: "Adicione participantes via link ou e-mail",
            completed: status.hasInvitedParticipants,
            actionLabel: "Convidar agora",
            actionHref: `/trips/${tripId}/participants`,
        },
        {
            id: "roadmap",
            number: 3,
            title: "Montar o roteiro",
            subtitle: "Adicione atividades para cada dia",
            completed: status.hasRoadmapActivities,
            actionLabel: "Ir ao roteiro",
            actionHref: `/trips/${tripId}/roadmap`,
        },
        {
            id: "expenses",
            number: 4,
            title: "Registrar despesas",
            subtitle: "Comece a registrar os gastos do grupo",
            completed: status.hasExpenses,
            actionLabel: "Adicionar despesa",
            actionHref: `/trips/${tripId}/finances`,
        },
    ];
}