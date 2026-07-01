"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { NewReservationModal } from "./new-reservation-modal";
import { useParticipants } from "@/hooks/participants/use-participants";
import { useUser } from "@/contexts/user-context";

interface ReservationTriggerProps {
    tripId: string;
    variant?: "button" | "card";
    label?: string;
}

export function ReservationTrigger({
    tripId,
    variant = "button",
    label = "Nova reserva",
}: ReservationTriggerProps) {
    const [isOpen, setIsOpen] = useState(false);
    const { data: participantsData } = useParticipants(tripId);
    const { user } = useUser();

    const participants = (participantsData?.participants ?? []).map((p) => ({
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
                    className="flex min-h-[200px] w-full flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-neutral-200 bg-white transition-colors hover:border-neutral-300 hover:bg-neutral-50"
                >
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-neutral-200 text-neutral-400">
                        <Plus className="h-5 w-5" />
                    </div>
                    <p className="text-sm font-medium text-neutral-600">Adicionar reserva</p>
                    <p className="text-xs text-neutral-400">Hospedagem, passagem, carro ou passeio</p>
                </button>
            )}

            {isOpen && (
                <NewReservationModal
                    tripId={tripId}
                    participants={participants}
                    currentUserId={user?.id ?? ""}
                    onClose={() => setIsOpen(false)}
                />
            )}
        </>
    );
}