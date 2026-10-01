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
                    className="text-xs font-medium text-ink-secondary"
                >
                    {label}
                </label>
            )}
            <div className={cn(
                "flex items-center rounded-lg border bg-surface transition-colors focus-within:ring-2",
                error
                    ? "border-danger-border focus-within:border-danger focus-within:ring-danger/20"
                    : "border-input focus-within:border-focus focus-within:ring-focus/20",
            )}>
                {leftAddon && (
                    <span className="pl-3 text-ink-subtle">{leftAddon}</span>
                )}
                <input
                    ref={ref}
                    id={inputId}
                    aria-invalid={!!error}
                    aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
                    className={cn(
                        "h-10 w-full rounded-lg bg-transparent px-3 text-sm text-ink outline-none placeholder:text-ink-subtle",
                        leftAddon && "pl-2",
                        className,
                    )}
                    {...rest}
                />
            </div>
            {error ? (
                <p id={`${inputId}-error`} className="text-xs text-danger-text">{error}</p>
            ) : hint ? (
                <p id={`${inputId}-hint`} className="text-xs text-ink-muted">{hint}</p>
            ) : null}
        </div>
    );
});