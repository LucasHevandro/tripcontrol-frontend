"use client";

import { useState } from "react";
import { CategoryFilter } from "./category-filter";
import { ReservationCard } from "./reservation-card";
import { ReservationTrigger } from "./reservation-trigger";
import type { ReservationDetail, ReservationCategory } from "@/types/trip";

type FilterOption = ReservationCategory | "all";

interface ReservationsGridProps {
    tripId: string;
    reservations: ReservationDetail[];
}

export function ReservationsGrid({ tripId, reservations }: ReservationsGridProps) {
    const [filter, setFilter] = useState<FilterOption>("all");

    const filtered =
        filter === "all"
            ? reservations
            : reservations.filter((r) => r.category === filter);

    return (
        <div className="space-y-4">
            <CategoryFilter activeFilter={filter} onChange={setFilter} />

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {filtered.map((res) => (
                    <ReservationCard key={res.id} reservation={res} />
                ))}
                {filter === "all" && <ReservationTrigger tripId={tripId} variant="card" />}
            </div>
        </div>
    );
}