"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { NewExpenseModal } from "./new-expense-modal";
import { useParticipants } from "@/hooks/participants/use-participants";
import { useUser } from "@/contexts/user-context";
import { Button } from "@/components/ui/button";

interface ExpenseTriggerProps {
    tripId: string;
    variant?: "button" | "link";
    label?: string;
    buttonClassName?: string;

}

export function ExpenseTrigger({
    tripId,
    variant = "button",
    label = "Adicionar despesa",
    buttonClassName,
}: ExpenseTriggerProps) {
    const [isOpen, setIsOpen] = useState(false);
    const { data: participantsData, isLoading } = useParticipants(tripId);
    const { user } = useUser();

    const participants = (participantsData?.participants ?? []).map((p) => ({
        id: p.id,
        name: p.name,
    }));

    const modalKey = `${user?.id ?? "loading"}-${participants.length}`;

    return (
        <>
            {variant === "button" ? (
                <Button onClick={() => setIsOpen(true)} leftIcon={Plus} className={buttonClassName}>
                    {label}
                </Button>
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
                    key={modalKey}
                    tripId={tripId}
                    participants={participants}
                    currentUserId={user?.id ?? ""}
                    onClose={() => setIsOpen(false)}
                />
            )}
        </>
    );
}