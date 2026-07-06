export type ReservationCategory = 'hotel' | 'flight' | 'car' | 'tour';
export type ReservationCategoryUpper = 'HOTEL' | 'FLIGHT' | 'CAR' | 'TOUR';
export type ReservationStatus = 'confirmed' | 'pending' | 'cancelled';

export interface Reservation {
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
        icon: 'voucher' | 'tickets' | 'pay';
        href: string;
    };
}
export interface ReservationsResponse {
    tripName: string;
    tripPeriod: string;
    totalReservations: number;
    confirmedCount: number;
    totalInvested: number;
    nextCheckinLabel: string;
    nextFlightLabel: string;
    reservations: Reservation[];
}

export interface CreateReservationPayload {
    category: Uppercase<ReservationCategory>;
    title: string;
    subtitle?: string;
    status?: Uppercase<ReservationStatus>;
    amount: number;
    paidById?: string;
    notes?: string;
    details?: Record<string, any>;
}   