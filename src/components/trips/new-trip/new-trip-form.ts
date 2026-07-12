import type {
    CreateTripPayload,
    DestinationType as ApiDestinationType,
    TripType as ApiTripType,
} from "../../../core/domain/trip/trip.types";
import type { NewTripFormData } from "../../../types/trip";

export const INITIAL_TRIP_FORM: NewTripFormData = {
    name: "",
    destination: "",
    destinationType: null,
    startDate: "",
    endDate: "",
    tripType: null,
    budget: "",
    description: "",
};

export function isTripStep1Valid(data: NewTripFormData): boolean {
    return (
        data.name.trim() !== "" &&
        data.destination.trim() !== "" &&
        data.startDate !== "" &&
        data.endDate !== ""
    );
}

export function getTripDurationDays(start: string, end: string): number {
    if (!start || !end) return 0;
    const diff = new Date(end).getTime() - new Date(start).getTime();
    return Math.round(diff / (1000 * 60 * 60 * 24));
}

export function buildCreateTripPayload(data: NewTripFormData): CreateTripPayload {
    return {
        name: data.name,
        destination: data.destination,
        destinationType: data.destinationType
            ? (data.destinationType.toUpperCase() as ApiDestinationType)
            : undefined,
        startDate: data.startDate,
        endDate: data.endDate,
        tripType: data.tripType ? (data.tripType.toUpperCase() as ApiTripType) : undefined,
        budget: data.budget ? Number(data.budget) : undefined,
        description: data.description || undefined,
        emoji: undefined,
    };
}
