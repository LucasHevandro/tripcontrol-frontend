"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, XCircle, Info, X } from "lucide-react";
import { useToast, type Toast } from "@/contexts/toast-context";

const TOAST_STYLES: Record<Toast["type"], { container: string; icon: typeof CheckCircle2; iconClass: string }> = {
    success: {
        container: "border-emerald-200 bg-white dark:border-emerald-800 dark:bg-neutral-900",
        icon: CheckCircle2,
        iconClass: "text-emerald-600 dark:text-emerald-400",
    },
    error: {
        container: "border-rose-200 bg-white dark:border-rose-800 dark:bg-neutral-900",
        icon: XCircle,
        iconClass: "text-rose-600 dark:text-rose-400",
    },
    info: {
        container: "border-sky-200 bg-white dark:border-sky-800 dark:bg-neutral-900",
        icon: Info,
        iconClass: "text-sky-600 dark:text-sky-400",
    },
};

function ToastItem({ toast }: { toast: Toast }) {
    const { removeToast } = useToast();
    const [isVisible, setIsVisible] = useState(false);
    const style = TOAST_STYLES[toast.type];
    const Icon = style.icon;

    useEffect(() => {
        const t = setTimeout(() => setIsVisible(true), 10);
        return () => clearTimeout(t);
    }, []);

    function handleClose() {
        setIsVisible(false);
        setTimeout(() => removeToast(toast.id), 200);
    }

    return (
        <div
            className={`flex items-start gap-3 rounded-xl border px-4 py-3.5 shadow-lg transition-all duration-200 ${style.container} ${isVisible ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
                }`}
        >
            <Icon className={`mt-0.5 h-5 w-5 shrink-0 ${style.iconClass}`} />
            <p className="flex-1 text-sm font-medium text-neutral-800 dark:text-neutral-200">
                {toast.message}
            </p>
            <button
                type="button"
                onClick={handleClose}
                className="shrink-0 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200"
                aria-label="Fechar notificação"
            >
                <X className="h-4 w-4" />
            </button>
        </div>
    );
}

export function ToastContainer() {
    const { toasts } = useToast();

    if (toasts.length === 0) return null;

    return (
        <div
            aria-live="polite"
            aria-label="Notificações"
            className="fixed bottom-4 right-4 z-[100] flex w-full max-w-[360px] flex-col gap-2"
        >
            {toasts.map((toast) => (
                <ToastItem key={toast.id} toast={toast} />
            ))}
        </div>
    );
}