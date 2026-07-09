import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function PageContainer({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={cn(
                "mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8",
                className,
            )}
            {...rest}
        />
    );
}