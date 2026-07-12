export type TripStatus = 'PLANNING' | 'ONGOING' | 'COMPLETED';
export type TripType = 'FRIENDS' | 'COUPLE' | 'FAMILY' | 'WORK' | 'TOUR' | 'OTHER';
export type DestinationType = 'BEACH' | 'CITY' | 'COUNTRYSIDE' | 'INTERNATIONAL';
export type ActivityStatus = 'completed' | 'current' | 'upcoming';

export interface TripCard {
    id: string;
    name: string;
    destination: string;
    startDate: string;
    endDate: string;
    status: TripStatus;
    emoji: string | null;
    bannerClassName?: string;
    participants: { id: string; name: string; avatarUrl: string | null }[];
    extraParticipantCount: number;
    totalSpent: number;
    budget: number;
    role: string;
}

export type DashboardExpense = TripDashboard['recentExpenses'][number];
export type DashboardActivity = TripDashboard['todayActivities'][number];
export type DashboardParticipant = TripDashboard['participants'][number];

export interface MyTripsResponse {
    activeTripCount: number;
    completedTripCount: number;
    trips: TripCard[];
}

export interface CreateTripPayload {
    name: string;
    destination: string;
    destinationLat?: number;
    destinationLng?: number;
    destinationType?: DestinationType;
    startDate: string;
    endDate: string;
    tripType?: TripType;
    budget?: number;
    description?: string;
    emoji?: string;
}

export interface TripDashboard {
    trip: {
        id: string;
        name: string;
        destination: string;
        startDate: string;
        endDate: string;
        status: TripStatus;
        participantCount: number;
    };
    totalSpent: number;
    budget: number;
    expenseCount: number;
    activityCount: number;
    completedActivityCount: number;
    reservationCount: number;
    allReservationsConfirmed: boolean;
    recentExpenses: {
        id: string;
        description: string;
        category: string;
        paidByName: string;
        paidByParticipantId: string;
        amount: number;
        date: string;
        splitType?: 'EQUAL' | 'CUSTOM' | 'INDIVIDUAL';
    }[];
    todayLabel: string;
    todayActivities: {
        id: string;
        time: string;
        title: string;
        location: string;
        status: ActivityStatus;
    }[];
    participants: { id: string; name: string; balance: number }[];
    newTripStatus: {
        hasInvitedParticipants: boolean;
        hasRoadmapActivities: boolean;
        hasExpenses: boolean;
    };
}
