import { BedDouble, Plane, Car, Ship, type LucideIcon } from "lucide-react";
import type { ReservationCategory } from "@/types/trip";

export const RESERVATION_CATEGORIES: {
    value: ReservationCategory;
    label: string;
    icon: LucideIcon;
    bg: string;
    color: string;
    emoji: string;
}[] = [
        { value: "hotel", label: "Hospedagem", icon: BedDouble, bg: "bg-emerald-100", color: "text-emerald-700", emoji: "🏨" },
        { value: "flight", label: "Passagem", icon: Plane, bg: "bg-sky-100", color: "text-sky-700", emoji: "✈️" },
        { value: "car", label: "Transporte", icon: Car, bg: "bg-amber-100", color: "text-amber-700", emoji: "🚗" },
        { value: "tour", label: "Passeio", icon: Ship, bg: "bg-lime-100", color: "text-lime-700", emoji: "⛵" },
    ];