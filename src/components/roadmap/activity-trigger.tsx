"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { NewActivityModal } from "./new-activity-modal";

interface ActivityTriggerProps {
    tripId: string;
    defaultDate?: string;
    variant?: "button" | "link";
    label?: string;
}

export function ActivityTrigger({
    tripId,
    defaultDate,
    variant = "button",
    label = "Nova atividade",
}: ActivityTriggerProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {variant === "button" ? (
                <button
                    type="button"
                    onClick={() => setIsOpen(true)}
                    className="flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3.5 py-2 text-sm font-medium text-white transition-colors hover:bg-emerald-700"
                >
                    <Plus className="h-4 w-4" />
                    {label}
                </button>
            ) : (
                <button
                    type="button"
                    onClick={() => setIsOpen(true)}
                    className="text-sm font-medium text-emerald-700 hover:text-emerald-800"
                >
                    + {label}
                </button>
            )}

            {isOpen && (
                <NewActivityModal
                    tripId={tripId}
                    defaultDate={defaultDate}
                    onClose={() => setIsOpen(false)}
                />
            )}
        </>
    );
}