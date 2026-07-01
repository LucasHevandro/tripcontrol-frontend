import type { ReservationStatus } from '../reservation/reservation.types';

export type ActivityStatus = 'UPCOMING' | 'CURRENT' | 'COMPLETED';
export type CostType = 'FREE' | 'TOTAL' | 'PER_PERSON';

export interface RoadmapActivity {
    id: string;
    time: string;
    emoji: string;
    title: string;
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

export interface RoadmapResponse {
    tripName: string;
    tripPeriod: string;
    tripDurationDays: number;
    days: RoadmapDay[];
    activeReservations: {
        id: string;
        title: string;
        subtitle: string;
        status: ReservationStatus;
        icon: 'hotel' | 'car' | 'flight' | 'boat';
    }[];
}

export interface CreateActivityPayload {
    emoji: string;
    title: string;
    date: string;
    startTime: string;
    duration?: string;
    location?: string;
    costAmount?: number;
    costType?: CostType;
    note?: string;
}