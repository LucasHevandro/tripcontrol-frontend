import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { Loader2, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "danger" | "ghost";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: Variant;
    size?: Size;
    isLoading?: boolean;
    leftIcon?: LucideIcon;
    rightIcon?: LucideIcon;
    fullWidth?: boolean;
    children?: ReactNode;
}

const VARIANT: Record<Variant, string> = {
    primary:
        "bg-primary text-on-primary hover:bg-primary-hover focus-visible:ring-focus disabled:bg-primary/60",
    secondary:
        "border border-border bg-surface text-ink-secondary hover:bg-surface-hover focus-visible:ring-focus",
    danger:
        "bg-danger text-on-primary hover:bg-danger-hover focus-visible:ring-danger disabled:bg-danger/60",
    ghost:
        "text-ink-muted hover:bg-surface-hover focus-visible:ring-focus",
};

const SIZE: Record<Size, string> = {
    sm: "h-8 px-3 text-xs gap-1.5",
    md: "h-10 px-4 text-sm gap-2",
    lg: "h-11 px-5 text-sm gap-2",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
    { variant = "primary", size = "md", isLoading, leftIcon: LeftIcon, rightIcon: RightIcon, fullWidth, className, children, disabled, type = "button", ...rest },
    ref,
) {
    return (
        <button
            ref={ref}
            type={type}
            disabled={disabled || isLoading}
            className={cn(
                "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-surface disabled:cursor-not-allowed",
                VARIANT[variant],
                SIZE[size],
                fullWidth && "w-full",
                className,
            )}
            {...rest}
        >
            {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
                LeftIcon && <LeftIcon className="h-4 w-4" />
            )}
            {children}
            {!isLoading && RightIcon && <RightIcon className="h-4 w-4" />}
        </button>
    );
});