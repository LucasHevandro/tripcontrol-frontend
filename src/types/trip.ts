// types/trip.ts

export type TripStatus = "planning" | "ongoing" | "completed";

export interface TripParticipant {
    id: string;
    name: string;
    /** Saldo em reais. Positivo = a receber, negativo = a pagar. */
    balance: number;
}

export interface Expense {
    id: string;
    description: string;
    category: string;
    paidByParticipantId: string;
    paidByName: string;
    amount: number;
}

export type ActivityStatus = "completed" | "current" | "upcoming";

export interface Activity {
    id: string;
    time: string;
    title: string;
    location: string;
    status: ActivityStatus;
}

export interface TripSummary {
    id: string;
    name: string;
    destination: string;
    startDate: string;
    endDate: string;
    status: TripStatus;
    participantCount: number;
}

export interface TripDashboardData {
    trip: TripSummary;
    totalSpent: number;
    budget: number;
    expenseCount: number;
    activityCount: number;
    completedActivityCount: number;
    reservationCount: number;
    allReservationsConfirmed: boolean;
    recentExpenses: Expense[];
    todayLabel: string;
    todayActivities: Activity[];
    participants: TripParticipant[];
}