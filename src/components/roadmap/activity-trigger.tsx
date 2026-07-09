"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { NewActivityModal } from "./new-activity-modal";
import { Button } from "../ui/button";

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
                <Button onClick={() => setIsOpen(true)} leftIcon={Plus}>
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
                <NewActivityModal
                    tripId={tripId}
                    defaultDate={defaultDate}
                    onClose={() => setIsOpen(false)}
                />
            )}
        </>
    );
}