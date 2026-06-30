import { Users, Heart, Home, Briefcase, GraduationCap, MoreHorizontal, Umbrella, Building2, Mountain, Plane, type LucideIcon } from "lucide-react";
import type { TripType, DestinationType } from "@/types/trip";

export const TRIP_TYPE_OPTIONS: { value: TripType; label: string; icon: LucideIcon; iconBg: string; iconColor: string }[] = [
    { value: "friends", label: "Amigos", icon: Users, iconBg: "bg-sky-100", iconColor: "text-sky-700" },
    { value: "couple", label: "Casal", icon: Heart, iconBg: "bg-rose-100", iconColor: "text-rose-700" },
    { value: "family", label: "Família", icon: Home, iconBg: "bg-amber-100", iconColor: "text-amber-700" },
    { value: "work", label: "Trabalho", icon: Briefcase, iconBg: "bg-neutral-200", iconColor: "text-neutral-700" },
    { value: "tour", label: "Excursão", icon: GraduationCap, iconBg: "bg-violet-100", iconColor: "text-violet-700" },
    { value: "other", label: "Outro", icon: MoreHorizontal, iconBg: "bg-neutral-100", iconColor: "text-neutral-600" },
];

export const DESTINATION_TYPE_OPTIONS: { value: DestinationType; label: string; icon: LucideIcon; iconBg: string; iconColor: string }[] = [
    { value: "beach", label: "Praia", icon: Umbrella, iconBg: "bg-orange-100", iconColor: "text-orange-700" },
    { value: "city", label: "Cidade", icon: Building2, iconBg: "bg-sky-100", iconColor: "text-sky-700" },
    { value: "countryside", label: "Campo/Serra", icon: Mountain, iconBg: "bg-emerald-100", iconColor: "text-emerald-700" },
    { value: "international", label: "Internacional", icon: Plane, iconBg: "bg-blue-100", iconColor: "text-blue-700" },
];

export const TRIP_TYPE_LABEL: Record<TripType, string> = Object.fromEntries(
    TRIP_TYPE_OPTIONS.map((o) => [o.value, o.label])
) as Record<TripType, string>;