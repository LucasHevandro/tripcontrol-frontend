"use client";

import { useEffect } from "react";
import { AlertTriangle, X } from "lucide-react";

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
    useEffect(() => {
        function handleKeyDown(e: KeyboardEvent) {
            if (e.key === "Escape" && !isLoading) onCancel();
        }
        if (open) {
            document.addEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "hidden";
        }
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "";
        };
    }, [open, isLoading, onCancel]);

    if (!open) return null;

    const isDanger = variant === "danger";

    return (
        <div
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 px-4"
            onClick={(e) => {
                if (e.target === e.currentTarget && !isLoading) onCancel();
            }}
        >
            <div
                role="alertdialog"
                aria-modal="true"
                aria-labelledby="confirm-title"
                aria-describedby="confirm-message"
                className="w-full max-w-[400px] rounded-xl bg-white shadow-xl dark:bg-neutral-900"
            >
                <div className="p-5">
                    <div className="flex items-start gap-3">
                        <span
                            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                                isDanger
                                    ? "bg-rose-50 text-rose-600 dark:bg-rose-950 dark:text-rose-400"
                                    : "bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400"
                            }`}
                        >
                            <AlertTriangle className="h-5 w-5" />
                        </span>
                        <div className="flex-1">
                            <h2
                                id="confirm-title"
                                className="text-base font-semibold text-neutral-900 dark:text-neutral-100"
                            >
                                {title}
                            </h2>
                            <p
                                id="confirm-message"
                                className="mt-1 text-sm text-neutral-500 dark:text-neutral-400"
                            >
                                {message}
                            </p>
                        </div>
                        <button
                            type="button"
                            onClick={onCancel}
                            disabled={isLoading}
                            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-neutral-400 hover:bg-neutral-100 hover:text-neutral-600 disabled:opacity-50 dark:hover:bg-neutral-800"
                            aria-label="Fechar"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    </div>
                </div>

                <div className="flex items-center justify-end gap-3 border-t border-neutral-100 px-5 py-4 dark:border-neutral-800">
                    <button
                        type="button"
                        onClick={onCancel}
                        disabled={isLoading}
                        className="rounded-lg border border-neutral-200 px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50 disabled:opacity-50 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800"
                    >
                        {cancelLabel}
                    </button>
                    <button
                        type="button"
                        onClick={onConfirm}
                        disabled={isLoading}
                        className={`flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium text-white disabled:opacity-50 ${
                            isDanger
                                ? "bg-rose-600 hover:bg-rose-700"
                                : "bg-emerald-600 hover:bg-emerald-700"
                        }`}
                    >
                        {isLoading && (
                            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        )}
                        {isLoading ? "Aguarde..." : confirmLabel}
                    </button>
                </div>
            </div>
        </div>
    );
}
