"use client";

import { useState } from "react";
import { UserPlus, Link as LinkIcon, Check } from "lucide-react";
import { useToast } from "@/contexts/toast-context";
import { Button } from "@/components/ui/button";
import { InviteModal } from "./invite-modal";

interface InviteTriggerProps {
    tripId: string;
    tripName: string;
    inviteLink: string;
}

export function InviteTrigger({ tripId, tripName, inviteLink }: InviteTriggerProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [justCopied, setJustCopied] = useState(false);
    const { addToast } = useToast();

    async function handleCopyLink() {
        try {
            await navigator.clipboard.writeText(inviteLink);
            setJustCopied(true);
            addToast("Link de convite copiado");
            setTimeout(() => setJustCopied(false), 2000);
        } catch {
            addToast("Não foi possível copiar o link", "error");
        }
    }

    return (
        <>
            <div className="flex flex-wrap items-center gap-2">
                <Button
                    variant="secondary"
                    leftIcon={justCopied ? Check : LinkIcon}
                    onClick={handleCopyLink}
                    aria-label="Copiar link de convite"
                >
                    <span className="hidden sm:inline">
                        {justCopied ? "Copiado" : "Copiar link"}
                    </span>
                </Button>
                <Button leftIcon={UserPlus} onClick={() => setIsOpen(true)}>
                    Convidar participanteqw
                </Button>
            </div>

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