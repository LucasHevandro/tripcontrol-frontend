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
    newTripStatus: NewTripStatus;
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

export type ReservationStatus = "confirmed" | "pending" | "cancelled";

export interface ActiveReservation {
    id: string;
    title: string;
    subtitle: string;
    status: ReservationStatus;
    icon: "hotel" | "car" | "flight" | "boat";
}

export interface ChecklistItem {
    id: string;
    label: string;
    checked: boolean;
}

export interface RoadmapActivity {
    id: string;
    time: string;
    title: string;
    emoji: string;
    duration: string;
    location: string;
    costLabel: string;
    note: string;
    status: ActivityStatus;
    badge?: string;
}

export interface RoadmapDay {
    date: string;
    label: string;
    shortLabel: string;
    fullLabel: string;
    activityCount: number;
    participantCount: number;
    activities: RoadmapActivity[];
}

export interface RoadmapData {
    tripName: string;
    tripPeriod: string;
    tripDurationDays: number;
    days: RoadmapDay[];
    activeReservations: ActiveReservation[];
    todayChecklist: ChecklistItem[];
}

export type ReservationCategory = "hotel" | "flight" | "car" | "tour";

export interface ReservationDetail {
    id: string;
    category: ReservationCategory;
    status: ReservationStatus;
    title: string;
    subtitle: string;
    details: string[];
    amount: number;
    amountSublabel: string;
    warning?: string;
    primaryAction?: {
        label: string;
        icon: "voucher" | "tickets" | "pay";
        href: string;
    };
}

export interface ReservationsData {
    tripName: string;
    tripPeriod: string;
    totalReservations: number;
    confirmedCount: number;
    totalInvested: number;
    nextCheckinLabel: string;
    nextCheckinSublabel: string;
    nextFlightLabel: string;
    nextFlightSublabel: string;
    reservations: ReservationDetail[];
}

export type ParticipantRole = "organizer" | "member";

export interface ParticipantDetail {
    id: string;
    name: string;
    email: string;
    role: ParticipantRole;
    totalPaid: number;
    individualQuota: number;
    balance: number;
}

export interface ParticipantsData {
    tripName: string;
    tripPeriod: string;
    participantCount: number;
    maxParticipants: number;
    organizerCount: number;
    totalSpent: number;
    perPersonAverage: number;
    pendingSettlementsCount: number;
    pendingSettlementsAmount: number;
    groupStatusLabel: string;
    groupStatusSublabel: string;
    inviteLink: string;
    participants: ParticipantDetail[];
    settlementSummary: Settlement[];
}

export interface TripCard {
    id: string;
    name: string;
    destination: string;
    startDate: string;
    endDate: string;
    status: TripStatus;
    emoji: string;
    bannerClassName: string;
    participants: { id: string; name: string }[];
    extraParticipantCount: number;
    totalSpent: number;
    budget: number;
}

export interface MyTripsData {
    activeTripCount: number;
    completedTripCount: number;
    trips: TripCard[];
}

export type TripType = "friends" | "couple" | "family" | "work" | "tour" | "other";

export type DestinationType = "beach" | "city" | "countryside" | "international";

export interface NewTripFormData {
    name: string;
    destination: string;
    destinationType: DestinationType | null;
    startDate: string;
    endDate: string;
    tripType: TripType | null;
    budget: string;
    description: string;
}

export interface NewTripStatus {
    hasInvitedParticipants: boolean;
    hasRoadmapActivities: boolean;
    hasExpenses: boolean;
}