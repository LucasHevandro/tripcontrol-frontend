"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, XCircle, Info, X } from "lucide-react";
import { useToast, type Toast } from "@/contexts/toast-context";

const TOAST_STYLES: Record<Toast["type"], { container: string; icon: typeof CheckCircle2; iconClass: string }> = {
    success: {
        container: "border-emerald-200 bg-white",
        icon: CheckCircle2,
        iconClass: "text-emerald-600",
    },
    error: {
        container: "border-rose-200 bg-white",
        icon: XCircle,
        iconClass: "text-rose-600",
    },
    info: {
        container: "border-sky-200 bg-white",
        icon: Info,
        iconClass: "text-sky-600",
    },
};

function ToastItem({ toast }: { toast: Toast }) {
    const { removeToast } = useToast();
    const [isVisible, setIsVisible] = useState(false);
    const style = TOAST_STYLES[toast.type];
    const Icon = style.icon;

    // Anima entrada
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
            className={`flex items-start gap-3 rounded-xl border px-4 py-3.5 shadow-lg transition-all duration-200 ${style.container} ${isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-2 opacity-0"
                }`}
        >
            <Icon className={`h-5 w-5 shrink-0 mt-0.5 ${style.iconClass}`} />
            <p className="flex-1 text-sm font-medium text-neutral-800">
                {toast.message}
            </p>
            <button
                type="button"
                onClick={handleClose}
                className="shrink-0 text-neutral-400 hover:text-neutral-600"
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