import type {
    CreateReservationPayload,
    ReservationCategoryUpper,
} from "../../core/domain/reservation/reservation.types";
import type { NewReservationFormData } from "../../types/trip";

export const EMPTY_RESERVATION_FORM: NewReservationFormData = {
    category: null,
    title: "",
    subtitle: "",
    amount: "",
    paidById: "",
    notes: "",
    hotel: { checkIn: "", checkOut: "", guestCount: "", roomCount: "", address: "", reservationCode: "" },
    flight: { departureDate: "", departureTime: "", arrivalTime: "", flightNumber: "", returnDate: "", returnTime: "", returnFlightNumber: "", passengerCount: "", cabinClass: "economy", locator: "" },
    car: { pickupDate: "", pickupTime: "", returnDate: "", returnTime: "", pickupLocation: "", carModel: "", reservationCode: "" },
    tour: { date: "", startTime: "", endTime: "", peopleCount: "", meetingPoint: "", warning: "" },
};

export function isReservationFormValid(form: NewReservationFormData): boolean {
    return form.category !== null && form.title.trim() !== "" && Number(form.amount) > 0;
}

export function getReservationDetails(
    form: NewReservationFormData,
): CreateReservationPayload["details"] {
    if (!form.category) return undefined;
    return { ...form[form.category] };
}

export function buildReservationPayload(form: NewReservationFormData): CreateReservationPayload {
    if (!form.category) {
        throw new Error("Reservation category is required");
    }

    return {
        category: form.category.toUpperCase() as ReservationCategoryUpper,
        title: form.title,
        subtitle: form.subtitle || undefined,
        amount: Number(form.amount),
        paidById: form.paidById || undefined,
        notes: form.notes || undefined,
        details: getReservationDetails(form),
    };
}
