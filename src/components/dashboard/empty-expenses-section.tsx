"use client";

import { useState } from "react";
import { Receipt } from "lucide-react";
import { EmptySectionCard } from "./empty-section-card";
import { NewExpenseModal } from "@/components/expenses/new-expense-modal";
import { getTripParticipantsMock } from "@/lib/mock-trip";

export function EmptyExpensesSection({ tripId }: { tripId: string }) {
    const [isOpen, setIsOpen] = useState(false);
    const { participants } = getTripParticipantsMock(tripId);

    return (
        <>
            <EmptySectionCard
                icon={Receipt}
                title="Despesas"
                emptyMessage="Nenhuma despesa registrada ainda"
                actionLabel="Adicionar primeira despesa"
                actionHref={`/trips/${tripId}/finances`}
                onAction={() => setIsOpen(true)}
            />
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