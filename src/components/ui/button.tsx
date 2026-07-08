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
        "bg-emerald-600 text-white hover:bg-emerald-700 focus-visible:ring-emerald-500 disabled:bg-emerald-600/60",
    secondary:
        "border border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-100 focus-visible:ring-neutral-400 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-200 dark:hover:bg-neutral-800",
    danger:
        "bg-rose-600 text-white hover:bg-rose-700 focus-visible:ring-rose-500 disabled:bg-rose-600/60",
    ghost:
        "text-neutral-600 hover:bg-neutral-100 focus-visible:ring-neutral-400 dark:text-neutral-300 dark:hover:bg-neutral-800",
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
                "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:cursor-not-allowed dark:focus-visible:ring-offset-neutral-950",
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