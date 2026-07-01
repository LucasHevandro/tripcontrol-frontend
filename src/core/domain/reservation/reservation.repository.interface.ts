import type {
    ReservationsResponse,
    Reservation,
    CreateReservationPayload,
    ReservationCategory,
} from './reservation.types';

export interface IReservationRepository {
    findAll(tripId: string, category?: ReservationCategory): Promise<ReservationsResponse>;
    create(tripId: string, payload: CreateReservationPayload): Promise<Reservation>;
    update(
        tripId: string,
        reservationId: string,
        payload: Partial<CreateReservationPayload>,
    ): Promise<Reservation>;
    remove(tripId: string, reservationId: string): Promise<void>;
}