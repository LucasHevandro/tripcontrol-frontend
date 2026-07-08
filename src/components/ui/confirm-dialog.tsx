"use client";

import { AlertTriangle } from "lucide-react";
import { Dialog } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ConfirmDialogProps {
    open: boolean;
    title: string;
    message: string;
    confirmLabel?: string;
    cancelLabel?: string;
    variant?: "danger" | "default";
    isLoading?: boolean;
    onConfirm: () => void;
    onCancel: () => void;
}

export function ConfirmDialog({
    open,
    title,
    message,
    confirmLabel = "Confirmar",
    cancelLabel = "Cancelar",
    variant = "danger",
    isLoading = false,
    onConfirm,
    onCancel,
}: ConfirmDialogProps) {
    const isDanger = variant === "danger";

    return (
        <Dialog
            open={open}
            onClose={onCancel}
            dismissOnBackdrop={!isLoading}
            role="alertdialog"
            ariaLabelledBy="confirm-dialog-title"
            ariaDescribedBy="confirm-dialog-message"
            size="sm"
        >
            <div className="p-5">
                <div className="flex items-start gap-3">
                    <span
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${isDanger
                                ? "bg-rose-50 text-rose-600 dark:bg-rose-950 dark:text-rose-400"
                                : "bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400"
                            }`}
                    >
                        <AlertTriangle className="h-5 w-5" />
                    </span>
                    <div className="flex-1">
                        <h2
                            id="confirm-dialog-title"
                            className="text-base font-semibold text-neutral-900 dark:text-neutral-100"
                        >
                            {title}
                        </h2>
                        <p
                            id="confirm-dialog-message"
                            className="mt-1 text-sm text-neutral-500 dark:text-neutral-400"
                        >
                            {message}
                        </p>
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-end gap-3 border-t border-neutral-100 px-5 py-4 dark:border-neutral-800">
                <Button variant="secondary" onClick={onCancel} disabled={isLoading}>
                    {cancelLabel}
                </Button>
                <Button
                    variant={isDanger ? "danger" : "primary"}
                    onClick={onConfirm}
                    isLoading={isLoading}
                >
                    {isLoading ? "Aguarde..." : confirmLabel}
                </Button>
            </div>
        </Dialog>
    );
}