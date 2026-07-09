import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "./button";
import { cn } from "@/lib/utils";

interface ErrorStateProps {
    title?: string;
    description?: string;
    onRetry?: () => void;
    isRetrying?: boolean;
    className?: string;
}

export function ErrorState({
    title = "Não foi possível carregar",
    description = "Verifique sua conexão e tente novamente.",
    onRetry,
    isRetrying,
    className,
}: ErrorStateProps) {
    return (
        <div
            role="alert"
            className={cn(
                "flex flex-col items-center justify-center gap-3 rounded-xl border border-rose-200 bg-rose-50/50 px-6 py-10 text-center dark:border-rose-900/50 dark:bg-rose-950/20",
                className,
            )}
        >
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-rose-100 text-rose-600 dark:bg-rose-950 dark:text-rose-400">
                <AlertCircle className="h-5 w-5" />
            </div>
            <div className="max-w-sm">
                <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">{title}</p>
                <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">{description}</p>
            </div>
            {onRetry && (
                <Button variant="secondary" size="sm" leftIcon={RefreshCw} onClick={onRetry} isLoading={isRetrying}>
                    Tentar novamente
                </Button>
            )}
        </div>
    );
}