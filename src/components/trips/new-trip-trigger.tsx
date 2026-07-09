"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { NewTripModal } from "./new-trip/new-trip-modal";
import { Button } from "../ui/button";

interface NewTripTriggerProps {
    variant?: "button" | "card";
    label?: string;
}

export function NewTripTrigger({ variant = "button", label }: NewTripTriggerProps) {
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
                    className="flex min-h-[200px] w-full flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-neutral-200 bg-white transition-colors hover:border-neutral-300 hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-900 dark:hover:border-neutral-600 dark:hover:bg-neutral-800"
                >
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-neutral-200 text-neutral-400 dark:border-neutral-600 dark:text-neutral-500">
                        <Plus className="h-5 w-5" />
                    </div>
                    <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">Nova viagem</p>
                    <p className="text-xs text-neutral-400 dark:text-neutral-500">Criar um novo planejamento</p>
                </button>
            )}

            {isOpen && <NewTripModal onClose={() => setIsOpen(false)} />}
        </>
    );
}