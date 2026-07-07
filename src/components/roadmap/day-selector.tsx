"use client";

import { useState } from "react";
import type { RoadmapDay } from "@/types/trip";
import { DayTimeline } from "./day-timeline";

interface DaySelectorProps {
    tripId: string;
    days: RoadmapDay[];
    defaultSelectedIndex?: number;
}

export function DaySelector({ tripId, days, defaultSelectedIndex = 4 }: DaySelectorProps) {
    const [selectedIndex, setSelectedIndex] = useState(defaultSelectedIndex);
    const selectedDay = days[selectedIndex];

    return (
        <div>
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
                                    : "border-neutral-200 bg-white text-neutral-600 hover:border-neutral-300 hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:border-neutral-600"
                                }`}
                        >
                            {day.label}
                        </button>
                    );
                })}
            </div>

            {selectedDay && (
                <div className="mt-3">
                    <DayTimeline tripId={tripId} day={selectedDay} />
                </div>
            )}
        </div>
    );
}