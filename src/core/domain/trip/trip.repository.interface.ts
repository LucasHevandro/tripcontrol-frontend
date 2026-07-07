import type {
    MyTripsResponse,
    CreateTripPayload,
    TripDashboard,
} from './trip.types';

export interface ITripRepository {
    findAll(): Promise<MyTripsResponse>;
    create(payload: CreateTripPayload): Promise<{ id: string }>;
    getDashboard(tripId: string): Promise<TripDashboard>;
    update(tripId: string, payload: Partial<CreateTripPayload>): Promise<void>;
    remove(tripId: string): Promise<void>;
}