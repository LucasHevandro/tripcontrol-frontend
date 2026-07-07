import { apiClient } from '../http/api-client';
import type { ITripRepository } from '@/core/domain/trip/trip.repository.interface';
import type {
    MyTripsResponse,
    CreateTripPayload,
    TripDashboard,
} from '@/core/domain/trip/trip.types';

export class HttpTripRepository implements ITripRepository {
    async findAll(): Promise<MyTripsResponse> {
        const { data } = await apiClient.get<MyTripsResponse>('/trips');
        return data;
    }

    async create(payload: CreateTripPayload): Promise<{ id: string }> {
        const { data } = await apiClient.post('/trips', payload);
        return data;
    }

    async getDashboard(tripId: string): Promise<TripDashboard> {
        const { data } = await apiClient.get<TripDashboard>(
            `/trips/${tripId}/dashboard`,
        );
        return data;
    }

    async update(
        tripId: string,
        payload: Partial<CreateTripPayload>,
    ): Promise<void> {
        await apiClient.patch(`/trips/${tripId}`, payload);
    }

    async remove(tripId: string): Promise<void> {
        await apiClient.delete(`/trips/${tripId}`);
    }
}