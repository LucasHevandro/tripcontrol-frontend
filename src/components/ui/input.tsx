import { forwardRef, useId, type InputHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    hint?: string;
    error?: string;
    leftAddon?: ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
    { id, label, hint, error, leftAddon, className, ...rest },
    ref,
) {
    const autoId = useId();
    const inputId = id ?? autoId;

    return (
        <div className="flex w-full flex-col gap-1">
            {label && (
                <label
                    htmlFor={inputId}
                    className="text-xs font-medium text-neutral-700 dark:text-neutral-300"
                >
                    {label}
                </label>
            )}
            <div className={cn(
                "flex items-center rounded-lg border bg-white transition-colors focus-within:ring-2 dark:bg-neutral-900",
                error
                    ? "border-rose-300 focus-within:border-rose-500 focus-within:ring-rose-500/20 dark:border-rose-800"
                    : "border-neutral-200 focus-within:border-emerald-500 focus-within:ring-emerald-500/20 dark:border-neutral-700",
            )}>
                {leftAddon && (
                    <span className="pl-3 text-neutral-400 dark:text-neutral-500">{leftAddon}</span>
                )}
                <input
                    ref={ref}
                    id={inputId}
                    aria-invalid={!!error}
                    aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
                    className={cn(
                        "h-10 w-full rounded-lg bg-transparent px-3 text-sm text-neutral-900 outline-none placeholder:text-neutral-400 dark:text-neutral-100 dark:placeholder:text-neutral-500",
                        leftAddon && "pl-2",
                        className,
                    )}
                    {...rest}
                />
            </div>
            {error ? (
                <p id={`${inputId}-error`} className="text-xs text-rose-600 dark:text-rose-400">{error}</p>
            ) : hint ? (
                <p id={`${inputId}-hint`} className="text-xs text-neutral-500 dark:text-neutral-400">{hint}</p>
            ) : null}
        </div>
    );
});