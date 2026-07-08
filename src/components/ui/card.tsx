import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    padding?: "none" | "sm" | "md" | "lg";
    surface?: "elevated" | "muted";
}

const PADDING = {
    none: "",
    sm: "p-3",
    md: "p-4",
    lg: "p-6",
};

const SURFACE = {
    elevated: "bg-white dark:bg-neutral-900",
    muted: "bg-neutral-50 dark:bg-neutral-800",
};

export function Card({ padding = "md", surface = "elevated", className, ...rest }: CardProps) {
    return (
        <div
            className={cn(
                "rounded-xl border border-neutral-200 dark:border-neutral-700",
                SURFACE[surface],
                PADDING[padding],
                className,
            )}
            {...rest}
        />
    );
}