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

export interface CategoryBreakdown {
    category: string;
    total: number;
    percentage: number;
}

export interface Settlement {
    id: string;
    fromParticipantId: string;
    fromName: string;
    toParticipantId: string;
    toName: string;
    amount: number;
    description: string;
}

export interface FinancesData {
    tripName: string;
    tripPeriod: string;
    totalSpent: number;
    expenseCount: number;
    perPersonAverage: number;
    participantCount: number;
    largestExpenseAmount: number;
    largestExpenseDescription: string;
    groupBalanceLabel: string;
    expenses: (Expense & { date: string })[];
    categoryBreakdown: CategoryBreakdown[];
    settlements: Settlement[];
    participants: TripParticipant[];
}