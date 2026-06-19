// lib/mock-trip-data.ts
import type { TripDashboardData } from "@/types/trip";
import type { FinancesData } from "@/types/trip";

// MOCK: enquanto não há backend real, todo tripId retorna esta mesma viagem.
// Quando a API NestJS existir, esta função será substituída por uma query
// do TanStack Query (ex: useQuery({ queryKey: ["trip", tripId, "dashboard"],
// queryFn: () => fetchTripDashboard(tripId) })) com a mesma shape de retorno.
export function getTripDashboardMock(tripId: string): TripDashboardData {
    return {
        trip: {
            id: tripId,
            name: "Viagem para Florianópolis",
            destination: "Santa Catarina, BR",
            startDate: "2026-01-10",
            endDate: "2026-01-17",
            status: "ongoing",
            participantCount: 6,
        },
        totalSpent: 4320,
        budget: 6000,
        expenseCount: 23,
        activityCount: 12,
        completedActivityCount: 5,
        reservationCount: 4,
        allReservationsConfirmed: true,
        recentExpenses: [
            {
                id: "exp-1",
                description: "Hotel Beira Mar",
                category: "Hospedagem",
                paidByParticipantId: "lucas",
                paidByName: "Lucas",
                amount: 1200,
            },
            {
                id: "exp-2",
                description: "Restaurante Náutico",
                category: "Alimentação",
                paidByParticipantId: "ana",
                paidByName: "Ana",
                amount: 340,
            },
            {
                id: "exp-3",
                description: "Aluguel de carro",
                category: "Transporte",
                paidByParticipantId: "pedro",
                paidByName: "Pedro",
                amount: 480,
            },
            {
                id: "exp-4",
                description: "Passeio de barco",
                category: "Lazer",
                paidByParticipantId: "lucas",
                paidByName: "Lucas",
                amount: 150,
            },
        ],
        todayLabel: "Ter, 14 jan",
        todayActivities: [
            {
                id: "act-1",
                time: "08:00",
                title: "Café da manhã no hotel",
                location: "",
                status: "completed",
            },
            {
                id: "act-2",
                time: "10:00",
                title: "Praia da Joaquina",
                location: "Florianópolis",
                status: "current",
            },
            {
                id: "act-3",
                time: "13:00",
                title: "Almoço · Restaurante Náutico",
                location: "Centro",
                status: "upcoming",
            },
            {
                id: "act-4",
                time: "16:00",
                title: "Passeio de barco",
                location: "Marina do Sul",
                status: "upcoming",
            },
        ],
        participants: [
            { id: "lucas", name: "Lucas", balance: 210 },
            { id: "ana", name: "Ana", balance: -90 },
            { id: "pedro", name: "Pedro", balance: 55 },
            { id: "mariana", name: "Mariana", balance: -80 },
            { id: "gustavo", name: "Gustavo", balance: -45 },
            { id: "carla", name: "Carla", balance: -50 },
        ],
    };
}

export function getTripFinancesMock(tripId: string): FinancesData {
    return {
        tripName: "Viagem para Florianópolis",
        tripPeriod: "Jan 2026",
        totalSpent: 4320,
        expenseCount: 23,
        perPersonAverage: 720,
        participantCount: 6,
        largestExpenseAmount: 1200,
        largestExpenseDescription: "Hotel Beira Mar",
        groupBalanceLabel: "Equilibrado",
        expenses: [
            { id: "exp-1", description: "Hotel Beira Mar", category: "Hospedagem", paidByParticipantId: "lucas", paidByName: "Lucas", amount: 1200, date: "10/01" },
            { id: "exp-2", description: "Aluguel de carro", category: "Transporte", paidByParticipantId: "pedro", paidByName: "Pedro", amount: 480, date: "10/01" },
            { id: "exp-3", description: "Restaurante Náutico", category: "Alimentação", paidByParticipantId: "ana", paidByName: "Ana", amount: 340, date: "11/01" },
            { id: "exp-4", description: "Passeio de barco", category: "Lazer", paidByParticipantId: "lucas", paidByName: "Lucas", amount: 150, date: "14/01" },
            { id: "exp-5", description: "Supermercado", category: "Alimentação", paidByParticipantId: "mariana", paidByName: "Mariana", amount: 220, date: "12/01" },
        ],
        categoryBreakdown: [
            { category: "Hospedagem", total: 1800, percentage: 42 },
            { category: "Alimentação", total: 1100, percentage: 25 },
            { category: "Transporte", total: 860, percentage: 20 },
            { category: "Lazer", total: 560, percentage: 13 },
        ],
        settlements: [
            { id: "set-1", fromParticipantId: "ana", fromName: "Ana", toParticipantId: "lucas", toName: "Lucas", amount: 90, description: "Ana gastou menos que a cota" },
            { id: "set-2", fromParticipantId: "mariana", fromName: "Mariana", toParticipantId: "lucas", toName: "Lucas", amount: 80, description: "Mariana deve equalizar saldo" },
            { id: "set-3", fromParticipantId: "gustavo", fromName: "Gustavo", toParticipantId: "pedro", toName: "Pedro", amount: 45, description: "Acerto via Pix" },
            { id: "set-4", fromParticipantId: "carla", fromName: "Carla", toParticipantId: "pedro", toName: "Pedro", amount: 50, description: "Acerto pendente" },
        ],
        participants: [
            { id: "lucas", name: "Lucas", balance: 210 },
            { id: "pedro", name: "Pedro", balance: 55 },
            { id: "ana", name: "Ana", balance: -90 },
            { id: "mariana", name: "Mariana", balance: -80 },
            { id: "gustavo", name: "Gustavo", balance: -45 },
            { id: "carla", name: "Carla", balance: -50 },
        ],
    };
}

import type { RoadmapData } from "@/types/trip";

export function getTripRoadmapMock(tripId: string): RoadmapData {
    return {
        tripName: "Florianópolis",
        tripPeriod: "10–17 jan 2026",
        tripDurationDays: 7,
        activeReservations: [
            { id: "res-1", title: "Hotel Beira Mar", subtitle: "10–17 jan · 7 noites", status: "confirmed", icon: "hotel" },
            { id: "res-2", title: "Carro alugado", subtitle: "10–17 jan · Localiza", status: "confirmed", icon: "car" },
            { id: "res-3", title: "Voo de volta", subtitle: "17 jan · Azul 4521", status: "confirmed", icon: "flight" },
        ],
        todayChecklist: [
            { id: "chk-1", label: "Café da manhã", checked: true },
            { id: "chk-2", label: "Protetor solar", checked: true },
            { id: "chk-3", label: "Reserva restaurante", checked: false },
            { id: "chk-4", label: "Pagar passeio barco", checked: false },
            { id: "chk-5", label: "Foto da praia", checked: false },
        ],
        days: [
            { date: "2026-01-10", label: "Sex 10/01", shortLabel: "Sex 10/01", fullLabel: "Sábado, 10 de janeiro", activityCount: 2, participantCount: 6, activities: [] },
            { date: "2026-01-11", label: "Sáb 11/01", shortLabel: "Sáb 11/01", fullLabel: "Sábado, 11 de janeiro", activityCount: 3, participantCount: 6, activities: [] },
            { date: "2026-01-12", label: "Dom 12/01", shortLabel: "Dom 12/01", fullLabel: "Domingo, 12 de janeiro", activityCount: 2, participantCount: 6, activities: [] },
            { date: "2026-01-13", label: "Seg 13/01", shortLabel: "Seg 13/01", fullLabel: "Segunda-feira, 13 de janeiro", activityCount: 1, participantCount: 6, activities: [] },
            {
                date: "2026-01-14",
                label: "Ter 14/01",
                shortLabel: "Ter 14/01",
                fullLabel: "Terça-feira, 14 de janeiro",
                activityCount: 4,
                participantCount: 5,
                activities: [
                    {
                        id: "act-1",
                        time: "08:00",
                        emoji: "☕",
                        title: "Café da manhã no hotel",
                        duration: "1h",
                        location: "Hotel Beira Mar",
                        costLabel: "",
                        note: "",
                        status: "completed",
                        badge: "Concluído",
                    },
                    {
                        id: "act-2",
                        time: "10:00",
                        emoji: "🏖️",
                        title: "Praia da Joaquina",
                        duration: "3h",
                        location: "Joaquina, Floripa",
                        costLabel: "R$ 0",
                        note: "Levar protetor solar e água",
                        status: "current",
                        badge: "Agora",
                    },
                    {
                        id: "act-3",
                        time: "13:00",
                        emoji: "🍽️",
                        title: "Almoço · Restaurante Náutico",
                        duration: "1h30",
                        location: "Centro",
                        costLabel: "~R$ 60/pessoa",
                        note: "Reserva confirmada · Mesa para 6",
                        status: "upcoming",
                    },
                    {
                        id: "act-4",
                        time: "16:00",
                        emoji: "⛵",
                        title: "Passeio de barco",
                        duration: "2h",
                        location: "Marina do Sul",
                        costLabel: "R$ 150 total",
                        note: "Pagamento já registrado",
                        status: "upcoming",
                    },
                ],
            },
            { date: "2026-01-15", label: "Qua 15/01", shortLabel: "Qua 15/01", fullLabel: "Quarta-feira, 15 de janeiro", activityCount: 3, participantCount: 6, activities: [] },
            { date: "2026-01-16", label: "Qui 16/01", shortLabel: "Qui 16/01", fullLabel: "Quinta-feira, 16 de janeiro", activityCount: 2, participantCount: 6, activities: [] },
            { date: "2026-01-17", label: "Sex 17/01", shortLabel: "Sex 17/01", fullLabel: "Sexta-feira, 17 de janeiro", activityCount: 1, participantCount: 6, activities: [] },
        ],
    };
}