import Link from "next/link";
import { MapPin, Plane } from "lucide-react";
import type { TripCard as LegacyTripCard } from "@/types/trip";
import type { TripCard as DomainTripCard } from "@/core/domain/trip/trip.types";
import { getAvatarColor } from "@/lib/avatar-color";
import { getInitials } from "@/lib/get-initials";
import { formatCurrencyBRL, formatDateRange } from "@/lib/format";
import { getTripGradient } from "@/lib/trip-gradients";
import { TripStatusBadge } from "./trip-status-badge";

type TripCardType = LegacyTripCard | DomainTripCard;

interface TripCardProps {
    trip: TripCardType;
}

export function TripCard({ trip }: TripCardProps) {
    const hasBudgetData = trip.budget > 0;
    const percentage = hasBudgetData ? Math.min((trip.totalSpent / trip.budget) * 100, 100) : 0;
    const isOverBudget = trip.totalSpent > trip.budget;
    const gradient = getTripGradient(trip.id);
    const userEmoji = trip.emoji;

    return (
        <Link
            href={`/trips/${trip.id}/dashboard`}
            className="group block overflow-hidden rounded-xl border border-neutral-200 bg-white transition-shadow hover:shadow-md dark:border-neutral-700 dark:bg-neutral-900 dark:hover:shadow-neutral-800"
        >
            {/* Banner */}
            <div className={`relative flex h-20 items-center justify-center overflow-hidden bg-gradient-to-br ${gradient} sm:h-28`}>
                <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-white/15 blur-2xl" aria-hidden="true" />
                <div className="pointer-events-none absolute -bottom-6 -left-4 h-20 w-20 rounded-full bg-white/10 blur-2xl" aria-hidden="true" />
                {userEmoji ? (
                    <span
                        className="relative text-3xl drop-shadow-md sm:text-5xl"
                        aria-hidden="true"
                    >
                        {userEmoji}
                    </span>
                ) : (
                    <Plane className="relative h-8 w-8 text-white/90 drop-shadow-md sm:h-10 sm:w-10" aria-hidden="true" />
                )}
            </div>

            <div className="p-4">
                <div className="flex items-start justify-between gap-2">
                    <p className="font-semibold text-neutral-900 dark:text-neutral-100">{trip.name}</p>
                    <TripStatusBadge status={trip.status} />
                </div>

                <p className="mt-1 flex items-center gap-1 text-xs text-neutral-500 dark:text-neutral-400">
                    <MapPin className="h-3 w-3" />
                    {trip.destination}
                </p>

                <p className="mt-2 text-xs text-neutral-500 dark:text-neutral-400">
                    {formatDateRange(trip.startDate, trip.endDate)}
                </p>

                <div className="mt-3 flex items-center justify-between gap-3">
                    <div className="flex -space-x-2">
                        {trip.participants.map((p) => {
                            const color = getAvatarColor(p.id);
                            return (
                                <span
                                    key={p.id}
                                    className={`flex h-6 w-6 items-center justify-center rounded-full border-2 border-white text-[10px] font-semibold dark:border-neutral-900 ${color.bg} ${color.text}`}
                                    title={p.name}
                                >
                                    {getInitials(p.name)}
                                </span>
                            );
                        })}
                        {trip.extraParticipantCount > 0 && (
                            <span className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-neutral-100 text-[10px] font-semibold text-neutral-500 dark:border-neutral-900 dark:bg-neutral-700 dark:text-neutral-400">
                                +{trip.extraParticipantCount}
                            </span>
                        )}
                    </div>

                    {hasBudgetData && (
                        <div className="text-right">
                            <p className={`text-xs font-medium ${isOverBudget ? "text-rose-600" : "text-neutral-600 dark:text-neutral-400"}`}>
                                {formatCurrencyBRL(trip.totalSpent)} / {formatCurrencyBRL(trip.budget)}
                            </p>
                            <div className="mt-1 h-1 w-24 overflow-hidden rounded-full bg-neutral-100 dark:bg-neutral-700">
                                <div
                                    className={`h-full rounded-full ${isOverBudget ? "bg-rose-500" : "bg-emerald-600"}`}
                                    style={{ width: `${percentage}%` }}
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </Link>
    );
}