"use client";

import { useState } from "react";
import type { ChecklistItem } from "@/types/trip";

interface DayChecklistProps {
    items: ChecklistItem[];
}

export function DayChecklist({ items: initialItems }: DayChecklistProps) {
    const [items, setItems] = useState(initialItems);

    function toggle(id: string) {
        setItems((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, checked: !item.checked } : item
            )
        );
        // TODO: quando a API existir → PATCH /trips/:tripId/checklist/:id { checked }
    }

    return (
        <div className="rounded-xl border border-neutral-200 bg-white p-4">
            <h2 className="text-sm font-semibold text-neutral-900">
                ✅ Checklist do dia
            </h2>

            <ul className="mt-3 space-y-2">
                {items.map((item) => (
                    <li key={item.id} className="flex items-center gap-3">
                        <button
                            type="button"
                            onClick={() => toggle(item.id)}
                            className={`flex h-5 w-5 shrink-0 items-center justify-center rounded border transition-colors ${item.checked
                                    ? "border-emerald-600 bg-emerald-600"
                                    : "border-neutral-300 bg-white"
                                }`}
                            aria-label={item.checked ? `Desmarcar ${item.label}` : `Marcar ${item.label}`}
                            aria-pressed={item.checked}
                        >
                            {item.checked && (
                                <svg
                                    width="10"
                                    height="8"
                                    viewBox="0 0 10 8"
                                    fill="none"
                                    className="text-white"
                                >
                                    <path
                                        d="M1 4L3.5 6.5L9 1"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            )}
                        </button>
                        <span
                            className={`text-sm transition-colors ${item.checked
                                    ? "text-neutral-400 line-through"
                                    : "text-neutral-700"
                                }`}
                        >
                            {item.label}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
}