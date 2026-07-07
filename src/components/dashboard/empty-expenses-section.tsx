"use client";

import { useState } from "react";
import { Receipt } from "lucide-react";
import { EmptySectionCard } from "./empty-section-card";
import { NewExpenseModal } from "@/components/expenses/new-expense-modal";
import { useParticipants } from "@/hooks/participants/use-participants";
import { useUser } from "@/contexts/user-context";

export function EmptyExpensesSection({ tripId }: { tripId: string }) {
    const [isOpen, setIsOpen] = useState(false);
    const { data: participantsData } = useParticipants(tripId);
    const { user } = useUser();

    const participants = (participantsData?.participants ?? []).map((p) => ({
        id: p.id,
        name: p.name,
    }));

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
                    currentUserId={user?.id ?? ""}
                    onClose={() => setIsOpen(false)}
                />
            )}
        </>
    );
}