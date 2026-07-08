"use client";

import { useCallback, useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

type Size = "sm" | "md" | "lg" | "xl";

const SIZE: Record<Size, string> = {
    sm: "sm:max-w-md",
    md: "sm:max-w-lg",
    lg: "sm:max-w-2xl",
    xl: "sm:max-w-3xl",
};

const FOCUSABLE = 'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

interface DialogProps {
    open: boolean;
    onClose: () => void;
    size?: Size;
    dismissOnBackdrop?: boolean;
    /** Se true, no mobile o dialog vira bottom sheet (ancorado embaixo). No sm+ continua modal centralizado. */
    mobileSheet?: boolean;
    children: ReactNode;
    // A11y
    role?: "dialog" | "alertdialog";
    ariaLabel?: string;
    ariaLabelledBy?: string;
    ariaDescribedBy?: string;
}

export function Dialog({
    open,
    onClose,
    size = "md",
    dismissOnBackdrop = true,
    mobileSheet = false,
    role = "dialog",
    ariaLabel,
    ariaLabelledBy,
    ariaDescribedBy,
    children,
}: DialogProps) {
    const contentRef = useRef<HTMLDivElement>(null);
    const [mounted, setMounted] = useState(false);
    const [entered, setEntered] = useState(false);

    // Aguarda montagem do DOM antes de usar createPortal (SSR-safe)
    useEffect(() => setMounted(true), []);

    // Dispara animação de entrada no próximo frame
    useEffect(() => {
        if (!open) { setEntered(false); return; }
        const id = requestAnimationFrame(() => setEntered(true));
        return () => cancelAnimationFrame(id);
    }, [open]);

    // Escape fecha
    useEffect(() => {
        if (!open) return;
        const handler = (e: globalThis.KeyboardEvent) => { if (e.key === "Escape") onClose(); };
        document.addEventListener("keydown", handler);
        return () => document.removeEventListener("keydown", handler);
    }, [open, onClose]);

    // Trava o scroll do body enquanto aberto
    useEffect(() => {
        if (!open) return;
        const previous = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => { document.body.style.overflow = previous; };
    }, [open]);

    // Autofocus no primeiro elemento focável
    useEffect(() => {
        if (!open || !contentRef.current) return;
        const first = contentRef.current.querySelector<HTMLElement>(FOCUSABLE);
        first?.focus();
    }, [open]);

    // Focus trap com Tab / Shift+Tab
    const handleKeyDown = useCallback((e: KeyboardEvent<HTMLDivElement>) => {
        if (e.key !== "Tab" || !contentRef.current) return;
        const items = contentRef.current.querySelectorAll<HTMLElement>(FOCUSABLE);
        if (items.length === 0) return;
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
        }
    }, []);

    if (!mounted || !open) return null;

    return createPortal(
        <div
            className={cn(
                "fixed inset-0 z-50 bg-black/50 transition-opacity duration-200",
                entered ? "opacity-100" : "opacity-0",
            )}
            onClick={(e) => {
                if (e.target === e.currentTarget && dismissOnBackdrop) onClose();
            }}
        >
            <div
                className={cn(
                    "fixed inset-0 flex justify-center",
                    mobileSheet ? "items-end sm:items-center" : "items-center",
                )}
                onClick={(e) => {
                    if (e.target === e.currentTarget && dismissOnBackdrop) onClose();
                }}
            >
                <div
                    ref={contentRef}
                    role={role}
                    aria-modal="true"
                    aria-label={ariaLabel}
                    aria-labelledby={ariaLabelledBy}
                    aria-describedby={ariaDescribedBy}
                    onKeyDown={handleKeyDown}
                    className={cn(
                        "flex w-full max-h-[95vh] flex-col overflow-hidden bg-white shadow-xl transition-all duration-200 dark:bg-neutral-900",
                        SIZE[size],
                        // Formato: sheet no mobile, modal no sm+
                        mobileSheet
                            ? "rounded-t-2xl sm:mx-4 sm:my-8 sm:rounded-xl"
                            : "mx-3 my-4 rounded-xl sm:mx-4 sm:my-8",
                        // Animação de entrada
                        entered
                            ? "translate-y-0 opacity-100 sm:scale-100"
                            : mobileSheet
                                ? "translate-y-full opacity-0 sm:translate-y-0 sm:scale-95"
                                : "opacity-0 sm:scale-95",
                    )}
                >
                    {children}
                </div>
            </div>
        </div>,
        document.body,
    );
}

interface DialogHeaderProps {
    title: ReactNode;
    icon?: ReactNode;
    onClose: () => void;
}

export function DialogHeader({ title, icon, onClose }: DialogHeaderProps) {
    return (
        <div className="flex shrink-0 items-center justify-between border-b border-neutral-100 px-4 py-4 dark:border-neutral-800 sm:px-5">
            <h2 className="flex items-center gap-2 text-base font-semibold text-neutral-900 dark:text-neutral-100">
                {icon}
                {title}
            </h2>
            <button
                type="button"
                onClick={onClose}
                aria-label="Fechar"
                className="flex h-8 w-8 items-center justify-center rounded-lg text-neutral-400 hover:bg-neutral-100 hover:text-neutral-600 dark:hover:bg-neutral-800"
            >
                <X className="h-4 w-4" />
            </button>
        </div>
    );
}

interface DialogBodyProps {
    children: ReactNode;
    className?: string;
}

export function DialogBody({ children, className }: DialogBodyProps) {
    return (
        <div className={cn("flex-1 overflow-y-auto px-4 py-5 sm:px-5", className)}>
            {children}
        </div>
    );
}

interface DialogFooterProps {
    children: ReactNode;
    className?: string;
}

export function DialogFooter({ children, className }: DialogFooterProps) {
    return (
        <div className={cn(
            "flex shrink-0 items-center justify-end gap-3 border-t border-neutral-100 px-4 py-4 dark:border-neutral-800 sm:px-5",
            className,
        )}>
            {children}
        </div>
    );
}