"use client";

import { useState } from "react";
import type { TripStatus } from "@/core/domain/trip/trip.types";
import type { TripCard } from "@/core/domain/trip/trip.types";
import { TripCard as TripCardComponent } from "./trip-card";
import { NewTripTrigger } from "./new-trip-trigger";

type FilterOption = TripStatus | "all";

const TABS: { value: FilterOption; label: string }[] = [
    { value: "all", label: "Todas" },
    { value: "ONGOING", label: "Em andamento" },
    { value: "PLANNING", label: "Planejamento" },
    { value: "COMPLETED", label: "Concluídas" },
];

interface TripsFilterTabsProps {
    trips: TripCard[];
}

export function TripsFilterTabs({ trips }: TripsFilterTabsProps) {
    const [activeTab, setActiveTab] = useState<FilterOption>("all");

    const filtered =
        activeTab === "all"
            ? trips
            : trips.filter((t) => t.status === activeTab);

    return (
        <div>
            <div className="flex gap-4 overflow-x-auto border-b border-neutral-200 sm:gap-6">
                {TABS.map((tab) => {
                    const isActive = activeTab === tab.value;
                    return (
                        <button
                            key={tab.value}
                            type="button"
                            onClick={() => setActiveTab(tab.value)}
                            className={`relative shrink-0 whitespace-nowrap pb-3 text-sm transition-colors ${isActive ? "font-medium text-emerald-700" : "text-neutral-400 hover:text-neutral-600"}`}
                        >
                            {tab.label}
                            {isActive && (
                                <span className="absolute -bottom-px left-0 h-[2px] w-full bg-emerald-600" />
                            )}
                        </button>
                    );
                })}
            </div>

            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {filtered.map((trip) => (
                    <TripCardComponent key={trip.id} trip={trip} />
                ))}
                {activeTab === "all" && <NewTripTrigger variant="card" />}
            </div>
        </div>
    );
}