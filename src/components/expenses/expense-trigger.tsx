"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { NewExpenseModal } from "./new-expense-modal";
import { getTripParticipantsMock } from "@/lib/mock-trip";

interface ExpenseTriggerProps {
    tripId: string;
    variant?: "button" | "link";
    label?: string;
}

export function ExpenseTrigger({
    tripId,
    variant = "button",
    label = "Adicionar despesa",
}: ExpenseTriggerProps) {
    const [isOpen, setIsOpen] = useState(false);

    // TODO: quando a API existir, buscar participantes reais via TanStack Query
    const participantsData = getTripParticipantsMock(tripId);
    const participants = participantsData.participants.map((p) => ({
        id: p.id,
        name: p.name,
    }));

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
                <NewExpenseModal
                    tripId={tripId}
                    participants={participants}
                    currentUserId="lucas"
                    onClose={() => setIsOpen(false)}
                />
            )}
        </>
    );
}