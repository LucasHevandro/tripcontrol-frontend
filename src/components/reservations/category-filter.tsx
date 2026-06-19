"use client";

import { useState } from "react";
import { BedDouble, Plane, Car, Ship } from "lucide-react";
import type { ReservationCategory } from "@/types/trip";

type FilterOption = ReservationCategory | "all";

const FILTERS: { value: FilterOption; label: string; icon?: React.ReactNode }[] = [
    { value: "all", label: "Todas" },
    { value: "hotel", label: "Hospedagem", icon: <BedDouble className="h-3.5 w-3.5" /> },
    { value: "flight", label: "Passagens", icon: <Plane className="h-3.5 w-3.5" /> },
    { value: "car", label: "Transporte", icon: <Car className="h-3.5 w-3.5" /> },
    { value: "tour", label: "Passeios", icon: <Ship className="h-3.5 w-3.5" /> },
];

interface CategoryFilterProps {
    activeFilter: FilterOption;
    onChange: (filter: FilterOption) => void;
}

export function CategoryFilter({ activeFilter, onChange }: CategoryFilterProps) {
    return (
        <div className="flex flex-wrap gap-2">
            {FILTERS.map((f) => {
                const isActive = activeFilter === f.value;
                return (
                    <button
                        key={f.value}
                        type="button"
                        onClick={() => onChange(f.value)}
                        className={`flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors ${isActive
                                ? "border-emerald-600 bg-emerald-600 text-white"
                                : "border-neutral-200 bg-white text-neutral-600 hover:border-neutral-300"
                            }`}
                    >
                        {f.icon}
                        {f.label}
                    </button>
                );
            })}
        </div>
    );
}