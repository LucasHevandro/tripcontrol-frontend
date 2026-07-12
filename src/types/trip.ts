import type {
    CategoryBreakdown as DomainCategoryBreakdown,
    ExpenseSummary,
} from "@/core/domain/expense/expense.types";
import type {
    Participant,
    ParticipantsResponse,
    Settlement as DomainSettlement,
} from "@/core/domain/participant/participant.types";
import type {
    ActiveReservation as DomainActiveReservation,
    RoadmapActivity as DomainRoadmapActivity,
    RoadmapDay as DomainRoadmapDay,
    RoadmapResponse,
} from "@/core/domain/roadmap/roadmap.types";
import type {
    Reservation as DomainReservation,
    ReservationCategory as DomainReservationCategory,
    ReservationsResponse,
    ReservationStatus as DomainReservationStatus,
} from "@/core/domain/reservation/reservation.types";
import type {
    DashboardActivity,
    DashboardExpense,
    DashboardParticipant,
    MyTripsResponse,
    TripCard as DomainTripCard,
    TripDashboard,
    TripStatus as DomainTripStatus,
} from "@/core/domain/trip/trip.types";

export type TripStatus = DomainTripStatus;
export type TripParticipant = DashboardParticipant;
export type Expense = DashboardExpense;
export type Activity = DashboardActivity;
export type ActivityStatus = DashboardActivity["status"];
export type TripSummary = TripDashboard["trip"];
export type TripDashboardData = TripDashboard;
export type CategoryBreakdown = DomainCategoryBreakdown;
export type Settlement = DomainSettlement;
export type ActiveReservation = DomainActiveReservation;
export type RoadmapActivity = DomainRoadmapActivity;
export type RoadmapDay = DomainRoadmapDay;
export type RoadmapData = RoadmapResponse;
export type ReservationCategory = DomainReservationCategory;
export type ReservationStatus = DomainReservationStatus;
export type ReservationDetail = DomainReservation;
export type ReservationsData = ReservationsResponse;
export type ParticipantRole = Participant["role"];
export type ParticipantDetail = Participant;
export type ParticipantsData = ParticipantsResponse;
export type TripCard = DomainTripCard;
export type MyTripsData = MyTripsResponse;

export interface FinancesData extends ExpenseSummary {
    expenses: (DashboardExpense & { date: string })[];
    settlements: Settlement[];
    participants: TripParticipant[];
}

export type TripType = "friends" | "couple" | "family" | "work" | "tour" | "other";

export type DestinationType = "beach" | "city" | "countryside" | "international";

export interface NewTripFormData {
    name: string;
    destination: string;
    destinationLat?: number;
    destinationLng?: number;
    destinationType: DestinationType | null;
    startDate: string;
    endDate: string;
    tripType: TripType | null;
    budget: string;
    description: string;
}

export interface NewTripStatus {
    hasInvitedParticipants: boolean;
    hasRoadmapActivities: boolean;
    hasExpenses: boolean;
}

export interface UserProfile {
    id: string;
    name: string;
    email: string;
    avatarUrl: string | null;
    language: string;
    currency: string;
    notifications: {
        email: boolean;
        expenseAlerts: boolean;
        roadmapReminders: boolean;
    };
}

export type ExpenseCategory =
    | "Hospedagem"
    | "Alimentação"
    | "Transporte"
    | "Lazer"
    | "Compras"
    | "Outro";

export type ExpenseSplitType = "equal" | "custom" | "individual";

export interface NewExpenseFormData {
    description: string;
    amount: string;
    date: string;
    category: ExpenseCategory | null;
    paidById: string;
    splitType: ExpenseSplitType;
    splitParticipantIds: string[];
    receiptFile: File | null;
    notes: string;
}

export interface NewActivityFormData {
    emoji: string;
    title: string;
    date: string;
    startTime: string;
    duration: string;
    location: string;
    costAmount: string;
    costType: "total" | "per_person" | "free";
    note: string;
}

export interface ReservationFieldsHotel {
    checkIn: string;
    checkOut: string;
    guestCount: string;
    roomCount: string;
    address: string;
    reservationCode: string;
}

export interface ReservationFieldsFlight {
    departureDate: string;
    departureTime: string;
    arrivalTime: string;
    flightNumber: string;
    returnDate: string;
    returnTime: string;
    returnFlightNumber: string;
    passengerCount: string;
    cabinClass: string;
    locator: string;
}

export interface ReservationFieldsCar {
    pickupDate: string;
    pickupTime: string;
    returnDate: string;
    returnTime: string;
    pickupLocation: string;
    carModel: string;
    reservationCode: string;
}

export interface ReservationFieldsTour {
    date: string;
    startTime: string;
    endTime: string;
    peopleCount: string;
    meetingPoint: string;
    warning: string;
}

export interface NewReservationFormData {
    category: ReservationCategory | null;
    title: string;
    subtitle: string;
    amount: string;
    paidById: string;
    notes: string;
    hotel: ReservationFieldsHotel;
    flight: ReservationFieldsFlight;
    car: ReservationFieldsCar;
    tour: ReservationFieldsTour;
}
