import { BedDouble, Plane, Car, Ship, type LucideIcon } from "lucide-react";
import type { ReservationCategory } from "@/types/trip";

export const RESERVATION_CATEGORIES: {
    value: ReservationCategory;
    label: string;
    icon: LucideIcon;
    bg: string;
    color: string;
    gradient: string;
}[] = [
        { value: "hotel", label: "Hospedagem", icon: BedDouble, bg: "bg-emerald-100", color: "text-emerald-700", gradient: "from-rose-500 via-pink-500 to-fuchsia-600" },
        { value: "flight", label: "Passagem", icon: Plane, bg: "bg-sky-100", color: "text-sky-700", gradient: "from-sky-500 via-sky-600 to-blue-700" },
        { value: "car", label: "Transporte", icon: Car, bg: "bg-amber-100", color: "text-amber-700", gradient: "from-amber-500 via-orange-500 to-orange-600" },
        { value: "tour", label: "Passeio", icon: Ship, bg: "bg-lime-100", color: "text-lime-700", gradient: "from-teal-500 via-emerald-500 to-emerald-600" },
    ];