"use client";

import { useState } from "react";
import { Plus, UserPlus } from "lucide-react";
import { InviteModal } from "./invite-modal";
import { Button } from "../ui/button";

interface InviteTriggerProps {
    tripId: string;
    tripName: string;
    inviteLink: string;
    label?: string;
}

export function InviteTrigger({
    tripId,
    tripName,
    inviteLink,
    label = "Convidar participante",
}: InviteTriggerProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <Button onClick={() => setIsOpen(true)} leftIcon={Plus}>
                {label}
            </Button>

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