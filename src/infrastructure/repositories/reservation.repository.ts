import { apiClient } from '../http/api-client';
import type { IReservationRepository } from '@/core/domain/reservation/reservation.repository.interface';
import type {
    ReservationsResponse,
    Reservation,
    CreateReservationPayload,
    ReservationCategory,
} from '@/core/domain/reservation/reservation.types';

export class HttpReservationRepository implements IReservationRepository {
    async findAll(
        tripId: string,
        category?: ReservationCategory,
    ): Promise<ReservationsResponse> {
        const { data } = await apiClient.get(`/trips/${tripId}/reservations`, {
            params: category ? { category: category.toUpperCase() } : {},
        });
        return data;
    }

    async create(
        tripId: string,
        payload: CreateReservationPayload,
    ): Promise<Reservation> {
        const { data } = await apiClient.post(
            `/trips/${tripId}/reservations`,
            payload,
        );
        return data;
    }

    async update(
        tripId: string,
        reservationId: string,
        payload: Partial<CreateReservationPayload>,
    ): Promise<Reservation> {
        const { data } = await apiClient.patch(
            `/trips/${tripId}/reservations/${reservationId}`,
            payload,
        );
        return data;
    }

    async remove(tripId: string, reservationId: string): Promise<void> {
        await apiClient.delete(`/trips/${tripId}/reservations/${reservationId}`);
    }
}