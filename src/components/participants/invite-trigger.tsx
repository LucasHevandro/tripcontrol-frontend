"use client";

import { useState } from "react";
import { UserPlus } from "lucide-react";
import { InviteModal } from "./invite-modal";

interface InviteTriggerProps {
    tripId: string;
    tripName: string;
    inviteLink: string;
}

export function InviteTrigger({
    tripId,
    tripName,
    inviteLink,
}: InviteTriggerProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button
                type="button"
                onClick={() => setIsOpen(true)}
                className="flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3.5 py-2 text-sm font-medium text-white transition-colors hover:bg-emerald-700"
            >
                <UserPlus className="h-4 w-4" />
                Convidar participante
            </button>

            {isOpen && (
                <InviteModal
                    tripId={tripId}
                    tripName={tripName}
                    inviteLink={inviteLink}
                    onClose={() => setIsOpen(false)}
                />
            )}
        </>
    );
}