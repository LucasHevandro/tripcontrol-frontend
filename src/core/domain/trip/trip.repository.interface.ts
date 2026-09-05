import type {
    MyTripsResponse,
    CreateTripPayload,
    TripDashboard,
    UpdateTripPayload,
} from './trip.types';

export interface ITripRepository {
    findAll(): Promise<MyTripsResponse>;
    create(payload: CreateTripPayload): Promise<{ id: string }>;
    getDashboard(tripId: string): Promise<TripDashboard>;
    update(tripId: string, payload: UpdateTripPayload): Promise<void>;
    remove(tripId: string): Promise<void>;
}