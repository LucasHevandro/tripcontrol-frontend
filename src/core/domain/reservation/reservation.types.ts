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
    notes?: string;
    rawDetails?: Record<string, string>;
    paidById?: string | null;
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
    nextCheckinSublabel?: string;
    nextFlightLabel: string;
    nextFlightSublabel?: string;
    reservations: Reservation[];
}

export type ReservationDetails = Record<
    string,
    string | number | boolean | null | undefined
>;

export interface CreateReservationPayload {
    category: Uppercase<ReservationCategory>;
    title: string;
    subtitle?: string;
    status?: Uppercase<ReservationStatus>;
    amount: number;
    paidById?: string;
    notes?: string;
    details?: ReservationDetails;
}   
