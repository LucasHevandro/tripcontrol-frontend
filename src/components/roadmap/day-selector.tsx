"use client";

import { useState } from "react";
import type { RoadmapDay } from "@/types/trip";
import { DayTimeline } from "./day-timeline";

interface DaySelectorProps {
    days: RoadmapDay[];
    defaultSelectedIndex?: number;
}

export function DaySelector({ days, defaultSelectedIndex = 4 }: DaySelectorProps) {
    const [selectedIndex, setSelectedIndex] = useState(defaultSelectedIndex);
    const selectedDay = days[selectedIndex];

    return (
        <div>
            {/* Seletor de dias */}
            <div className="flex gap-2 overflow-x-auto pb-1">
                {days.map((day, index) => {
                    const isSelected = index === selectedIndex;
                    return (
                        <button
                            key={day.date}
                            type="button"
                            onClick={() => setSelectedIndex(index)}
                            className={`shrink-0 rounded-full border px-4 py-1.5 text-sm transition-colors ${isSelected
                                ? "border-emerald-600 bg-emerald-600 font-medium text-white"
                                : "border-neutral-200 bg-white text-neutral-600 hover:border-neutral-300 hover:bg-neutral-50"
                                }`}
                        >
                            {day.label}
                        </button>
                    );
                })}
            </div>

            {/* Timeline do dia selecionado */}
            {selectedDay && (
                <div className="mt-3">
                    <DayTimeline day={selectedDay} />
                </div>
            )}
        </div>
    );
}