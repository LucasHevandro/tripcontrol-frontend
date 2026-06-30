import Link from "next/link";
import { MapPin } from "lucide-react";
import type { TripCard as TripCardType } from "@/types/trip";
import { getAvatarColor } from "@/lib/avatar-color";
import { getInitials } from "@/lib/get-initials";
import { formatCurrencyBRL, formatDateRange } from "@/lib/format";
import { TripStatusBadge } from "./trip-status-badge";

interface TripCardProps {
    trip: TripCardType;
}

export function TripCard({ trip }: TripCardProps) {
    const hasBudgetData = trip.budget > 0;
    const percentage = hasBudgetData
        ? Math.min((trip.totalSpent / trip.budget) * 100, 100)
        : 0;
    const isOverBudget = trip.totalSpent > trip.budget;

    return (
        <Link
            href={`/trips/${trip.id}/dashboard`}
            className="block overflow-hidden rounded-xl border border-neutral-200 bg-white transition-shadow hover:shadow-md"
        >
            <div className={`flex h-28 items-center justify-center ${trip.bannerClassName}`}>
                <span className="text-5xl">{trip.emoji}</span>
            </div>

            <div className="p-4">
                <div className="flex items-start justify-between gap-2">
                    <p className="font-semibold text-neutral-900">{trip.name}</p>
                    <TripStatusBadge status={trip.status} />
                </div>

                <p className="mt-1 flex items-center gap-1 text-xs text-neutral-400">
                    <MapPin className="h-3 w-3" />
                    {trip.destination}
                </p>

                <p className="mt-2 text-xs text-neutral-400">
                    {formatDateRange(trip.startDate, trip.endDate)}
                </p>

                <div className="mt-3 flex items-center justify-between gap-3">
                    <div className="flex -space-x-2">
                        {trip.participants.map((p) => {
                            const color = getAvatarColor(p.id);
                            return (
                                <span
                                    key={p.id}
                                    className={`flex h-6 w-6 items-center justify-center rounded-full border-2 border-white text-[10px] font-semibold ${color.bg} ${color.text}`}
                                    title={p.name}
                                >
                                    {getInitials(p.name)}
                                </span>
                            );
                        })}
                        {trip.extraParticipantCount > 0 && (
                            <span className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-neutral-100 text-[10px] font-semibold text-neutral-500">
                                +{trip.extraParticipantCount}
                            </span>
                        )}
                    </div>

                    {hasBudgetData && (
                        <div className="text-right">
                            <p
                                className={`text-xs font-medium ${isOverBudget ? "text-rose-600" : "text-neutral-600"
                                    }`}
                            >
                                {formatCurrencyBRL(trip.totalSpent)} / {formatCurrencyBRL(trip.budget)}
                            </p>
                            <div className="mt-1 h-1 w-24 overflow-hidden rounded-full bg-neutral-100">
                                <div
                                    className={`h-full rounded-full ${isOverBudget ? "bg-rose-500" : "bg-emerald-600"
                                        }`}
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